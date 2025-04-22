import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Square,
  Filter,
  ArrowUpDown,
  SearchIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample property data
const properties = [
  {
    id: 1,
    title: "Modern Apartment",
    address: "123 Main St, New York, NY",
    price: "$2,500/mo",
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Parking", "Gym", "Pool"],
    type: "Apartment",
    saved: true,
    new: false,
  },
  {
    id: 2,
    title: "Luxury Condo",
    address: "456 Park Ave, New York, NY",
    price: "$3,800/mo",
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Doorman", "Elevator", "Balcony"],
    type: "Condo",
    saved: true,
    new: true,
  },
  {
    id: 3,
    title: "Downtown Loft",
    address: "789 Broadway, New York, NY",
    price: "$4,200/mo",
    beds: 1,
    baths: 1,
    sqft: 950,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Furnished", "Utilities Included", "Pets Allowed"],
    type: "Loft",
    saved: true,
    new: false,
  },
  {
    id: 4,
    title: "Waterfront Penthouse",
    address: "101 River Dr, Jersey City, NJ",
    price: "$5,500/mo",
    beds: 3,
    baths: 3,
    sqft: 2200,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Rooftop", "Concierge", "Waterfront"],
    type: "Penthouse",
    saved: true,
    new: true,
  },
  {
    id: 5,
    title: "Garden Townhouse",
    address: "55 Greene St, Brooklyn, NY",
    price: "$3,200/mo",
    beds: 2,
    baths: 1.5,
    sqft: 1400,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Private Garden", "Renovated", "Fireplace"],
    type: "Townhouse",
    saved: true,
    new: false,
  },
  {
    id: 6,
    title: "Historic Brownstone",
    address: "77 Washington Ave, Brooklyn, NY",
    price: "$4,800/mo",
    beds: 4,
    baths: 2,
    sqft: 2400,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Historic", "Hardwood Floors", "High Ceilings"],
    type: "Brownstone",
    saved: true,
    new: false,
  },
  {
    id: 7,
    title: "Midtown Studio",
    address: "300 E 42nd St, New York, NY",
    price: "$1,950/mo",
    beds: 0,
    baths: 1,
    sqft: 550,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Laundry", "Elevator", "Fitness Center"],
    type: "Studio",
    saved: true,
    new: true,
  },
  {
    id: 8,
    title: "Uptown Duplex",
    address: "520 W 110th St, New York, NY",
    price: "$3,600/mo",
    beds: 3,
    baths: 2,
    sqft: 1650,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Duplex", "Outdoor Space", "Dishwasher"],
    type: "Duplex",
    saved: true,
    new: false,
  },
  {
    id: 9,
    title: "SoHo Artist Loft",
    address: "120 Prince St, New York, NY",
    price: "$4,500/mo",
    beds: 1,
    baths: 2,
    sqft: 1800,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Artist Space", "Exposed Brick", "Oversized Windows"],
    type: "Loft",
    saved: true,
    new: true,
  },
  {
    id: 10,
    title: "Financial District Apartment",
    address: "15 William St, New York, NY",
    price: "$3,300/mo",
    beds: 1,
    baths: 1,
    sqft: 750,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Doorman", "Gym", "Roof Deck"],
    type: "Apartment",
    saved: true,
    new: false,
  },
  {
    id: 11,
    title: "Chelsea Highrise",
    address: "505 W 23rd St, New York, NY",
    price: "$4,100/mo",
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Highrise", "Concierge", "In-unit Laundry"],
    type: "Apartment",
    saved: true,
    new: false,
  },
  {
    id: 12,
    title: "East Village Walk-up",
    address: "200 E 7th St, New York, NY",
    price: "$2,800/mo",
    beds: 1,
    baths: 1,
    sqft: 650,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Pre-war", "Renovated Kitchen", "Pets Allowed"],
    type: "Apartment",
    saved: true,
    new: true,
  },
];

export default function SavedPropertiesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Saved Properties
          </h1>
          <p className="text-muted-foreground">
            Manage your favorite properties
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search saved properties..."
            className="pl-8"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
            <SelectItem value="loft">Loft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 12 saved properties
          </p>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      width={500}
                      height={300}
                      className="h-[200px] w-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 bg-white/80 text-rose-500 hover:bg-white hover:text-rose-600"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                    {property.new && (
                      <Badge className="absolute left-2 top-2 bg-emerald-500 hover:bg-emerald-600">
                        New
                      </Badge>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <Badge
                        variant="secondary"
                        className="bg-black/70 text-white hover:bg-black/80"
                      >
                        {property.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg leading-tight">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
                        {property.address}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">{property.price}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-0.5">
                        <Bed className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {property.beds} {property.beds === 1 ? "Bed" : "Beds"}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Bath className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {property.baths}{" "}
                          {property.baths === 1 ? "Bath" : "Baths"}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Square className="h-4 w-4 text-muted-foreground" />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {property.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/property/${property.id}`}>View Details</Link>
                  </Button>
                  <Button variant="secondary" size="sm">
                    Contact Agent
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative sm:w-[240px]">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      width={240}
                      height={160}
                      className="h-[160px] w-full sm:w-[240px] object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 bg-white/80 text-rose-500 hover:bg-white hover:text-rose-600"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                    {property.new && (
                      <Badge className="absolute left-2 top-2 bg-emerald-500 hover:bg-emerald-600">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {property.title}
                            </h3>
                            <div className="flex items-center text-muted-foreground text-sm">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
                              {property.address}
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-black/70 text-white hover:bg-black/80"
                          >
                            {property.type}
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-0.5">
                            <Bed className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {property.beds}{" "}
                              {property.beds === 1 ? "Bed" : "Beds"}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <Bath className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {property.baths}{" "}
                              {property.baths === 1 ? "Bath" : "Baths"}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <Square className="h-4 w-4 text-muted-foreground" />
                            <span>{property.sqft} sqft</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {property.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="font-semibold text-lg">
                          {property.price}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/property/${property.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button variant="secondary" size="sm">
                            Contact Agent
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
