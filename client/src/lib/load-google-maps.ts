let loadPromise: Promise<void> | null = null;

export function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only load in the browser"));
  }

  if (window.google?.maps) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    const callbackName = "__ridgesGoogleMapsInit";
    const existing = document.querySelector<HTMLScriptElement>(
      "script[data-ridges-google-maps]",
    );

    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Google Maps script failed to load")),
      );
      return;
    }

    (window as unknown as Record<string, () => void>)[callbackName] = () => {
      resolve();
    };

    const script = document.createElement("script");
    script.dataset.ridgesGoogleMaps = "true";
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&loading=async&callback=${callbackName}`;
    script.onerror = () => reject(new Error("Google Maps script failed to load"));
    document.head.appendChild(script);
  });

  return loadPromise;
}
