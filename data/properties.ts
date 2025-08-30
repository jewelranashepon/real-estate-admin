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
    title: "Luxury Villa in Abdoun",
    type: "Villa",
    price: "230,000 JOD",
    location: "Abdoun, Amman",
    district: "Abdoun",
    city: "Amman",
    description:
      "A beautiful luxury villa with 5 bedrooms, 4 bathrooms, a swimming pool, and a garden. Located in Abdoun, one of Amman's most prestigious neighborhoods.",
    status: "pending",
    createdAt: "2023-10-15",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 31.949,
      lng: 35.919,
    },
  },
  {
    id: "2",
    title: "Modern Apartment in Shmeisani",
    type: "Apartment",
    price: "160,000 JOD",
    location: "Shmeisani, Amman",
    district: "Shmeisani",
    city: "Amman",
    description:
      "A modern apartment with 3 bedrooms, 2 bathrooms, and a balcony with city views. Prime location in Shmeisani with easy access to shopping and dining.",
    status: "approved",
    createdAt: "2023-09-28",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 31.971,
      lng: 35.909,
    },
  },
  {
    id: "3",
    title: "Commercial Space in Sweifieh",
    type: "Commercial",
    price: "665,000 JOD",
    location: "Sweifieh, Amman",
    district: "Sweifieh",
    city: "Amman",
    description:
      "A prime commercial space in Sweifieh. Perfect for offices or retail businesses looking for high visibility and foot traffic in West Amman.",
    status: "pending",
    createdAt: "2023-10-10",
    images: ["/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 31.953,
      lng: 35.866,
    },
  },
  {
    id: "4",
    title: "Family Home with Garden",
    type: "House",
    price: "180,000 JOD",
    location: "Rabieh, Amman",
    district: "Rabieh",
    city: "Amman",
    description:
      "A cozy family home with 4 bedrooms, 3 bathrooms, and a beautiful garden. Located in a quiet Rabieh neighborhood with good schools nearby.",
    status: "rejected",
    createdAt: "2023-09-15",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 31.978,
      lng: 35.880,
    },
  },
  {
    id: "5",
    title: "Penthouse with City View in Khalda",
    type: "Apartment",
    price: "340,000 JOD",
    location: "Khalda, Amman",
    district: "Khalda",
    city: "Amman",
    description:
      "A luxurious penthouse with 4 bedrooms, 3 bathrooms, and a large terrace with panoramic city views. Features high-end finishes and smart home technology.",
    status: "approved",
    createdAt: "2023-08-22",
    images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 31.999,
      lng: 35.852,
    },
  },
  {
    id: "6",
    title: "Investment Land in Jubeiha",
    type: "Land",
    price: "475,000 JOD",
    location: "Jubeiha, Amman",
    district: "Jubeiha",
    city: "Amman",
    description:
      "A large plot of land in a rapidly developing area of North Amman. Great investment opportunity with high potential for appreciation.",
    status: "approved",
    createdAt: "2023-07-30",
    images: ["/placeholder.svg?height=300&width=400"],
    coordinates: {
      lat: 32.027,
      lng: 35.866,
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
