"use client";

import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Filter,
  Search,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/user/ui/button";
import { Card } from "@/components/user/ui/card";
import { Input } from "@/components/user/ui/input";
import { PropertyCard } from "@/components/user/property-card";
import { PropertyListItem } from "@/components/user/property-list-item";
import { SearchFiltersPanel } from "@/components/user/search-filters-panel";
import {
  properties,
  type Property,
  type SearchFilters,
  defaultSearchFilters,
} from "@/components/user/data/properties";
import { useTranslations } from "next-intl";

export default function SearchPage() {
  const t = useTranslations("SearchPage");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(defaultSearchFilters);
  const [filteredProperties, setFilteredProperties] =
    useState<Property[]>(properties);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [savedProperties, setSavedProperties] = useState<string[]>([
    "1",
    "3",
    "5",
  ]);

  useEffect(() => {
    // Apply filters
    const results = properties.filter((property) => {
      // Search term filter
      if (
        searchTerm &&
        !property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !property.address.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !property.city.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Price range filter
      if (
        property.price < filters.priceRange[0] ||
        property.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Beds filter
      if (filters.beds !== null && property.beds < filters.beds) {
        return false;
      }

      // Baths filter
      if (filters.baths !== null && property.baths < filters.baths) {
        return false;
      }

      // Property type filter
      if (
        filters.propertyType !== null &&
        property.propertyType !== filters.propertyType
      ) {
        return false;
      }

      // Square footage filter
      if (
        property.sqft < filters.sqftRange[0] ||
        property.sqft > filters.sqftRange[1]
      ) {
        return false;
      }

      // Features filter
      if (filters.features.length > 0) {
        const propertyFeatureNames = property.features.map((f) =>
          f.name.toLowerCase()
        );
        const hasAllFeatures = filters.features.every((feature) =>
          propertyFeatureNames.includes(feature.toLowerCase())
        );
        if (!hasAllFeatures) {
          return false;
        }
      }

      return true;
    });

    setFilteredProperties(results);
  }, [searchTerm, filters]);

  const toggleSaveProperty = (propertyId: string) => {
    setSavedProperties((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
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
              {t("back")}
            </button>
          </Button>
          <h1 className="text-2xl font-bold flex-1">{t("title")}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Panel - Desktop */}
          <div className="hidden lg:block w-64 shrink-0">
            <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-900/20 sticky top-6">
              <SearchFiltersPanel
                filters={filters}
                setFilters={setFilters}
                className="p-4"
              />
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-emerald-50/10 border-emerald-900/20"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="lg:hidden border-emerald-800/30 bg-emerald-950/10"
                  onClick={() => setIsFilterPanelOpen(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {t("filters")}
                </Button>
                <Button
                  variant="outline"
                  className={`border-emerald-800/30 ${
                    viewMode === "grid"
                      ? "bg-emerald-950/20"
                      : "bg-emerald-950/10"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className={`border-emerald-800/30 ${
                    viewMode === "list"
                      ? "bg-emerald-950/20"
                      : "bg-emerald-950/10"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {t("resultsCount", { count: filteredProperties.length })}
              </p>
            </div>

            {/* Property Results */}
            {filteredProperties.length > 0 ? (
              viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProperties.map((property, index) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onOfferClick={() => {}}
                      isSaved={savedProperties.includes(property.id)}
                      onToggleSave={() => toggleSaveProperty(property.id)}
                      gradientClass="bg-emerald-50/10"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProperties.map((property, index) => (
                    <PropertyListItem
                      key={property.id}
                      property={property}
                      isSaved={savedProperties.includes(property.id)}
                      onToggleSave={() => toggleSaveProperty(property.id)}
                      gradientClass="bg-emerald-50/10"
                    />
                  ))}
                </div>
              )
            ) : (
              <Card className="bg-emerald-50/10 backdrop-blur-md border border-emerald-900/20 p-6 flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("noResults.title")}
                </h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  {t("noResults.description")}
                </p>
                <Button
                  className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
                  onClick={() => setFilters(defaultSearchFilters)}
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  {t("resetFilters")}
                </Button>
              </Card>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Filters Panel */}
      {isFilterPanelOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-gradient-to-br from-background/95 to-emerald-950/5 backdrop-blur-xl border-l border-emerald-900/20 shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{t("filters")}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterPanelOpen(false)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
            <SearchFiltersPanel
              filters={filters}
              setFilters={setFilters}
              onClose={() => setIsFilterPanelOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}