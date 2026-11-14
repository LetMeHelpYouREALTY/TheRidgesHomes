export const SITE_INFO = {
  title: "The Ridges Summerlin Homes",
  description: "Explore luxury homes in The Ridges Summerlin with Dr. Jan Duffy, your expert real estate agent specializing in Las Vegas luxury properties.",
  phone: "(702) 842-0410",
  email: "jan@theridgessummerlinhomes.com",
  address: {
    street: "10100 W Charleston Blvd, Suite 160",
    city: "Las Vegas",
    state: "NV",
    zip: "89135"
  },
  hours: {
    weekdays: "Monday-Friday: 9am-6pm",
    weekends: "Weekends: By appointment"
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com"
  }
};

export const HOMEBOT_ACCOUNT_ID = "35de8cf0a487cf0fec06278f2023805ea02eba0b58960a43";
export const REALSCOUT_AGENT_ID = "QWdlbnQtMjI1MDUw";

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Community", path: "/community" },
  { name: "Listings", path: "/listings" },
  { 
    name: "Resources", 
    path: "/resources",
    dropdown: [
      { name: "Buyer's Guide", path: "/resources?tab=buyer" },
      { name: "Seller's Guide", path: "/resources?tab=seller" },
      { name: "Mortgage Calculator", path: "/resources?tab=mortgage" },
      { name: "Market Reports", path: "/resources?tab=market" },
      { name: "Home Valuation", path: "/resources?tab=valuation" },
      { name: "Relocation", path: "/resources?tab=relocation" },
      { name: "Blog", path: "/resources?tab=blog" }
    ]
  },
  { name: "Contact", path: "/contact" },
  { name: "Professional Disclosure", path: "/disclosure" }
];

// Sample listings were removed on 2026-11-14; live listings come from the
// RealScout widgets on the home and /listings pages.

// Sample testimonials were removed on 2026-11-14. Reviews now link to
// Dr. Jan Duffy's Google Business Profile, where clients post them.
export const GOOGLE_REVIEWS_URL = "https://search.google.com/local/reviews?placeid=ChIJO3KBufO_yIARCylQ-F54gss";

export const COMMUNITY_FEATURES = [
  {
    id: 1,
    title: "World-Class Golf",
    description: "Experience championship golf at Bear's Best, featuring replicas of Jack Nicklaus' favorite holes from around the world.",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
  },
  {
    id: 2,
    title: "Club Ridges",
    description: "An exclusive private clubhouse featuring a state-of-the-art fitness center, resort-style pools, and tennis courts.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
  },
  {
    id: 3,
    title: "Downtown Summerlin",
    description: "Minutes away from premier shopping, dining, and entertainment at the 106-acre Downtown Summerlin complex.",
    image: "https://images.unsplash.com/photo-1555529771-7888783a18d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
  }
];
