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
import { loadGoogleMapsScript } from "@/lib/load-google-maps";
import { StaticAmenityList } from "./StaticAmenityList";
import { cn } from "@/lib/utils";

type AmenityMapProps = {
  /** Reserved map height to prevent layout shift */
  heightClassName?: string;
  showStaticList?: boolean;
  defaultCategory?: AmenityCategoryId;
  className?: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildInfoWindowContent(place: {
  name: string;
  address?: string;
  rating?: number;
  lat: number;
  lng: number;
}): string {
  const ratingLine =
    place.rating != null
      ? `<p class="text-sm text-gray-600">Rating: ${place.rating.toFixed(1)}</p>`
      : "";
  const directions = buildDirectionsUrl(place.lat, place.lng);
  return `<div style="max-width:240px;padding:4px 0">
    <strong>${escapeHtml(place.name)}</strong>
    ${place.address ? `<p class="text-sm" style="margin:4px 0">${escapeHtml(place.address)}</p>` : ""}
    ${ratingLine}
    <a href="${directions}" target="_blank" rel="noopener noreferrer" style="color:#c9a227;font-weight:500">Directions</a>
  </div>`;
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
  const markersRef = useRef<Array<google.maps.Marker | google.maps.AdvancedMarkerElement>>([]);
  const communityMarkerRef = useRef<
    google.maps.Marker | google.maps.AdvancedMarkerElement | null
  >(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mapInitializedRef = useRef(false);

  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<AmenityCategoryId>(defaultCategory);
  const [apiKey] = useState(() => getGoogleMapsApiKey());
  const [mapStatus, setMapStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const [useFallback, setUseFallback] = useState(!apiKey);

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
      const mapsLib = await google.maps.importLibrary("maps");
      const infoWindow =
        infoWindowRef.current ?? new mapsLib.InfoWindow();
      infoWindowRef.current = infoWindow;

      const content = buildInfoWindowContent({
        name: centerLabel,
        address: COMMUNITY_MAP_CONFIG.centerAddress,
        lat: center.lat,
        lng: center.lng,
      });

      if (useAdvanced) {
        const markerLib = await google.maps.importLibrary("marker");
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
      setMapStatus("loading");

      try {
        const placesLib = await google.maps.importLibrary("places");
        const { places } = await placesLib.Place.searchNearby({
          fields: [
            "displayName",
            "formattedAddress",
            "location",
            "rating",
            "googleMapsURI",
          ],
          includedPrimaryTypes: category.primaryTypes,
          locationRestriction: {
            center: COMMUNITY_MAP_CONFIG.center,
            radius: COMMUNITY_MAP_CONFIG.searchRadiusMeters,
          },
          maxResultCount: 15,
        });

        const mapsLib = await google.maps.importLibrary("maps");
        const infoWindow =
          infoWindowRef.current ?? new mapsLib.InfoWindow();
        infoWindowRef.current = infoWindow;
        const bounds = new mapsLib.LatLngBounds();
        bounds.extend(COMMUNITY_MAP_CONFIG.center);

        const mapId = getGoogleMapsMapId();
        const useAdvanced = Boolean(mapId);

        for (const place of places) {
          const loc = place.location;
          const rawName = place.displayName;
          const name =
            typeof rawName === "string"
              ? rawName
              : (rawName as { text?: string } | undefined)?.text ?? "Place";
          if (!loc) continue;

          bounds.extend(loc);

          const content = buildInfoWindowContent({
            name,
            address: place.formattedAddress,
            rating: place.rating,
            lat: loc.lat,
            lng: loc.lng,
          });

          if (useAdvanced) {
            const markerLib = await google.maps.importLibrary("marker");
            const marker = new markerLib.AdvancedMarkerElement({
              map: mapRef.current,
              position: loc,
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
              position: loc,
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
        setUseFallback(true);
        setMapStatus("error");
      }
    },
    [clearMarkers, useFallback],
  );

  const initMap = useCallback(async () => {
    if (!apiKey || !mapDivRef.current || mapRef.current) return;

    setMapStatus("loading");
    try {
      await loadGoogleMapsScript(apiKey);
      const mapsLib = await google.maps.importLibrary("maps");
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
      setUseFallback(true);
      setMapStatus("error");
    }
  }, [apiKey, placeCommunityMarker]);

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
    mapInitializedRef.current = true;
    void initMap();
  }, [isVisible, initMap, useFallback]);

  useEffect(() => {
    if (!mapRef.current || useFallback || mapStatus !== "ready") return;
    void searchPlaces(activeCategory);
  }, [activeCategory, mapStatus, searchPlaces, useFallback]);

  const { center } = COMMUNITY_MAP_CONFIG;
  const embedUrl = buildEmbedMapUrl(center.lat, center.lng);

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

      {useFallback && (
        <p className="text-sm text-neutral-600">
          Interactive place search appears when{" "}
          <code className="text-xs">VITE_GOOGLE_MAPS_API_KEY</code> is configured.
          The map above shows the community center at Club Ridges.
        </p>
      )}

      {showStaticList && (
        <StaticAmenityList categoryFilter={activeCategory} />
      )}
    </div>
  );
}
