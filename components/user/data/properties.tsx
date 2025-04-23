// Property types
export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  formattedPrice: string;
  description: string;
  images: string[];
  beds: number;
  baths: number;
  sqft: number;
  yearBuilt: number;
  propertyType: "apartment" | "house" | "condo" | "townhouse" | "loft";
  features: Feature[];
  amenities: string[];
  isVerified: boolean;
  isFeatured: boolean;
  availableFrom: string;
  agent: Agent;
  createdAt: string;
}

export interface Feature {
  name: string;
  icon: string;
  available: boolean;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  image: string;
  rating: number;
  reviewCount: number;
  properties: number;
  experience: number;
  isVerified: boolean;
}

// Sample property data
export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Apartment with City View",
    address: "123 King Fahd Road",
    city: "Riyadh",
    state: "Riyadh",
    zip: "11564",
    price: 9375, // ~$2,500 converted to SAR
    formattedPrice: "9,375 SAR/mo",
    description:
      "This stunning modern apartment features floor-to-ceiling windows offering breathtaking city views. The open-concept living space is perfect for entertaining, while the gourmet kitchen includes stainless steel appliances and quartz countertops. The primary bedroom suite includes a walk-in closet and a luxurious bathroom with a soaking tub and separate shower. Building amenities include a 24-hour doorman, fitness center, and rooftop terrace.",
    images: [
      "/user/property-1.webp",
      "/user/property-2.jpg",
      "/user/property-3.jpg",
      "/user/property-4.jpg",
    ],
    beds: 2,
    baths: 2,
    sqft: 1200,
    yearBuilt: 2018,
    propertyType: "apartment",
    features: [
      { name: "Balcony", icon: "balcony", available: true },
      { name: "Parking", icon: "parking", available: true },
      { name: "Wifi", icon: "wifi", available: true },
      { name: "Kitchen", icon: "kitchen", available: true },
      { name: "Air Conditioning", icon: "ac", available: true },
    ],
    amenities: [
      "Elevator",
      "Fitness Center",
      "Rooftop Terrace",
      "Doorman",
      "In-unit Laundry",
      "Pet Friendly",
    ],
    isVerified: true,
    isFeatured: true,
    availableFrom: "June 1, 2023",
    agent: {
      id: "a1",
      name: "Jane Smith",
      phone: "(555) 123-4567",
      email: "jane@realestate.com",
      image: "https://avatar.iran.liara.run/public/boy",
      rating: 4.8,
      reviewCount: 124,
      properties: 45,
      experience: 7,
      isVerified: true,
    },
    createdAt: "2023-04-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Luxury Condo in Downtown",
    address: "456 Olaya Street",
    city: "Riyadh",
    state: "Riyadh",
    zip: "12211",
    price: 14250, // ~$3,800 converted to SAR
    formattedPrice: "14,250 SAR/mo",
    description:
      "Experience luxury living in this stunning downtown condo featuring premium finishes and spectacular views. This spacious unit offers an open floor plan with hardwood floors throughout, a chef's kitchen with top-of-the-line appliances, and a primary suite with a spa-like bathroom. The building provides 5-star amenities including a concierge service, infinity pool, state-of-the-art fitness center, and resident lounge. Located in the heart of the city with easy access to shopping, dining, and entertainment.",
    images: [
      "/user/property-2.jpg",
      "/user/property-1.webp",
      "/user/property-3.jpg",
      "/user/property-4.jpg",
    ],
    beds: 3,
    baths: 2,
    sqft: 1800,
    yearBuilt: 2015,
    propertyType: "condo",
    features: [
      { name: "Balcony", icon: "balcony", available: true },
      { name: "Parking", icon: "parking", available: true },
      { name: "Wifi", icon: "wifi", available: true },
      { name: "Kitchen", icon: "kitchen", available: true },
      { name: "Air Conditioning", icon: "ac", available: true },
    ],
    amenities: [
      "Concierge",
      "Swimming Pool",
      "Fitness Center",
      "Resident Lounge",
      "In-unit Laundry",
      "Pet Friendly",
      "Security",
    ],
    isVerified: true,
    isFeatured: true,
    availableFrom: "May 15, 2023",
    agent: {
      id: "a2",
      name: "Michael Johnson",
      phone: "(555) 987-6543",
      email: "michael@realestate.com",
      image: "https://avatar.iran.liara.run/public/boy",
      rating: 4.9,
      reviewCount: 156,
      properties: 62,
      experience: 9,
      isVerified: true,
    },
    createdAt: "2023-04-10T14:45:00Z",
  },
  {
    id: "3",
    title: "Downtown Loft with Industrial Charm",
    address: "789 Tahlia Street",
    city: "Jeddah",
    state: "Makkah",
    zip: "23421",
    price: 15750, // ~$4,200 converted to SAR
    formattedPrice: "15,750 SAR/mo",
    description:
      "This stunning downtown loft combines industrial charm with modern luxury. Featuring exposed brick walls, high ceilings with original wooden beams, and oversized windows that flood the space with natural light. The open floor plan includes a gourmet kitchen with a large island, stainless steel appliances, and custom cabinetry. The spacious bedroom area offers ample closet space and a luxurious en-suite bathroom with a walk-in shower. Additional highlights include hardwood floors throughout, in-unit laundry, and smart home technology. Located in a historic building with elevator access and a rooftop deck offering panoramic city views.",
    images: [
      "/user/property-3.jpg",
      "/user/property-1.webp",
      "/user/property-2.jpg",
      "/user/property-4.jpg",
    ],
    beds: 1,
    baths: 1,
    sqft: 950,
    yearBuilt: 1920,
    propertyType: "loft",
    features: [
      { name: "High Ceilings", icon: "ceiling", available: true },
      { name: "Exposed Brick", icon: "brick", available: true },
      { name: "Wifi", icon: "wifi", available: true },
      { name: "Kitchen", icon: "kitchen", available: true },
      { name: "Air Conditioning", icon: "ac", available: true },
    ],
    amenities: [
      "Elevator",
      "Rooftop Deck",
      "In-unit Laundry",
      "Smart Home",
      "Security System",
      "Bike Storage",
    ],
    isVerified: true,
    isFeatured: false,
    availableFrom: "June 15, 2023",
    agent: {
      id: "a3",
      name: "Sarah Williams",
      phone: "(555) 234-5678",
      email: "sarah@realestate.com",
      image: "https://avatar.iran.liara.run/public/boy",
      rating: 4.7,
      reviewCount: 98,
      properties: 37,
      experience: 5,
      isVerified: true,
    },
    createdAt: "2023-04-20T09:15:00Z",
  },
  {
    id: "4",
    title: "Spacious Family Home with Garden",
    address: "567 Al Nakheel District",
    city: "Dammam",
    state: "Eastern Province",
    zip: "32414",
    price: 20625, // ~$5,500 converted to SAR
    formattedPrice: "20,625 SAR/mo",
    description:
      "Beautiful family home in a quiet neighborhood featuring 4 bedrooms and 3 bathrooms. This spacious house offers a large living room with a fireplace, formal dining room, and a modern kitchen with granite countertops and stainless steel appliances. The primary suite includes a walk-in closet and an en-suite bathroom with a soaking tub. The fenced backyard features a garden, patio area, and a play structure. Additional amenities include a two-car garage, basement storage, and a laundry room. Located near excellent schools, parks, and shopping centers.",
    images: [
      "/user/property-4.jpg",
      "/user/property-1.webp",
      "/user/property-2.jpg",
      "/user/property-3.jpg",
    ],
    beds: 4,
    baths: 3,
    sqft: 2400,
    yearBuilt: 2005,
    propertyType: "house",
    features: [
      { name: "Garden", icon: "garden", available: true },
      { name: "Garage", icon: "garage", available: true },
      { name: "Fireplace", icon: "fireplace", available: true },
      { name: "Basement", icon: "basement", available: true },
      { name: "Air Conditioning", icon: "ac", available: true },
    ],
    amenities: [
      "Fenced Yard",
      "Patio",
      "Laundry Room",
      "Storage",
      "Hardwood Floors",
      "Family Room",
    ],
    isVerified: true,
    isFeatured: true,
    availableFrom: "July 1, 2023",
    agent: {
      id: "a4",
      name: "David Chen",
      phone: "(555) 345-6789",
      email: "david@realestate.com",
      image: "https://avatar.iran.liara.run/public/boy",
      rating: 4.9,
      reviewCount: 142,
      properties: 53,
      experience: 8,
      isVerified: true,
    },
    createdAt: "2023-04-18T11:20:00Z",
  },
  {
    id: "5",
    title: "Charming Townhouse with Rooftop Terrace",
    address: "321 Al Khobar Road",
    city: "Khobar",
    state: "Eastern Province",
    zip: "31952",
    price: 12000, // ~$3,200 converted to SAR
    formattedPrice: "12,000 SAR/mo",
    description:
      "Charming three-story townhouse featuring 3 bedrooms and 2.5 bathrooms. This beautifully renovated home offers hardwood floors throughout, a modern kitchen with quartz countertops, and a spacious living room with large windows. The primary bedroom includes an en-suite bathroom and a walk-in closet. The highlight of this property is the private rooftop terrace with stunning city views, perfect for entertaining. Additional features include a half bathroom on the main level, in-unit laundry, and a small garden area. Conveniently located near public transportation, restaurants, and shops.",
    images: [
      "/user/property-5.png",
      "/user/property-2.jpg",
      "/user/property-3.jpg",
      "/user/property-4.jpg",
    ],
    beds: 3,
    baths: 2.5,
    sqft: 1650,
    yearBuilt: 1998,
    propertyType: "townhouse",
    features: [
      { name: "Rooftop Terrace", icon: "terrace", available: true },
      { name: "Garden", icon: "garden", available: true },
      { name: "Wifi", icon: "wifi", available: true },
      { name: "Kitchen", icon: "kitchen", available: true },
      { name: "Air Conditioning", icon: "ac", available: true },
    ],
    amenities: [
      "In-unit Laundry",
      "Hardwood Floors",
      "Walk-in Closet",
      "Multiple Levels",
      "Renovated",
      "City Views",
    ],
    isVerified: true,
    isFeatured: false,
    availableFrom: "June 1, 2023",
    agent: {
      id: "a5",
      name: "Emily Rodriguez",
      phone: "(555) 456-7890",
      email: "emily@realestate.com",
      image: "https://avatar.iran.liara.run/public/boy",
      rating: 4.6,
      reviewCount: 87,
      properties: 29,
      experience: 4,
      isVerified: true,
    },
    createdAt: "2023-04-22T13:40:00Z",
  },
  {
    id: "6",
    title: "Stylish Studio in Trendy Neighborhood",
    address: "987 Corniche Road",
    city: "Jeddah",
    state: "Makkah",
    zip: "23432",
    price: 6750, // ~$1,800 converted to SAR
    formattedPrice: "6,750 SAR/mo",
    description:
      "Stylish studio apartment in a trendy neighborhood featuring modern design and efficient use of space. This recently renovated unit offers hardwood floors, large windows with plenty of natural light, and a sleek kitchen with stainless steel appliances and a breakfast bar. The living area includes a Murphy bed for maximizing space during the day. The bathroom features a walk-in shower with glass doors and contemporary fixtures. Building amenities include a shared rooftop lounge, laundry facilities, and bike storage. Located in a vibrant area with numerous cafes, restaurants, and boutiques within walking distance.",
    images: [
      "/user/property-6.jpg",
      "/user/property-2.jpg",
      "/user/property-3.jpg",
      "/user/property-4.jpg",
    ],
    beds: 0,
    baths: 1,
    sqft: 550,
    yearBuilt: 2010,
    propertyType: "apartment",
    features: [
      { name: "Murphy Bed", icon: "bed", available: true },
      { name: "Breakfast Bar", icon: "bar", available: true },
      { name: "Wifi", icon: "wifi", available: true },
      { name: "Kitchen", icon: "kitchen", available: true },
      { name: "Air Conditioning", icon: "ac", available: true },
    ],
    amenities: [
      "Rooftop Lounge",
      "Laundry Facilities",
      "Bike Storage",
      "Hardwood Floors",
      "Renovated",
      "Natural Light",
    ],
    isVerified: true,
    isFeatured: false,
    availableFrom: "May 15, 2023",
    agent: {
      id: "a1",
      name: "Jane Smith",
      phone: "(555) 123-4567",
      email: "jane@realestate.com",
      image: "https://avatar.iran.liara.run/public/boy",
      rating: 4.8,
      reviewCount: 124,
      properties: 45,
      experience: 7,
      isVerified: true,
    },
    createdAt: "2023-04-25T15:10:00Z",
  },
];

// Search filters
export interface SearchFilters {
  priceRange: [number, number];
  beds: number | null;
  baths: number | null;
  propertyType: string | null;
  features: string[];
  sqftRange: [number, number];
  searchTerm?: string;
}

export const defaultSearchFilters: SearchFilters = {
  priceRange: [0, 37500], // ~$10,000 converted to SAR
  beds: null,
  baths: null,
  propertyType: null,
  features: [],
  sqftRange: [0, 5000],
  searchTerm: "",
};

// Property types for filter
export const propertyTypes = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "loft", label: "Loft" },
];

// Feature options for filter
export const featureOptions = [
  { value: "balcony", label: "Balcony" },
  { value: "parking", label: "Parking" },
  { value: "wifi", label: "Wifi" },
  { value: "kitchen", label: "Kitchen" },
  { value: "ac", label: "Air Conditioning" },
  { value: "garden", label: "Garden" },
  { value: "fireplace", label: "Fireplace" },
  { value: "terrace", label: "Rooftop Terrace" },
  { value: "garage", label: "Garage" },
];

// Sample saved searches
export const savedSearches: SearchFilters[] = [
  {
    priceRange: [5625, 11250], // ~$1,500-$3,000 converted to SAR
    beds: 2,
    baths: 1,
    propertyType: "apartment",
    features: ["balcony", "parking"],
    sqftRange: [800, 1500],
    searchTerm: "Riyadh",
  },
  {
    priceRange: [11250, 18750], // ~$3,000-$5,000 converted to SAR
    beds: 3,
    baths: 2,
    propertyType: "house",
    features: ["garden", "garage"],
    sqftRange: [1500, 3000],
    searchTerm: "Al Khobar",
  },
  {
    priceRange: [7500, 15000], // ~$2,000-$4,000 converted to SAR
    beds: 1,
    baths: 1,
    propertyType: "loft",
    features: ["wifi", "ac"],
    sqftRange: [700, 1200],
    searchTerm: "Jeddah",
  },
];
