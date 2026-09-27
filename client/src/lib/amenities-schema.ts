import { SITE_INFO } from "@/lib/constants";
import {
  AMENITIES_FAQ,
  COMMUNITY_MAP_CONFIG,
  CURATED_AMENITIES,
} from "@/lib/community-map";

const PAGE_PATH = "/amenities";

export function buildAmenitiesPageSchemas() {
  const pageUrl = `${COMMUNITY_MAP_CONFIG.siteUrl}${PAGE_PATH}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: COMMUNITY_MAP_CONFIG.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Nearby Amenities",
        item: pageUrl,
      },
    ],
  };

  const communityPlace = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: COMMUNITY_MAP_CONFIG.fullName,
    description:
      "Guard-gated luxury community in Summerlin, Las Vegas, featuring Bear's Best golf and Club Ridges.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11550 Granite Ridge Dr",
      addressLocality: COMMUNITY_MAP_CONFIG.city,
      addressRegion: COMMUNITY_MAP_CONFIG.state,
      postalCode: COMMUNITY_MAP_CONFIG.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMMUNITY_MAP_CONFIG.center.lat,
      longitude: COMMUNITY_MAP_CONFIG.center.lng,
    },
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Featured places near ${COMMUNITY_MAP_CONFIG.fullName}`,
    itemListElement: CURATED_AMENITIES.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": place.schemaType,
        name: place.name,
        address: place.address,
      },
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AMENITIES_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const realEstateAgent = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Dr. Jan Duffy",
    jobTitle: "REALTOR®",
    telephone: SITE_INFO.phone,
    email: SITE_INFO.email,
    url: COMMUNITY_MAP_CONFIG.siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_INFO.address.street,
      addressLocality: SITE_INFO.address.city,
      addressRegion: SITE_INFO.address.state,
      postalCode: SITE_INFO.address.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Place",
      name: COMMUNITY_MAP_CONFIG.fullName,
      geo: {
        "@type": "GeoCoordinates",
        latitude: COMMUNITY_MAP_CONFIG.center.lat,
        longitude: COMMUNITY_MAP_CONFIG.center.lng,
      },
    },
    memberOf: {
      "@type": "Organization",
      name: "Berkshire Hathaway HomeServices Nevada Properties",
    },
  };

  return [breadcrumb, communityPlace, itemList, faqPage, realEstateAgent];
}

export function injectJsonLdScripts(schemas: object[]): () => void {
  const scriptIds = schemas.map((_, i) => `amenities-jsonld-${i}`);
  scriptIds.forEach((id, i) => {
    const existing = document.getElementById(id);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemas[i]);
    document.head.appendChild(script);
  });

  return () => {
    scriptIds.forEach((id) => document.getElementById(id)?.remove());
  };
}

export function setAmenitiesPageMeta() {
  const title = `Nearby Amenities in ${COMMUNITY_MAP_CONFIG.fullName}, Las Vegas | Dr. Jan Duffy`;
  const description =
    "Interactive map and local guide to golf, dining, parks, healthcare, and shopping near The Ridges Summerlin — hyperlocal expertise from Dr. Jan Duffy.";
  const canonical = `${COMMUNITY_MAP_CONFIG.siteUrl}/amenities`;

  document.title = title;

  const setMeta = (name: string, content: string, property = false) => {
    const selector = property
      ? `meta[property="${name}"]`
      : `meta[name="${name}"]`;
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (property) {
        el.setAttribute("property", name);
      } else {
        el.setAttribute("name", name);
      }
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMeta("description", description);
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
  setMeta("og:type", "website", true);
  setMeta("og:url", canonical, true);

  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = canonical;
}
