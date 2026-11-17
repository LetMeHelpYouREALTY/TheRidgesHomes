import { useCallback, useEffect, useRef, useState } from "react";
import {
  AMENITY_CATEGORIES,
  buildDirectionsUrl,
  buildEmbedMapUrl,
  COMMUNITY_MAP_CONFIG,
  getGoogleMapsApiKey,
  getGoogleMapsMapId,
  type AmenityCategoryId,
} from "@/lib/community-map";
import { loadGoogleMaps, mapsAuthFailed } from "@/lib/load-google-maps";
import { searchCategory } from "@/lib/search-category";
import { StaticAmenityList } from "./StaticAmenityList";
import { cn } from "@/lib/utils";

type AmenityMapProps = {
  heightClassName?: string;
  showStaticList?: boolean;
  defaultCategory?: AmenityCategoryId;
  className?: string;
};

function displayNameFromPlace(
  raw: google.maps.places.Place["displayName"],
): string {
  if (raw == null) return "Place";
  if (typeof raw === "string") return raw;
  return raw.text ?? "Place";
}

function latLngFromPlace(loc: google.maps.LatLng): google.maps.LatLngLiteral {
  const json = loc.toJSON();
  return { lat: json.lat, lng: json.lng };
}

function buildInfoWindowElement(place: {
  name: string;
  address?: string;
  lat: number;
  lng: number;
}): HTMLElement {
  const wrap = document.createElement("div");
  wrap.style.maxWidth = "240px";
  wrap.style.padding = "4px 0";

  const strong = document.createElement("strong");
  strong.textContent = place.name;
  wrap.appendChild(strong);

  if (place.address) {
    const addr = document.createElement("p");
    addr.style.margin = "4px 0";
    addr.style.fontSize = "14px";
    addr.textContent = place.address;
    wrap.appendChild(addr);
  }

  const link = document.createElement("a");
  link.href = buildDirectionsUrl(place.lat, place.lng);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.color = "#c9a227";
  link.style.fontWeight = "500";
  link.textContent = "Directions";
  wrap.appendChild(link);

  return wrap;
}

export default function AmenityMap({
  heightClassName = "h-[420px] md:h-[480px]",
  showStaticList = true,
  defaultCategory = "golf",
  className = "",
}: AmenityMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  type MapMarker =
    | google.maps.Marker
    | google.maps.marker.AdvancedMarkerElement;
  const markersRef = useRef<MapMarker[]>([]);
  const communityMarkerRef = useRef<MapMarker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mapInitializedRef = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<AmenityCategoryId>(defaultCategory);
  const [apiKey] = useState(() => getGoogleMapsApiKey());
  const [mapStatus, setMapStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [useFallback, setUseFallback] = useState(
    () => !apiKey || mapsAuthFailed,
  );
  const [placesSearchFailed, setPlacesSearchFailed] = useState(false);

  const enterFallback = useCallback(() => {
    if (mapRef.current) {
      mapRef.current = null;
    }
    if (mapDivRef.current) {
      mapDivRef.current.replaceChildren();
    }
    setUseFallback(true);
    setMapStatus("error");
  }, []);

  useEffect(() => {
    const onAuthFailure = () => enterFallback();
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, [enterFallback]);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => {
      if (marker instanceof google.maps.Marker) {
        marker.setMap(null);
      } else {
        marker.map = null;
      }
    });
    markersRef.current = [];
  }, []);

  const placeCommunityMarker = useCallback(
    async (map: google.maps.Map, useAdvanced: boolean) => {
      const { center, centerLabel } = COMMUNITY_MAP_CONFIG;
      const mapsLib = (await google.maps.importLibrary(
        "maps",
      )) as google.maps.MapsLibrary;
      const infoWindow =
        infoWindowRef.current ?? new mapsLib.InfoWindow();
      infoWindowRef.current = infoWindow;

      const content = buildInfoWindowElement({
        name: centerLabel,
        address: COMMUNITY_MAP_CONFIG.centerAddress,
        lat: center.lat,
        lng: center.lng,
      });

      if (useAdvanced) {
        const markerLib = (await google.maps.importLibrary(
          "marker",
        )) as google.maps.MarkerLibrary;
        const pin = document.createElement("div");
        pin.setAttribute("role", "img");
        pin.setAttribute("aria-label", centerLabel);
        pin.className =
          "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-lg ring-2 ring-secondary";
        pin.textContent = "R";
        const marker = new markerLib.AdvancedMarkerElement({
          map,
          position: center,
          title: centerLabel,
          content: pin,
        });
        marker.addListener("click", () => {
          infoWindow.setContent(content);
          infoWindow.open({ map, anchor: marker });
        });
        communityMarkerRef.current = marker;
      } else {
        const marker = new google.maps.Marker({
          map,
          position: center,
          title: centerLabel,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          },
        });
        marker.addListener("click", () => {
          infoWindow.setContent(content);
          infoWindow.open({ map, anchor: marker });
        });
        communityMarkerRef.current = marker;
      }
    },
    [],
  );

  const searchPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      if (!mapRef.current || useFallback) return;

      const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
      if (!category) return;

      clearMarkers();
      setPlacesSearchFailed(false);
      setMapStatus("loading");

      try {
        const places = await searchCategory(
          COMMUNITY_MAP_CONFIG.center,
          categoryId,
          category.primaryTypes,
          COMMUNITY_MAP_CONFIG.searchRadiusMeters,
        );

        const mapsLib = (await google.maps.importLibrary(
          "maps",
        )) as google.maps.MapsLibrary;
        const infoWindow =
          infoWindowRef.current ?? new mapsLib.InfoWindow();
        infoWindowRef.current = infoWindow;
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(COMMUNITY_MAP_CONFIG.center);

        const mapId = getGoogleMapsMapId();
        const useAdvanced = Boolean(mapId);

        for (const place of places) {
          const loc = place.location;
          if (!loc) continue;
          const { lat, lng } = latLngFromPlace(loc);
          const name = displayNameFromPlace(place.displayName);

          bounds.extend({ lat, lng });

          const content = buildInfoWindowElement({
            name,
            address: place.formattedAddress ?? undefined,
            lat,
            lng,
          });

          if (useAdvanced) {
            const markerLib = (await google.maps.importLibrary(
              "marker",
            )) as google.maps.MarkerLibrary;
            const marker = new markerLib.AdvancedMarkerElement({
              map: mapRef.current,
              position: { lat, lng },
              title: name,
            });
            marker.addListener("click", () => {
              infoWindow.setContent(content);
              infoWindow.open({ map: mapRef.current!, anchor: marker });
            });
            markersRef.current.push(marker);
          } else {
            const marker = new google.maps.Marker({
              map: mapRef.current,
              position: { lat, lng },
              title: name,
            });
            marker.addListener("click", () => {
              infoWindow.setContent(content);
              infoWindow.open({ map: mapRef.current!, anchor: marker });
            });
            markersRef.current.push(marker);
          }
        }

        mapRef.current.fitBounds(bounds);
        setMapStatus("ready");
      } catch {
        setPlacesSearchFailed(true);
        setMapStatus("ready");
      }
    },
    [clearMarkers, useFallback],
  );

  const initMap = useCallback(async () => {
    if (!apiKey || !mapDivRef.current || mapRef.current || mapsAuthFailed) {
      if (mapsAuthFailed) enterFallback();
      return;
    }

    setMapStatus("loading");
    try {
      await loadGoogleMaps(apiKey);
      const mapsLib = (await google.maps.importLibrary(
        "maps",
      )) as google.maps.MapsLibrary;
      const mapId = getGoogleMapsMapId();
      const map = new mapsLib.Map(mapDivRef.current, {
        center: COMMUNITY_MAP_CONFIG.center,
        zoom: 13,
        mapId: mapId ?? undefined,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
      mapRef.current = map;
      await placeCommunityMarker(map, Boolean(mapId));
      setMapStatus("ready");
    } catch {
      enterFallback();
    }
  }, [apiKey, enterFallback, placeCommunityMarker]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsVisible(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.1 },
    );
    observerRef.current.observe(node);

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || useFallback || mapInitializedRef.current) return;
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }
    mapInitializedRef.current = true;
    void initMap();
  }, [isVisible, initMap, useFallback, enterFallback]);

  useEffect(() => {
    if (!mapRef.current || useFallback || mapStatus !== "ready") return;
    void searchPlaces(activeCategory);
  }, [activeCategory, mapStatus, searchPlaces, useFallback]);

  const { center } = COMMUNITY_MAP_CONFIG;
  const embedUrl = buildEmbedMapUrl(center.lat, center.lng);
  const showCuratedList =
    showStaticList || useFallback || placesSearchFailed;

  return (
    <div ref={containerRef} className={cn("space-y-4", className)}>
      <div
        role="tablist"
        aria-label="Filter nearby amenities by category"
        className="flex flex-wrap gap-2"
      >
        {AMENITY_CATEGORIES.map((cat) => {
          const selected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={cat.ariaLabel}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-standard focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
                selected
                  ? "bg-primary text-white"
                  : "bg-white text-primary border border-neutral-200 hover:border-secondary",
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow-inner",
          heightClassName,
        )}
        aria-label={`Map of amenities near ${COMMUNITY_MAP_CONFIG.fullName}`}
      >
        {useFallback ? (
          <iframe
            title={`Map centered on ${COMMUNITY_MAP_CONFIG.fullName}`}
            src={embedUrl}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <>
            <div ref={mapDivRef} className="h-full w-full" />
            {mapStatus === "loading" && (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/60 text-sm text-neutral-600"
                aria-live="polite"
              >
                Loading map…
              </div>
            )}
          </>
        )}
      </div>

      {showCuratedList && (
        <StaticAmenityList
          categoryFilter={activeCategory}
          showCategoryEmptyMessage={!useFallback && placesSearchFailed}
        />
      )}
    </div>
  );
}
