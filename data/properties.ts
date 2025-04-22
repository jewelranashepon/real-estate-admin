export type PropertyStatus = "pending" | "approved" | "rejected"

export interface Property {
  id: string
  title: string
  type: string
  price: string
  location: string
  district: string
  city: string
  description: string
  status: PropertyStatus
  createdAt: string
  images: string[]
  coordinates: {
    lat: number
    lng: number
  }
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Luxury Villa in Al Olaya",
    type: "Villa",
    price: "1,200,000 SAR",
    location: "Al Olaya, Riyadh",
    district: "Al Olaya",
    city: "Riyadh",
    description:
      "A beautiful luxury villa with 5 bedrooms, 4 bathrooms, a swimming pool, and a garden. Perfect for families looking for a spacious home in a premium location.",
    status: "pending",
    createdAt: "2023-10-15",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 24.7136,
      lng: 46.6753,
    },
  },
  {
    id: "2",
    title: "Modern Apartment in City Center",
    type: "Apartment",
    price: "850,000 SAR",
    location: "Al Malaz, Riyadh",
    district: "Al Malaz",
    city: "Riyadh",
    description:
      "A modern apartment with 3 bedrooms, 2 bathrooms, and a balcony with city views. Located in the heart of Riyadh with easy access to shopping centers and restaurants.",
    status: "approved",
    createdAt: "2023-09-28",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 24.7741,
      lng: 46.7388,
    },
  },
  {
    id: "3",
    title: "Commercial Space in Business District",
    type: "Commercial",
    price: "3,500,000 SAR",
    location: "King Fahd Road, Riyadh",
    district: "King Fahd Road",
    city: "Riyadh",
    description:
      "A prime commercial space in the business district of Riyadh. Perfect for offices or retail businesses looking for high visibility and foot traffic.",
    status: "pending",
    createdAt: "2023-10-10",
    images: ["/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 24.7104,
      lng: 46.6735,
    },
  },
  {
    id: "4",
    title: "Family Home with Garden",
    type: "House",
    price: "950,000 SAR",
    location: "Al Narjis, Riyadh",
    district: "Al Narjis",
    city: "Riyadh",
    description:
      "A cozy family home with 4 bedrooms, 3 bathrooms, and a beautiful garden. Located in a quiet neighborhood with good schools nearby.",
    status: "rejected",
    createdAt: "2023-09-15",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 24.8174,
      lng: 46.7323,
    },
  },
  {
    id: "5",
    title: "Penthouse with City View",
    type: "Apartment",
    price: "1,800,000 SAR",
    location: "Al Hamra, Riyadh",
    district: "Al Hamra",
    city: "Riyadh",
    description:
      "A luxurious penthouse with 4 bedrooms, 3 bathrooms, and a large terrace with panoramic city views. Features high-end finishes and smart home technology.",
    status: "approved",
    createdAt: "2023-08-22",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 24.7511,
      lng: 46.6892,
    },
  },
  {
    id: "6",
    title: "Investment Land in New Development",
    type: "Land",
    price: "2,500,000 SAR",
    location: "Al Qirawan, Riyadh",
    district: "Al Qirawan",
    city: "Riyadh",
    description:
      "A large plot of land in a rapidly developing area of Riyadh. Great investment opportunity with high potential for appreciation.",
    status: "approved",
    createdAt: "2023-07-30",
    images: ["/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 24.8234,
      lng: 46.7123,
    },
  },
]

export const getPropertyStats = () => {
  const totalProperties = properties.length
  const pendingApproval = properties.filter((p) => p.status === "pending").length
  const approved = properties.filter((p) => p.status === "approved").length
  const rejected = properties.filter((p) => p.status === "rejected").length

  return {
    totalProperties,
    pendingApproval,
    approved,
    rejected,
  }
}

export const getRecentProperties = (limit = 4) => {
  return [...properties]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

export const getPropertyById = (id: string) => {
  return properties.find((property) => property.id === id)
}
