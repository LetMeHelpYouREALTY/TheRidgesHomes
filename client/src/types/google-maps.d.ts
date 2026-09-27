/* Minimal types for Google Maps JavaScript API dynamic loading */
export {};

declare global {
  interface Window {
    google?: typeof google;
  }

  namespace google {
    namespace maps {
      class Map {
        constructor(el: HTMLElement, opts: MapOptions);
        setCenter(latLng: LatLngLiteral): void;
        fitBounds(bounds: LatLngBounds): void;
      }
      class LatLngBounds {
        extend(point: LatLngLiteral): void;
      }
      class InfoWindow {
        constructor(opts?: { content?: string });
        setContent(content: string): void;
        open(opts: { map: Map; anchor?: Marker | AdvancedMarkerElement }): void;
        close(): void;
      }
      class Marker {
        constructor(opts?: MarkerOptions);
        setMap(map: Map | null): void;
        addListener(event: string, handler: () => void): void;
        getPosition(): LatLng | null;
      }
      class AdvancedMarkerElement {
        constructor(opts?: AdvancedMarkerOptions);
        map: Map | null;
        position: LatLngLiteral | LatLng | null;
        title: string;
        addListener(event: string, handler: () => void): void;
      }
      interface MapOptions {
        center?: LatLngLiteral;
        zoom?: number;
        mapId?: string;
        mapTypeControl?: boolean;
        streetViewControl?: boolean;
        fullscreenControl?: boolean;
      }
      interface MarkerOptions {
        map?: Map;
        position?: LatLngLiteral;
        title?: string;
        icon?: string | { url: string; scaledSize?: { width: number; height: number } };
      }
      interface AdvancedMarkerOptions {
        map?: Map;
        position?: LatLngLiteral;
        title?: string;
        content?: HTMLElement;
      }
      interface LatLngLiteral {
        lat: number;
        lng: number;
      }
      interface LatLng {
        lat(): number;
        lng(): number;
      }
      interface PlacesLibrary {
        Place: {
          searchNearby: (request: PlaceSearchNearbyRequest) => Promise<{
            places: PlaceResult[];
          }>;
        };
      }
      interface MarkerLibrary {
        AdvancedMarkerElement: typeof AdvancedMarkerElement;
      }
      interface MapsLibrary {
        Map: typeof Map;
        InfoWindow: typeof InfoWindow;
        LatLngBounds: typeof LatLngBounds;
      }
      interface PlaceSearchNearbyRequest {
        fields: string[];
        includedPrimaryTypes?: string[];
        locationRestriction: {
          center: LatLngLiteral;
          radius: number;
        };
        maxResultCount?: number;
      }
      interface PlaceResult {
        displayName?: string;
        formattedAddress?: string;
        location?: LatLngLiteral;
        rating?: number;
        googleMapsURI?: string;
      }
      function importLibrary(name: "maps"): Promise<MapsLibrary>;
      function importLibrary(name: "places"): Promise<PlacesLibrary>;
      function importLibrary(name: "marker"): Promise<MarkerLibrary>;
    }
  }
}
