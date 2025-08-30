"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Heart,
  BedDouble,
  Bath,
  SquareIcon as SquareFoot,
  MapPin,
  Calendar,
  Wifi,
  ParkingMeterIcon as Parking,
  Utensils,
  Wind,
  CheckCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/user/ui/button";
import { Card, CardContent } from "@/components/user/ui/card";
import { Badge } from "@/components/user/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/user/ui/carousel";
import { OfferModal } from "@/components/user/offer-modal";
import { properties } from "@/components/user/data/properties";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

type TransObj = { en?: string; ar?: string } | string | undefined;

export default function PropertyDetail() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const router = useRouter();
  const t = useTranslations("PropertyDetail");
  const locale = useLocale();
  const isRTL = locale?.startsWith("ar");

  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [property, setProperty] = useState(
    properties.find((p) => String(p.id) === String(id))
  );

  useEffect(() => {
    setProperty(properties.find((p) => String(p.id) === String(id)));
  }, [id]);

  const numberFmt = useMemo(
    () =>
      new Intl.NumberFormat(locale || "en", {
        maximumFractionDigits: 0,
      }),
    [locale]
  );

  const dateFmt = useMemo(
    () =>
      new Intl.DateTimeFormat(locale || "en", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    [locale]
  );

  const getLocalized = (val: TransObj, fallback = ""): string => {
    if (!val) return fallback;
    if (typeof val === "string") return val;
    // object-ish
    const en = (val as any).en;
    const ar = (val as any).ar;
    if (isRTL) return ar ?? en ?? fallback;
    return en ?? ar ?? fallback;
  };

  const localizedTitle = getLocalized(property?.title, "");
  const localizedAddress = getLocalized(property?.address, property?.address as any);
  const localizedCity = getLocalized(property?.city as any, property?.city as any);
  const localizedState = getLocalized(property?.state as any, property?.state as any);

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
    toast[!isSaved ? "success" : "info"](
      !isSaved ? t("toast.saved") : t("toast.removed")
    );
  };

  if (!property) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("notFound.title")}</h1>
        <p className="text-muted-foreground mb-8">{t("notFound.text")}</p>
        <Button asChild>
          <Link href="/user/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("notFound.back")}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6" dir={isRTL ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            className={isRTL ? "ml-2" : "mr-2"}
            onClick={() => router.back()}
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
            <span>{t("back")}</span>
          </Button>
          <h1 className="text-2xl font-bold flex-1">{localizedTitle}</h1>
          <Button
            size="icon"
            variant="outline"
            className={`rounded-full ${
              isSaved
                ? "text-red-500 border-red-500"
                : "border-emerald-900/20 bg-emerald-950/10"
            }`}
            onClick={toggleSave}
            aria-label={t("aria.save")}
          >
            <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>

        {/* Gallery */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {(property.images ?? []).map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                    <Image
                      src={image || "/placeholder.svg?height=600&width=800"}
                      alt={`${localizedTitle} - ${t("image")} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className={isRTL ? "right-4" : "left-4"} />
            <CarouselNext className={isRTL ? "left-4" : "right-4"} />
          </Carousel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gradient-to-br from-background/70 to-emerald-950/10 backdrop-blur-md border border-emerald-900/20 shadow-lg shadow-emerald-900/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
                      {property.formattedPrice
                        ? property.formattedPrice
                        : numberFmt.format(property.price ?? 0)}{" "}
                      <span className="icon-jod" />
                      <span className="text-base text-emerald-300">
                        {t("perMonth")}
                      </span>
                    </h2>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                      {[
                        localizedAddress,
                        localizedCity,
                        localizedState,
                      ]
                        .filter(Boolean)
                        .join(isRTL ? "، " : ", ")}
                    </p>
                  </div>
                  {property.isVerified && (
                    <Badge className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 backdrop-blur-sm border-0">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {t("verified")}
                      </span>
                    </Badge>
                  )}
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/10">
                    <BedDouble className="h-5 w-5 text-emerald-400 mb-1" />
                    <span className="text-sm font-medium">
                      {numberFmt.format(property.beds)} {t("stats.beds")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/10">
                    <Bath className="h-5 w-5 text-emerald-400 mb-1" />
                    <span className="text-sm font-medium">
                      {numberFmt.format(property.baths)} {t("stats.baths")}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/10">
                    <SquareFoot className="h-5 w-5 text-emerald-400 mb-1" />
                    <span className="text-sm font-medium">
                      {numberFmt.format(property.sqft)} {t("stats.sqft")}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{t("description")}</h3>
                  <p className="text-muted-foreground">
                    {getLocalized(property.description as any, property.description as any)}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t("features.title")}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(property.features ?? []).map(
                      (feature: { icon?: string; name?: string }, index: number) => {
                        const icon = feature.icon;
                        const label =
                          icon && t.has(`features.${icon}`)
                            ? t(`features.${icon}`)
                            : feature.name || "";

                        return (
                          <div key={index} className="flex items-center">
                            {icon === "balcony" && (
                              <Utensils className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} text-emerald-400`} />
                            )}
                            {icon === "parking" && (
                              <Parking className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} text-emerald-400`} />
                            )}
                            {icon === "wifi" && (
                              <Wifi className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} text-emerald-400`} />
                            )}
                            {icon === "kitchen" && (
                              <Utensils className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} text-emerald-400`} />
                            )}
                            {icon === "ac" && (
                              <Wind className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"} text-emerald-400`} />
                            )}
                            <span className="text-sm">{label}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Agent */}
            <Card className="bg-gradient-to-br from-background/70 to-emerald-950/10 backdrop-blur-md border border-emerald-900/20 shadow-lg shadow-emerald-900/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t("contact.title")}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={property.agent?.image || "/placeholder.svg?height=96&width=96"}
                      alt={property.agent?.name || "Agent"}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 rounded-full border-2 border-background"></div>
                  </div>
                  <div>
                    <p className="font-medium">{property.agent?.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className={`flex items-center ${isRTL ? "ml-2" : "mr-2"}`}>
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                        <span>{property.agent?.rating}</span>
                      </div>
                      <span>
                        ({numberFmt.format(property.agent?.reviewCount ?? 0)} {t("contact.reviews")})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-6 text-sm">
                  <p className="flex items-center">
                    <span className={`text-muted-foreground ${isRTL ? "ml-2" : "mr-2"}`}>{t("contact.phone")}:</span>
                    {property.agent?.phone}
                  </p>
                  <p className="flex items-center">
                    <span className={`text-muted-foreground ${isRTL ? "ml-2" : "mr-2"}`}>{t("contact.email")}:</span>
                    {property.agent?.email}
                  </p>
                  <p className="flex items-center">
                    <span className={`text-muted-foreground ${isRTL ? "ml-2" : "mr-2"}`}>{t("contact.experience")}:</span>
                    {numberFmt.format(property.agent?.experience ?? 0)} {t("contact.years")}
                  </p>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  {t("actions.makeOffer")}
                </Button>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="bg-gradient-to-br from-background/70 to-emerald-950/10 backdrop-blur-md border border-emerald-900/20 shadow-lg shadow-emerald-900/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t("availability.title")}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-emerald-400" />
                  <span>
                    {t("availability.availableFrom")}{" "}
                    {property.availableFrom
                      ? dateFmt.format(new Date(property.availableFrom))
                      : "—"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="bg-gradient-to-br from-background/70 to-emerald-950/10 backdrop-blur-md border border-emerald-900/20 shadow-lg shadow-emerald-900/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t("details.title")}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("details.propertyType")}</span>
                    <span className="capitalize">
                      {getLocalized(property.propertyType as any, property.propertyType as any)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("details.yearBuilt")}</span>
                    <span>{numberFmt.format(property.yearBuilt ?? 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("details.listed")}</span>
                    <span>{dateFmt.format(new Date(property.createdAt))}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>

      <OfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyId={String(property.id)}
        properties={[property]}
      />
    </div>
  );
}
