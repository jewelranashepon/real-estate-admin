"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SearchIcon,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Filter,
  ArrowUpDown,
  Home,
  Building,
  Building2,
  Warehouse,
  DollarSign,
  X,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// Sample property data
const properties = [
  {
    id: 1,
    title: "Modern Apartment",
    address: "123 Main St, New York, NY",
    price: "$2,500/mo",
    priceValue: 2500,
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Parking", "Gym", "Pool"],
    type: "Apartment",
    saved: false,
    new: false,
  },
  {
    id: 2,
    title: "Luxury Condo",
    address: "456 Park Ave, New York, NY",
    price: "$3,800/mo",
    priceValue: 3800,
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Doorman", "Elevator", "Balcony"],
    type: "Condo",
    saved: false,
    new: true,
  },
  {
    id: 3,
    title: "Downtown Loft",
    address: "789 Broadway, New York, NY",
    price: "$4,200/mo",
    priceValue: 4200,
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
    priceValue: 5500,
    beds: 3,
    baths: 3,
    sqft: 2200,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Rooftop", "Concierge", "Waterfront"],
    type: "Penthouse",
    saved: false,
    new: true,
  },
  {
    id: 5,
    title: "Garden Townhouse",
    address: "55 Greene St, Brooklyn, NY",
    price: "$3,200/mo",
    priceValue: 3200,
    beds: 2,
    baths: 1.5,
    sqft: 1400,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Private Garden", "Renovated", "Fireplace"],
    type: "Townhouse",
    saved: false,
    new: false,
  },
  {
    id: 6,
    title: "Historic Brownstone",
    address: "77 Washington Ave, Brooklyn, NY",
    price: "$4,800/mo",
    priceValue: 4800,
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
    priceValue: 1950,
    beds: 0,
    baths: 1,
    sqft: 550,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Laundry", "Elevator", "Fitness Center"],
    type: "Studio",
    saved: false,
    new: true,
  },
  {
    id: 8,
    title: "Uptown Duplex",
    address: "520 W 110th St, New York, NY",
    price: "$3,600/mo",
    priceValue: 3600,
    beds: 3,
    baths: 2,
    sqft: 1650,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Duplex", "Outdoor Space", "Dishwasher"],
    type: "Duplex",
    saved: false,
    new: false,
  },
  {
    id: 9,
    title: "SoHo Artist Loft",
    address: "120 Prince St, New York, NY",
    price: "$4,500/mo",
    priceValue: 4500,
    beds: 1,
    baths: 2,
    sqft: 1800,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Artist Space", "Exposed Brick", "Oversized Windows"],
    type: "Loft",
    saved: false,
    new: true,
  },
  {
    id: 10,
    title: "Financial District Apartment",
    address: "15 William St, New York, NY",
    price: "$3,300/mo",
    priceValue: 3300,
    beds: 1,
    baths: 1,
    sqft: 750,
    image: "/placeholder.svg?height=300&width=500",
    tags: ["Doorman", "Gym", "Roof Deck"],
    type: "Apartment",
    saved: true,
    new: false,
  },
];

// Neighborhoods
const neighborhoods = [
  "Manhattan",
  "Brooklyn",
  "Queens",
  "Bronx",
  "Staten Island",
  "Jersey City",
  "Hoboken",
];

// Amenities
const amenities = [
  "Air Conditioning",
  "Balcony",
  "Dishwasher",
  "Doorman",
  "Elevator",
  "Fitness Center",
  "Furnished",
  "Garage",
  "Garden/Patio",
  "Hardwood Floors",
  "In-Unit Laundry",
  "Parking",
  "Pets Allowed",
  "Pool",
  "Roof Deck",
  "Storage",
  "Washer/Dryer Hookup",
  "Wheelchair Access",
];

export default function SearchPage() {
  const [savedProperties, setSavedProperties] = useState<number[]>([3, 6, 10]);
  const [priceRange, setPriceRange] = useState([1500, 6000]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleSaved = (id: number) => {
    if (savedProperties.includes(id)) {
      setSavedProperties(savedProperties.filter((propId) => propId !== id));
    } else {
      setSavedProperties([...savedProperties, id]);
    }
  };

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Search Properties
          </h1>
          <p className="text-muted-foreground">Find your perfect home</p>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Properties</SheetTitle>
                <SheetDescription>
                  Refine your search with specific criteria
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[1500, 6000]}
                      max={10000}
                      min={500}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-sm">
                        ${priceRange[0].toLocaleString()}
                      </p>
                      <p className="text-sm">
                        ${priceRange[1].toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Property Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="apartment"
                        onCheckedChange={() => addFilter("Apartment")}
                      />
                      <Label htmlFor="apartment" className="text-sm">
                        Apartment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="condo"
                        onCheckedChange={() => addFilter("Condo")}
                      />
                      <Label htmlFor="condo" className="text-sm">
                        Condo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="house"
                        onCheckedChange={() => addFilter("House")}
                      />
                      <Label htmlFor="house" className="text-sm">
                        House
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="townhouse"
                        onCheckedChange={() => addFilter("Townhouse")}
                      />
                      <Label htmlFor="townhouse" className="text-sm">
                        Townhouse
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="loft"
                        onCheckedChange={() => addFilter("Loft")}
                      />
                      <Label htmlFor="loft" className="text-sm">
                        Loft
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="studio"
                        onCheckedChange={() => addFilter("Studio")}
                      />
                      <Label htmlFor="studio" className="text-sm">
                        Studio
                      </Label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Bedrooms</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => addFilter("Studio")}
                    >
                      Studio
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => addFilter("1+ Bed")}
                    >
                      1+
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => addFilter("2+ Beds")}
                    >
                      2+
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => addFilter("3+ Beds")}
                    >
                      3+
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => addFilter("4+ Beds")}
                    >
                      4+
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Bathrooms</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => addFilter("1+ Bath")}
                    >
                      1+
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => addFilter("2+ Baths")}
                    >
                      2+
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => addFilter("3+ Baths")}
                    >
                      3+
                    </Button>
                  </div>
                </div>
                <Separator />
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="neighborhoods">
                    <AccordionTrigger>Neighborhoods</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2">
                        {neighborhoods.map((neighborhood) => (
                          <div
                            key={neighborhood}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={neighborhood
                                .toLowerCase()
                                .replace(/\s+/g, "-")}
                              onCheckedChange={() => addFilter(neighborhood)}
                            />
                            <Label
                              htmlFor={neighborhood
                                .toLowerCase()
                                .replace(/\s+/g, "-")}
                              className="text-sm"
                            >
                              {neighborhood}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="amenities">
                    <AccordionTrigger>Amenities</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2">
                        {amenities.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={amenity.toLowerCase().replace(/\s+/g, "-")}
                              onCheckedChange={() => addFilter(amenity)}
                            />
                            <Label
                              htmlFor={amenity
                                .toLowerCase()
                                .replace(/\s+/g, "-")}
                              className="text-sm"
                            >
                              {amenity}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button className="w-full">Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
          <Button variant="default" size="sm">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by location, neighborhood, or address..."
            className="pl-8"
          />
        </div>
        <Select defaultValue="rent">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rent">For Rent</SelectItem>
            <SelectItem value="buy">For Sale</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter(filter)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs text-muted-foreground"
            onClick={() => setActiveFilters([])}
          >
            Clear All
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <h3 className="font-semibold">Property Type</h3>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Home className="h-4 w-4" />
                Houses
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Building className="h-4 w-4" />
                Apartments
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Building2 className="h-4 w-4" />
                Condos
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Warehouse className="h-4 w-4" />
                Lofts
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h3 className="font-semibold">Price Range</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Slider
                defaultValue={[1500, 6000]}
                max={10000}
                min={500}
                step={100}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center border rounded-md px-2 py-1">
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        Number.parseInt(e.target.value),
                        priceRange[1],
                      ])
                    }
                    className="border-0 w-16 p-0 h-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <span className="text-muted-foreground">to</span>
                <div className="flex items-center border rounded-md px-2 py-1">
                  <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        Number.parseInt(e.target.value),
                      ])
                    }
                    className="border-0 w-16 p-0 h-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h3 className="font-semibold">Bedrooms</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  Any
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Studio
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  1
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  2
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  3
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  4+
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h3 className="font-semibold">Bathrooms</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  Any
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  1
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  1.5
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  2
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  3+
                </Button>
              </div>
            </CardContent>
          </Card>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="neighborhoods">
              <AccordionTrigger className="text-base font-semibold">
                Neighborhoods
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {neighborhoods.map((neighborhood) => (
                    <div
                      key={neighborhood}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`side-${neighborhood
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      />
                      <Label
                        htmlFor={`side-${neighborhood
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-sm"
                      >
                        {neighborhood}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="amenities">
              <AccordionTrigger className="text-base font-semibold">
                Amenities
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {amenities.slice(0, 8).map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`side-${amenity
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      />
                      <Label
                        htmlFor={`side-${amenity
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-sm"
                      >
                        {amenity}
                      </Label>
                    </div>
                  ))}
                  <Button variant="link" size="sm" className="h-auto p-0">
                    Show more <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="md:col-span-9">
          <Tabs defaultValue="grid" className="w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing 10 properties
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
                          className={`absolute right-2 top-2 bg-white/80 hover:bg-white ${
                            savedProperties.includes(property.id)
                              ? "text-rose-500 hover:text-rose-600"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          onClick={() => toggleSaved(property.id)}
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              savedProperties.includes(property.id)
                                ? "fill-current"
                                : ""
                            }`}
                          />
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
                          <p className="font-semibold text-lg">
                            {property.price}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
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
                        <Link href={`/property/${property.id}`}>
                          View Details
                        </Link>
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
                          className={`absolute right-2 top-2 bg-white/80 hover:bg-white ${
                            savedProperties.includes(property.id)
                              ? "text-rose-500 hover:text-rose-600"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          onClick={() => toggleSaved(property.id)}
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              savedProperties.includes(property.id)
                                ? "fill-current"
                                : ""
                            }`}
                          />
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
          <div className="mt-6 flex items-center justify-center">
            <Button variant="outline" size="sm" className="gap-2">
              Load More Properties
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
