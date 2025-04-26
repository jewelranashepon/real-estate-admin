"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart,
  ArrowRight,
  CheckCircle,
  BedDouble,
  Bath,
  SquareIcon,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/user/ui/button";
import { Card, CardContent } from "@/components/user/ui/card";
import { Badge } from "@/components/user/ui/badge";
import type { Property } from "@/components/user/data/properties";
import { useTranslations } from "next-intl";

interface PropertyListItemProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: () => void;
  gradientClass: string;
}

export function PropertyListItem({
  property,
  isSaved,
  onToggleSave,
  gradientClass,
}: PropertyListItemProps) {
  const t = useTranslations("PropertyListItem");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card
        className={`overflow-hidden ${gradientClass} backdrop-blur-md border border-emerald-500/20 shadow-lg shadow-emerald-900/5`}
      >
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-72 h-54">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
              />
              <Button
                size="icon"
                variant="ghost"
                className={`absolute top-2 right-2 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 ${
                  isSaved ? "text-red-500" : "text-white"
                }`}
                onClick={onToggleSave}
              >
                <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
              </Button>
              {property.isVerified && (
                <Badge className="absolute top-2 left-2 bg-gradient-to-r from-emerald-500/80 to-green-500/80 backdrop-blur-sm border-0">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {t("verifiedBadge")}
                  </span>
                </Badge>
              )}
            </div>
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{property.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {property.address}, {property.city}, {property.state}
                  </p>
                </div>
                <p className="text-lg font-bold text-emerald-400">
                {property.formattedPrice} <span className="icon-saudi_riyal"></span>/mo
                </p>
              </div>

              <div className="flex flex-wrap gap-4 my-3">
                <div className="flex items-center">
                  <BedDouble className="h-4 w-4 text-emerald-400 mr-1" />
                  <span className="text-sm">
                    {property.beds} {t("features.beds")}
                  </span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 text-emerald-400 mr-1" />
                  <span className="text-sm">
                    {property.baths} {t("features.baths")}
                  </span>
                </div>
                <div className="flex items-center">
                  <SquareIcon className="h-4 w-4 text-emerald-400 mr-1" />
                  <span className="text-sm">
                    {property.sqft} {t("features.sqft")}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-emerald-400 mr-1" />
                  <span className="text-sm">
                    {t("features.available")} {property.availableFrom}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {property.description}
              </p>

              <div className="flex flex-wrap justify-between gap-2 mb-4">
                <div>
                  {property.features.slice(0, 3).map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-emerald-950/10 border-emerald-900/20"
                    >
                      {feature.name}
                    </Badge>
                  ))}
                  {property.features.length > 3 && (
                    <Badge
                      variant="outline"
                      className="bg-emerald-950/10 border-emerald-900/20"
                    >
                      +{property.features.length - 3} {t("moreFeatures")}
                    </Badge>
                  )}
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-900/20 bg-emerald-950/10 hover:bg-emerald-950/20"
                    asChild
                  >
                    <Link href={`/user/dashboard/property/${property.id}`}>
                      {t("viewDetails")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
                    asChild
                  >
                    <Link href={`/user/dashboard/property/${property.id}`}>
                      {t("makeOffer")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}