"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/user/ui/button";
import { Label } from "@/components/user/ui/label";
import { Slider } from "@/components/user/ui/slider";
import { Checkbox } from "@/components/user/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/user/ui/select";
import {
  type SearchFilters,
  defaultSearchFilters,
  propertyTypes,
  featureOptions,
} from "@/components/user/data/properties";
import { useTranslations } from "next-intl";

interface SearchFiltersPanelProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  onClose?: () => void;
  className?: string;
}

export function SearchFiltersPanel({
  filters,
  setFilters,
  onClose,
  className = "",
}: SearchFiltersPanelProps) {
  const t = useTranslations("SearchFilters");
  const [priceLabel, setPriceLabel] = useState<string>("");
  const [sqftLabel, setSqftLabel] = useState<string>("");

  useEffect(() => {
    setPriceLabel(
      t("priceLabel", {
        min: filters.priceRange[0],
        max: filters.priceRange[1],
      })
    );
    setSqftLabel(
      t("sqftLabel", {
        min: filters.sqftRange[0],
        max: filters.sqftRange[1],
      })
    );
  }, [filters.priceRange, filters.sqftRange, t]);

  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleSqftChange = (value: number[]) => {
    setFilters({
      ...filters,
      sqftRange: [value[0], value[1]],
    });
  };

  const handleBedsChange = (value: string) => {
    setFilters({
      ...filters,
      beds: value === "any" ? null : Number.parseInt(value),
    });
  };

  const handleBathsChange = (value: string) => {
    setFilters({
      ...filters,
      baths: value === "any" ? null : Number.parseInt(value),
    });
  };

  const handlePropertyTypeChange = (value: string) => {
    setFilters({
      ...filters,
      propertyType: value === "any" ? null : value,
    });
  };

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    setFilters({
      ...filters,
      features: checked
        ? [...filters.features, feature]
        : filters.features.filter((f) => f !== feature),
    });
  };

  const handleReset = () => {
    setFilters(defaultSearchFilters);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{t("title")}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="border-emerald-800/30 bg-emerald-950/10 text-xs"
        >
          <X className="h-3 w-3 mr-1" />
          {t("resetButton")}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="price-range">{t("priceRange")}</Label>
            <span className="text-sm text-muted-foreground">{priceLabel}</span>
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
          <Label htmlFor="beds">{t("bedrooms")}</Label>
          <Select
            value={filters.beds === null ? "any" : filters.beds.toString()}
            onValueChange={handleBedsChange}
          >
            <SelectTrigger id="beds" className="bg-background/50">
              <SelectValue placeholder={t("any")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t("any")}</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="baths">{t("bathrooms")}</Label>
          <Select
            value={filters.baths === null ? "any" : filters.baths.toString()}
            onValueChange={handleBathsChange}
          >
            <SelectTrigger id="baths" className="bg-background/50">
              <SelectValue placeholder={t("any")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t("any")}</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="property-type">{t("propertyType")}</Label>
          <Select
            value={filters.propertyType === null ? "any" : filters.propertyType}
            onValueChange={handlePropertyTypeChange}
          >
            <SelectTrigger id="property-type" className="bg-background/50">
              <SelectValue placeholder={t("any")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">{t("any")}</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  propertyTypes.${type.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="sqft-range">{t("squareFootage")}</Label>
            <span className="text-sm text-muted-foreground">{sqftLabel}</span>
          </div>
          <Slider
            id="sqft-range"
            min={0}
            max={5000}
            step={100}
            value={[filters.sqftRange[0], filters.sqftRange[1]]}
            onValueChange={handleSqftChange}
            className="[&_[role=slider]]:bg-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <Label>{t("feature")}</Label>
          <div className="grid grid-cols-1 gap-2">
            {featureOptions.map((feature) => (
              <div key={feature.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${feature.value}`}
                  checked={filters.features.includes(feature.value)}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle(feature.value, checked as boolean)
                  }
                  className="border-emerald-800/30 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                />
                <label
                  htmlFor={`feature-${feature.value}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t(`features.${feature.value}`)}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {onClose && (
        <div className="pt-4">
          <Button
            className="w-full bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
            onClick={onClose}
          >
            {t("applyButton")}
          </Button>
        </div>
      )}
    </div>
  );
}