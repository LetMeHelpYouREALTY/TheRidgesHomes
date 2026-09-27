export const SITE_INFO = {
  title: "The Ridges Summerlin Homes",
  description: "Explore luxury homes in The Ridges Summerlin with Dr. Jan Duffy, your expert real estate agent specializing in Las Vegas luxury properties.",
  phone: "(702) 555-1234",
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
  { name: "Nearby Amenities", path: "/amenities" },
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

export const FEATURED_PROPERTIES = [
  {
    id: 1,
    title: "Elegant Desert Masterpiece",
    address: "24 Promontory Ridge Drive, Las Vegas, NV 89135",
    price: 4250000,
    beds: 5,
    baths: 6,
    sqft: 6300,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    tag: { type: "Featured", color: "secondary" }
  },
  {
    id: 2,
    title: "Modern Desert Retreat",
    address: "15 Painted Feather Way, Las Vegas, NV 89135",
    price: 5850000,
    beds: 6,
    baths: 8,
    sqft: 7500,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    tag: { type: "New Listing", color: "primary" }
  },
  {
    id: 3,
    title: "Spectacular Custom Estate",
    address: "9 Cloud Chaser Boulevard, Las Vegas, NV 89135",
    price: 7995000,
    beds: 7,
    baths: 9,
    sqft: 10200,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
    tag: { type: "Exclusive", color: "accent" }
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Michael & Sarah Thompson",
    type: "Bought in The Ridges",
    content: "Dr. Duffy's expertise in The Ridges was invaluable. She knew every detail about the community and helped us find our dream home. Her negotiation skills saved us significantly on our purchase.",
    date: "March 2023",
    rating: 5
  },
  {
    id: 2,
    name: "Jennifer Ramirez",
    type: "Sold in Falcon Ridge",
    content: "The marketing strategy Dr. Duffy implemented for our home was exceptional. Professional photography, targeted advertising, and her extensive network of high-net-worth clients led to a sale well above asking price.",
    date: "December 2022",
    rating: 5
  },
  {
    id: 3,
    name: "Robert & Elizabeth Chen",
    type: "Bought in Tournament Hills",
    content: "As international buyers, we relied heavily on Dr. Duffy's knowledge and guidance. Her attention to detail and responsiveness made the entire process seamless despite being thousands of miles away for most of the transaction.",
    date: "August 2023",
    rating: 5
  }
];

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
