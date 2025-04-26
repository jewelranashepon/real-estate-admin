"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/user/ui/button";
import { Card, CardContent, CardFooter } from "@/components/user/ui/card";
import { Badge } from "@/components/user/ui/badge";
import type { Property } from "@/components/user/data/properties";
import { useTranslations } from "next-intl";

interface PropertyCardProps {
  property: Property;
  onOfferClick: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  gradientClass: string;
}

export function PropertyCard({
  property,
  onOfferClick,
  isSaved,
  onToggleSave,
  gradientClass,
}: PropertyCardProps) {
  const t = useTranslations("PropertyCard");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card
        className={`overflow-hidden h-full ${gradientClass} backdrop-blur-md border border-emerald-500/20 shadow-lg shadow-emerald-900/5`}
      >
        <div className="relative aspect-[4/3]">
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
                {t("verified")}
              </span>
            </Badge>
          )}
          {property.isFeatured && (
            <Badge className="absolute bottom-2 left-2 bg-gradient-to-r from-amber-500/80 to-yellow-500/80 backdrop-blur-sm border-0">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                {t("featured")}
              </span>
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p className="text-sm text-muted-foreground">
              {property.address}, {property.city}, {property.state}
            </p>
          </div>
          <p className="text-lg font-bold text-emerald-400">
            {property.formattedPrice}{" "}
            <span
              style={{ fontFamily: "saudi_riyal" }}
              className="icon-saudi_riyal"
            ></span>
            /mo
          </p>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center p-2 rounded-md bg-emerald-950/20 border border-emerald-900/10">
              <p className="text-sm font-medium">{property.beds}</p>
              <p className="text-xs text-muted-foreground">{t("beds")}</p>
            </div>
            <div className="text-center p-2 rounded-md bg-emerald-950/20 border border-emerald-900/10">
              <p className="text-sm font-medium">{property.baths}</p>
              <p className="text-xs text-muted-foreground">{t("baths")}</p>
            </div>
            <div className="text-center p-2 rounded-md bg-emerald-950/20 border border-emerald-900/10">
              <p className="text-sm font-medium">{property.sqft}</p>
              <p className="text-xs text-muted-foreground">{t("sqft")}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button
            variant="outline"
            className="flex-1 border-emerald-900/20 bg-emerald-950/10 hover:bg-emerald-950/20"
            asChild
          >
            <Link href={`/user/dashboard/property/${property.id}`}>
              {t("viewDetails")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
            onClick={onOfferClick}
          >
            {t("priceButton")}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
