"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Search, X, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/user/ui/dialog";
import { Button } from "@/components/user/ui/button";
import { Input } from "@/components/user/ui/input";
import { Label } from "@/components/user/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/user/ui/select";
import { Slider } from "@/components/user/ui/slider";
import { Checkbox } from "@/components/user/ui/checkbox";
import type { SearchFilters } from "@/components/user/data/properties";
import {
  propertyTypes,
  defaultSearchFilters,
} from "@/components/user/data/properties";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
}

export function SearchModal({
  isOpen,
  onClose,
  onSearch,
  initialFilters,
}: SearchModalProps) {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceLabel, setPriceLabel] = useState<string>("");

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters, isOpen]);

  useEffect(() => {
    setPriceLabel(`$${filters.priceRange[0]} - $${filters.priceRange[1]}`);
  }, [filters.priceRange]);

  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleBedsChange = (value: string) => {
    setFilters({
      ...filters,
      beds: value === "any" ? null : Number.parseInt(value),
    });
  };

  const handlePropertyTypeChange = (value: string) => {
    setFilters({
      ...filters,
      propertyType: value === "any" ? null : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFilters = {
      ...filters,
      searchTerm: searchTerm,
    };
    onSearch(updatedFilters);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-background/90 to-emerald-950/5 backdrop-blur-xl border border-emerald-900/20 shadow-lg shadow-emerald-900/5">
        <DialogHeader>
          <DialogTitle className="text-xl">Find Your Dream Home</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by location, property name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 text-lg bg-emerald-950/5 border-emerald-900/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="property-type">Property Type</Label>
              <Select
                value={
                  filters.propertyType === null ? "any" : filters.propertyType
                }
                onValueChange={handlePropertyTypeChange}
              >
                <SelectTrigger
                  id="property-type"
                  className="bg-emerald-950/5 border-emerald-900/20"
                >
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="beds">Bedrooms</Label>
              <Select
                value={filters.beds === null ? "any" : filters.beds.toString()}
                onValueChange={handleBedsChange}
              >
                <SelectTrigger
                  id="beds"
                  className="bg-emerald-950/5 border-emerald-900/20"
                >
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="price-range">Price Range</Label>
              <span className="text-sm text-muted-foreground">
                {priceLabel}
              </span>
            </div>
            <Slider
              id="price-range"
              min={0}
              max={10000}
              step={100}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={handlePriceChange}
              className="[&_[role=slider]]:bg-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <Label>Popular Features</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-parking"
                  checked={filters.features.includes("parking")}
                  onCheckedChange={(checked) => {
                    setFilters({
                      ...filters,
                      features: checked
                        ? [...filters.features, "parking"]
                        : filters.features.filter((f) => f !== "parking"),
                    });
                  }}
                  className="border-emerald-800/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                />
                <label
                  htmlFor="feature-parking"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Parking
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feature-balcony"
                  checked={filters.features.includes("balcony")}
                  onCheckedChange={(checked) => {
                    setFilters({
                      ...filters,
                      features: checked
                        ? [...filters.features, "balcony"]
                        : filters.features.filter((f) => f !== "balcony"),
                    });
                  }}
                  className="border-emerald-800/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                />
                <label
                  htmlFor="feature-balcony"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Balcony
                </label>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFilters(defaultSearchFilters);
                setSearchTerm("");
              }}
              className="border-emerald-800/30 bg-emerald-950/10"
            >
              <X className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
