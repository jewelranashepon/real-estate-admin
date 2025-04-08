// import type { Property } from "@/components/admin/properties-table"
import type { PropertyType } from "./types"

export function getProperties(): PropertyType[] {
  return [
    {
      id: "1",
      price: 1250000,
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      type: "Condo",
      imageUrl: "/downtown1.webp",
      lat: 40.7128,
      lng: -74.006,
    },
    {
      id: "2",
      price: 850000,
      address: "456 Park Ave",
      city: "New York",
      state: "NY",
      zipCode: "10022",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      type: "Apartment",
      imageUrl: "/downtown2.webp",
      lat: 40.7282,
      lng: -73.9882,
    },
    {
      id: "3",
      price: 2100000,
      address: "789 Broadway",
      city: "New York",
      state: "NY",
      zipCode: "10003",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2500,
      type: "House",
      imageUrl: "/pj1.jpg",
      lat: 40.7358,
      lng: -73.9911,
    },
    {
      id: "4",
      price: 1750000,
      address: "321 5th Ave",
      city: "New York",
      state: "NY",
      zipCode: "10016",
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 2100,
      type: "Townhouse",
      imageUrl: "/PJ2.jpg",
      lat: 40.7448,
      lng: -73.9867,
    },
    {
      id: "5",
      price: 925000,
      address: "555 W 23rd St",
      city: "New York",
      state: "NY",
      zipCode: "10011",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1350,
      type: "Condo",
      imageUrl: "/dt3.jpg",
      lat: 40.7466,
      lng: -74.0027,
    },
    {
      id: "6",
      price: 3200000,
      address: "888 Central Park West",
      city: "New York",
      state: "NY",
      zipCode: "10024",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 3200,
      type: "House",
      imageUrl: "/dt4.jpg",
      lat: 40.7822,
      lng: -73.9654,
    },
    {
      id: "7",
      price: 1450000,
      address: "42 Washington Square",
      city: "New York",
      state: "NY",
      zipCode: "10012",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1950,
      type: "Condo",
      imageUrl: "/dt5.webp",
      lat: 40.7308,
      lng: -73.9973,
    },
    {
      id: "8",
      price: 780000,
      address: "210 E 73rd St",
      city: "New York",
      state: "NY",
      zipCode: "10021",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 950,
      type: "Apartment",
      imageUrl: "/pj5.jpg",
      lat: 40.769,
      lng: -73.959,
    },
    {
      id: "9",
      price: 2750000,
      address: "77 Hudson St",
      city: "Jersey City",
      state: "NJ",
      zipCode: "07302",
      bedrooms: 4,
      bathrooms: 3.5,
      sqft: 2800,
      type: "Condo",
      imageUrl: "/pj3.jpeg",
      lat: 40.7178,
      lng: -74.0346,
    },
    {
      id: "10",
      price: 1100000,
      address: "155 Riverside Dr",
      city: "New York",
      state: "NY",
      zipCode: "10024",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1500,
      type: "Condo",
      imageUrl: "/pj6.jpg",
      lat: 40.7912,
      lng: -73.9852,
    },
  ]
}

export function getPropertyById(id: string): Property | undefined {
  return getMockProperties().find((property) => property.id === id)
}

