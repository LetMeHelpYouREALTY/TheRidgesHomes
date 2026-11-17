/**
 * Hyperlocal map configuration for The Ridges Summerlin.
 * Map center: Club Ridges clubhouse (11550 Granite Ridge Dr, Las Vegas, NV 89135).
 */
export const COMMUNITY_MAP_CONFIG = {
  name: "The Ridges",
  fullName: "The Ridges Summerlin",
  city: "Las Vegas",
  state: "NV",
  zip: "89135",
  center: {
    lat: 36.1167394,
    lng: -115.3372164,
  },
  centerAddress: "11550 Granite Ridge Dr, Las Vegas, NV 89135",
  centerLabel: "The Ridges Summerlin (Club Ridges)",
  searchRadiusMeters: 5000,
  siteUrl: "https://www.theridgessummerlinhomes.com",
};

export type AmenityCategoryId =
  | "golf"
  | "parks"
  | "restaurants"
  | "cafes"
  | "grocery"
  | "healthcare"
  | "pharmacies"
  | "shopping"
  | "fitness"
  | "schools"
  | "parking";

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Google Places API (New) includedPrimaryTypes — one searchNearby per category */
  primaryTypes: string[];
  ariaLabel: string;
};

export const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id: "golf",
    label: "Golf",
    primaryTypes: ["golf_course"],
    ariaLabel: "Show golf courses near The Ridges Summerlin",
  },
  {
    id: "parks",
    label: "Parks",
    primaryTypes: ["park", "national_park"],
    ariaLabel: "Show parks and recreation near The Ridges Summerlin",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    primaryTypes: ["restaurant"],
    ariaLabel: "Show restaurants near The Ridges Summerlin",
  },
  {
    id: "cafes",
    label: "Cafes",
    primaryTypes: ["cafe", "coffee_shop"],
    ariaLabel: "Show cafes near The Ridges Summerlin",
  },
  {
    id: "grocery",
    label: "Grocery",
    primaryTypes: ["grocery_store", "supermarket"],
    ariaLabel: "Show grocery stores near The Ridges Summerlin",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    primaryTypes: ["hospital", "doctor"],
    ariaLabel: "Show hospitals and medical offices near The Ridges Summerlin",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    primaryTypes: ["pharmacy", "drugstore"],
    ariaLabel: "Show pharmacies near The Ridges Summerlin",
  },
  {
    id: "shopping",
    label: "Shopping",
    primaryTypes: ["shopping_mall", "department_store"],
    ariaLabel: "Show shopping near The Ridges Summerlin",
  },
  {
    id: "fitness",
    label: "Fitness",
    primaryTypes: ["gym", "fitness_center"],
    ariaLabel: "Show fitness centers near The Ridges Summerlin",
  },
  {
    id: "schools",
    label: "Schools",
    primaryTypes: ["school", "primary_school", "secondary_school"],
    ariaLabel: "Show schools near The Ridges Summerlin",
  },
  {
    id: "parking",
    label: "Parking",
    primaryTypes: ["parking"],
    ariaLabel: "Show parking near The Ridges Summerlin",
  },
];

export type CuratedAmenity = {
  id: string;
  name: string;
  /** Omit from JSON-LD if unverified — all entries below are primary-source verified */
  address: string;
  category: AmenityCategoryId;
  schemaType: string;
  sourceUrl: string;
  note?: string;
};

export const CURATED_AMENITIES: CuratedAmenity[] = [
  {
    id: "club-ridges",
    name: "Club Ridges",
    address: "11550 Granite Ridge Dr, Las Vegas, NV 89135",
    category: "fitness",
    schemaType: "ExerciseGym",
    sourceUrl: "https://www.theridgeslv.com/club-ridges",
    note: "Private clubhouse and fitness center for The Ridges residents.",
  },
  {
    id: "bears-best",
    name: "Bear's Best Las Vegas",
    address: "11111 W Flamingo Rd, Las Vegas, NV 89135",
    category: "golf",
    schemaType: "GolfCourse",
    sourceUrl: "https://bearsbestlv.com/location-hours/",
    note:
      "Jack Nicklaus-designed course within The Ridges; closed to public play in 2025 for redevelopment as Amara Golf Club (verify current access before visiting).",
  },
  {
    id: "downtown-summerlin",
    name: "Downtown Summerlin",
    address: "1980 Festival Plaza Dr, Las Vegas, NV 89135",
    category: "shopping",
    schemaType: "ShoppingCenter",
    sourceUrl: "https://www.downtownsummerlin.com/",
    note: "Open-air dining, retail, and services in Summerlin.",
  },
  {
    id: "whole-foods-summerlin",
    name: "Whole Foods Market (Downtown Summerlin)",
    address: "2475 S Town Center Dr, Las Vegas, NV 89135",
    category: "grocery",
    schemaType: "GroceryStore",
    sourceUrl: "https://www.wholefoodsmarket.com/stores/downtownsummerlin",
  },
  {
    id: "smiths-charleston",
    name: "Smith's Food and Drug",
    address: "9851 W Charleston Blvd, Las Vegas, NV 89117",
    category: "grocery",
    schemaType: "GroceryStore",
    sourceUrl: "https://www.smithsfoodanddrug.com/stores/grocery/nv/las-vegas/charleston/70500214",
  },
  {
    id: "summerlin-hospital",
    name: "Summerlin Hospital Medical Center",
    address: "657 N Town Center Dr, Las Vegas, NV 89144",
    category: "healthcare",
    schemaType: "Hospital",
    sourceUrl: "https://www.dignityhealth.org/las-vegas/locations/summerlin-hospital",
  },
  {
    id: "red-rock-canyon",
    name: "Red Rock Canyon National Conservation Area",
    address: "1000 Scenic Loop Dr, Las Vegas, NV 89161",
    category: "parks",
    schemaType: "Park",
    sourceUrl: "https://www.nps.gov/redr/planyourvisit/basicinfo.htm",
    note: "Scenic desert recreation west of Summerlin.",
  },
  {
    id: "palo-verde-high",
    name: "Palo Verde High School",
    address: "333 Pavilion Center Dr, Las Vegas, NV 89144",
    category: "schools",
    schemaType: "School",
    sourceUrl: "https://www.paloverde.org/contact-us/contact",
  },
];

export const AMENITIES_FAQ = [
  {
    question: "What grocery stores are near The Ridges Summerlin?",
    answer:
      "Residents often shop at Whole Foods Market at 2475 S Town Center Drive in Downtown Summerlin, Smith's Food and Drug on West Charleston Boulevard, and additional grocers in surrounding Summerlin villages — all a short drive from the guard gates.",
  },
  {
    question: "How far is The Ridges from the Las Vegas Strip?",
    answer:
      "The Ridges sits on Summerlin's western rim; driving to the central Las Vegas Strip is commonly about 20 miles and roughly 25–35 minutes depending on traffic and your route (approximate).",
  },
  {
    question: "Are there hospitals near The Ridges Summerlin?",
    answer:
      "Yes — Summerlin Hospital Medical Center on North Town Center Drive is one of the closest full-service hospitals, with additional valley medical centers reachable by freeway.",
  },
  {
    question: "What golf is available in The Ridges?",
    answer:
      "Bear's Best Las Vegas, a Jack Nicklaus-designed course with replica holes, is within The Ridges community. Confirm current public access and redevelopment status before planning a round.",
  },
  {
    question: "How far is Harry Reid International Airport from The Ridges?",
    answer:
      "Harry Reid International Airport is roughly 20–25 miles east of The Ridges; drive time is often about 30–45 minutes in typical traffic (approximate).",
  },
  {
    question: "Where do Ridges residents dine and shop locally?",
    answer:
      "Downtown Summerlin offers restaurants, boutiques, and services at Festival Plaza Drive, minutes from The Ridges gates — many residents also use Summerlin's village centers along Charleston Boulevard and Rampart Boulevard.",
  },
  {
    question: "Which CCSD schools are assigned to The Ridges addresses?",
    answer:
      "School assignments depend on your street address within The Ridges. Verify assigned schools with the Clark County School District Zoning Search before enrolling; Palo Verde High School is one CCSD high school serving parts of Summerlin.",
  },
  {
    question: "Is outdoor recreation close to The Ridges?",
    answer:
      "Yes — Red Rock Canyon National Conservation Area is adjacent to Summerlin's western edge, and Summerlin's trail system connects neighborhoods across the master plan for walking, jogging, and cycling.",
  },
];

export function getGoogleMapsApiKey(): string | undefined {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  return typeof key === "string" && key.trim().length > 0 ? key.trim() : undefined;
}

export function getGoogleMapsMapId(): string | undefined {
  const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
  return typeof mapId === "string" && mapId.trim().length > 0 ? mapId.trim() : undefined;
}

export function buildDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function buildEmbedMapUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
}
