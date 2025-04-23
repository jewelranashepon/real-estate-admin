"use client";

import { useState, useEffect } from "react";
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

export default function PropertyDetail() {
  const params = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [property, setProperty] = useState(
    properties.find((p) => p.id === params.id)
  );
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would fetch the property data from an API
    setProperty(properties.find((p) => p.id === params.id));
  }, [params.id]);

  const toggleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success("Property saved to your favorites!");
    } else {
      toast.info("Property removed from your favorites");
    }
  };

  if (!property) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The property you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/user/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            className="mr-2"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back</span>
          </Button>
          <h1 className="text-2xl font-bold flex-1">{property.title}</h1>
          <Button
            size="icon"
            variant="outline"
            className={`rounded-full ${
              isSaved
                ? "text-red-500 border-red-500"
                : "border-emerald-900/20 bg-emerald-950/10"
            }`}
            onClick={toggleSave}
          >
            <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                    <Image
                      src={image || "/placeholder.svg?height=600&width=800"}
                      alt={`${property.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gradient-to-br from-background/70 to-emerald-950/10 backdrop-blur-md border border-emerald-900/20 shadow-lg shadow-emerald-900/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-emerald-400">
                      {property.formattedPrice}
                    </h2>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" /> {property.address},{" "}
                      {property.city}, {property.state}
                    </p>
                  </div>
                  {property.isVerified && (
                    <Badge className="bg-gradient-to-r from-emerald-500/80 to-green-500/80 backdrop-blur-sm border-0">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        FAL Verified
                      </span>
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/10">
                    <BedDouble className="h-5 w-5 text-emerald-400 mb-1" />
                    <span className="text-sm font-medium">
                      {property.beds} Beds
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/10">
                    <Bath className="h-5 w-5 text-emerald-400 mb-1" />
                    <span className="text-sm font-medium">
                      {property.baths} Baths
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/10">
                    <SquareFoot className="h-5 w-5 text-emerald-400 mb-1" />
                    <span className="text-sm font-medium">
                      {property.sqft} sqft
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {property.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        {feature.icon === "balcony" && (
                          <Utensils className="h-4 w-4 mr-2 text-emerald-400" />
                        )}
                        {feature.icon === "parking" && (
                          <Parking className="h-4 w-4 mr-2 text-emerald-400" />
                        )}
                        {feature.icon === "wifi" && (
                          <Wifi className="h-4 w-4 mr-2 text-emerald-400" />
                        )}
                        {feature.icon === "kitchen" && (
                          <Utensils className="h-4 w-4 mr-2 text-emerald-400" />
                        )}
                        {feature.icon === "ac" && (
                          <Wind className="h-4 w-4 mr-2 text-emerald-400" />
                        )}
                        <span className="text-sm">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-background/70 to-emerald-950/10 backdrop-blur-md border border-emerald-900/20 shadow-lg shadow-emerald-900/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={property.agent.image}
                      alt={property.agent.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 right-0 h-4 w-4 bg-emerald-500 rounded-full border-2 border-background"></div>
                  </div>
                  <div>
                    <p className="font-medium">{property.agent.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="flex items-center mr-2">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                        <span>{property.agent.rating}</span>
                      </div>
                      <span>({property.agent.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <p className="text-sm flex items-center">
                    <span className="text-muted-foreground mr-2">Phone:</span>
                    {property.agent.phone}
                  </p>
                  <p className="text-sm flex items-center">
                    <span className="text-muted-foreground mr-2">Email:</span>
                    {property.agent.email}
                  </p>
                  <p className="text-sm flex items-center">
                    <span className="text-muted-foreground mr-2">
                      Experience:
                    </span>
                    {property.agent.experience} years
                  </p>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-emerald-500/80 to-green-500/80 text-white hover:from-emerald-600/80 hover:to-green-600/80 backdrop-blur-sm"
                  onClick={() => setIsModalOpen(true)}
                >
                  Make an Offer
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background/70 to-emerald-950/10 backdrop-blur-md border border-emerald-900/20 shadow-lg shadow-emerald-900/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Availability</h3>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-emerald-400" />
                  <span>Available from {property.availableFrom}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-background/70 to-emerald-950/10 backdrop-blur-md border border-emerald-900/20 shadow-lg shadow-emerald-900/5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="capitalize">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Year Built</span>
                    <span>{property.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Listed</span>
                    <span>
                      {new Date(property.createdAt).toLocaleDateString()}
                    </span>
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
        propertyId={property.id}
        properties={[property]}
      />
    </div>
  );
}
