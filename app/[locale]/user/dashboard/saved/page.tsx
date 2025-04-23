"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Heart,
  ArrowUpDown,
  Grid3X3,
  LayoutList,
  Filter,
  ArrowUp,
  ArrowDown,
  Calendar,
  DollarSign,
  Home,
  BarChart3,
  Search,
} from "lucide-react";
import { Button } from "@/components/user/ui/button";
import { Card } from "@/components/user/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropertyCard } from "@/components/user/property-card";
import { PropertyListItem } from "@/components/user/property-list-item";
import { StatCard } from "@/components/user/stat-card";
import { OfferModal } from "@/components/user/offer-modal";
import { Badge } from "@/components/user/ui/badge";
import { properties } from "@/data/properties";

type SortOption =
  | "price-asc"
  | "price-desc"
  | "date-asc"
  | "date-desc"
  | "name-asc"
  | "name-desc";
type FilterOption =
  | "all"
  | "apartment"
  | "house"
  | "condo"
  | "townhouse"
  | "loft";

export default function SavedPropertiesPage() {
  const router = useRouter();
  const [savedProperties, setSavedProperties] = useState<string[]>([
    "1",
    "3",
    "5",
    "2",
    "4",
  ]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [filterOption, setFilterOption] = useState<FilterOption>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  // Get saved property objects
  const savedPropertyObjects = properties.filter((property) =>
    savedProperties.includes(property.id)
  );

  // Calculate statistics
  const totalValue = savedPropertyObjects.reduce(
    (sum, property) => sum + property.price,
    0
  );
  const averagePrice =
    savedPropertyObjects.length > 0
      ? totalValue / savedPropertyObjects.length
      : 0;
  const highestPrice =
    savedPropertyObjects.length > 0
      ? Math.max(...savedPropertyObjects.map((p) => p.price))
      : 0;
  const lowestPrice =
    savedPropertyObjects.length > 0
      ? Math.min(...savedPropertyObjects.map((p) => p.price))
      : 0;

  // Filter properties
  const filteredProperties = savedPropertyObjects.filter((property) => {
    if (filterOption === "all") return true;
    return property.propertyType === filterOption;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "date-asc":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "date-desc":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const toggleSaveProperty = (propertyId: string) => {
    setSavedProperties((prev) => {
      if (prev.includes(propertyId)) {
        toast.info("Property removed from your favorites");
        return prev.filter((id) => id !== propertyId);
      } else {
        toast.success("Property saved to your favorites!");
        return [...prev, propertyId];
      }
    });
  };

  const openModal = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setIsModalOpen(true);
  };

  const getSortLabel = (option: SortOption) => {
    switch (option) {
      case "price-asc":
        return "Price: Low to High";
      case "price-desc":
        return "Price: High to Low";
      case "date-asc":
        return "Date: Oldest First";
      case "date-desc":
        return "Date: Newest First";
      case "name-asc":
        return "Name: A to Z";
      case "name-desc":
        return "Name: Z to A";
    }
  };

  const getFilterLabel = (option: FilterOption) => {
    switch (option) {
      case "all":
        return "All Properties";
      case "apartment":
        return "Apartments";
      case "house":
        return "Houses";
      case "condo":
        return "Condos";
      case "townhouse":
        return "Townhouses";
      case "loft":
        return "Lofts";
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-2">
            <button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </Button>
          <h1 className="text-2xl font-bold flex-1">Saved Properties</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Saved"
            value={savedProperties.length.toString()}
            icon={<Heart className="h-5 w-5" />}
            change={`${savedProperties.length} properties`}
            trend="neutral"
          />
          <StatCard
            title="Total Value"
            value={`$01,200,000 SAR`}
            icon={<DollarSign className="h-5 w-5" />}
            change="Combined property value"
            trend="up"
          />
          <StatCard
            title="Average Price"
            value={`$05,200,000 SAR`}
            icon={<BarChart3 className="h-5 w-5" />}
            change={`Range: $${lowestPrice.toLocaleString()} - $${highestPrice.toLocaleString()}`}
            trend="neutral"
          />
          <StatCard
            title="Property Types"
            value={Array.from(
              new Set(savedPropertyObjects.map((p) => p.propertyType))
            ).length.toString()}
            icon={<Home className="h-5 w-5" />}
            change="Different property categories"
            trend="neutral"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-emerald-800/30 bg-emerald-950/10"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {getFilterLabel(filterOption)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterOption("all")}>
                  All Properties
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterOption("apartment")}>
                  Apartments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterOption("house")}>
                  Houses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterOption("condo")}>
                  Condos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterOption("townhouse")}>
                  Townhouses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterOption("loft")}>
                  Lofts
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-emerald-800/30 bg-emerald-950/10"
                >
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  {getSortLabel(sortOption)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortOption("price-asc")}>
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("price-desc")}>
                  <ArrowDown className="h-4 w-4 mr-2" />
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("date-desc")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Date: Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("date-asc")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Date: Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("name-asc")}>
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Name: A to Z
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption("name-desc")}>
                  <ArrowDown className="h-4 w-4 mr-2" />
                  Name: Z to A
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex gap-2 ml-auto">
            <Button
              variant="outline"
              className={`border-emerald-800/30 ${
                viewMode === "grid" ? "bg-emerald-950/20" : "bg-emerald-950/10"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className={`border-emerald-800/30 ${
                viewMode === "list" ? "bg-emerald-950/20" : "bg-emerald-950/10"
              }`}
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Property Type Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge
            variant={filterOption === "all" ? "default" : "outline"}
            className={
              filterOption === "all"
                ? "bg-gradient-to-r from-emerald-500/80 to-green-500/80 hover:from-emerald-600/80 hover:to-green-600/80 cursor-pointer"
                : "bg-emerald-950/10 border-emerald-900/20 hover:bg-emerald-950/20 cursor-pointer"
            }
            onClick={() => setFilterOption("all")}
          >
            All
          </Badge>
          <Badge
            variant={filterOption === "apartment" ? "default" : "outline"}
            className={
              filterOption === "apartment"
                ? "bg-gradient-to-r from-emerald-500/80 to-green-500/80 hover:from-emerald-600/80 hover:to-green-600/80 cursor-pointer"
                : "bg-emerald-950/10 border-emerald-900/20 hover:bg-emerald-950/20 cursor-pointer"
            }
            onClick={() => setFilterOption("apartment")}
          >
            Apartments
          </Badge>
          <Badge
            variant={filterOption === "house" ? "default" : "outline"}
            className={
              filterOption === "house"
                ? "bg-gradient-to-r from-emerald-500/80 to-green-500/80 hover:from-emerald-600/80 hover:to-green-600/80 cursor-pointer"
                : "bg-emerald-950/10 border-emerald-900/20 hover:bg-emerald-950/20 cursor-pointer"
            }
            onClick={() => setFilterOption("house")}
          >
            Houses
          </Badge>
          <Badge
            variant={filterOption === "condo" ? "default" : "outline"}
            className={
              filterOption === "condo"
                ? "bg-gradient-to-r from-emerald-500/80 to-green-500/80 hover:from-emerald-600/80 hover:to-green-600/80 cursor-pointer"
                : "bg-emerald-950/10 border-emerald-900/20 hover:bg-emerald-950/20 cursor-pointer"
            }
            onClick={() => setFilterOption("condo")}
          >
            Condos
          </Badge>
          <Badge
            variant={filterOption === "townhouse" ? "default" : "outline"}
            className={
              filterOption === "townhouse"
                ? "bg-gradient-to-r from-emerald-500/80 to-green-500/80 hover:from-emerald-600/80 hover:to-green-600/80 cursor-pointer"
                : "bg-emerald-950/10 border-emerald-900/20 hover:bg-emerald-950/20 cursor-pointer"
            }
            onClick={() => setFilterOption("townhouse")}
          >
            Townhouses
          </Badge>
          <Badge
            variant={filterOption === "loft" ? "default" : "outline"}
            className={
              filterOption === "loft"
                ? "bg-gradient-to-r from-emerald-500/80 to-green-500/80 hover:from-emerald-600/80 hover:to-green-600/80 cursor-pointer"
                : "bg-emerald-950/10 border-emerald-900/20 hover:bg-emerald-950/20 cursor-pointer"
            }
            onClick={() => setFilterOption("loft")}
          >
            Lofts
          </Badge>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {sortedProperties.length}
            </span>{" "}
            of {savedProperties.length} saved properties
          </p>
        </div>

        {/* Properties */}
        {sortedProperties.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onOfferClick={() => openModal(property.id)}
                  isSaved={true}
                  onToggleSave={() => toggleSaveProperty(property.id)}
                  gradientClass="bg-emerald-50/10"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProperties.map((property) => (
                <PropertyListItem
                  key={property.id}
                  property={property}
                  isSaved={true}
                  onToggleSave={() => toggleSaveProperty(property.id)}
                  gradientClass="bg-emerald-50/10"
                />
              ))}
            </div>
          )
        ) : (
          <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-500/20 p-6 flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No saved properties</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              {savedProperties.length > 0
                ? "No properties match your current filter. Try changing your filter options."
                : "You haven't saved any properties yet. Browse listings and click the heart icon to save properties you like."}
            </p>
            <Button
              className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
              onClick={() => router.push("/user/dashboard/search")}
            >
              <Search className="mr-2 h-4 w-4" />
              Browse Properties
            </Button>
          </Card>
        )}
      </motion.div>

      <OfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyId={selectedProperty}
        properties={properties}
      />
    </div>
  );
}
