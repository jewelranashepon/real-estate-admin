import { getPropertyById } from "@/lib/actions"
import { notFound } from "next/navigation"
import { Star, MapPin, Bed, Bath, Ruler, Car, Wifi, PhoneCall, UserCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PropertyPageProps {
  params: { id: string }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const id = parseInt(params.id, 10)
  if (isNaN(id)) notFound()

  const property = await getPropertyById(id)
  if (!property) notFound()

  const images = property.images || []

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Main Image */}
      <div className="rounded-xl overflow-hidden">
        <Image
          src={images[0]?.url || "/images/house6.jpg"}
          alt={property.name}
          width={1200}
          height={600}
          className="w-full h-[600px] object-cover"
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.slice(1).map((img, idx) => (
            <Image
              key={idx}
              src={img.url}
              alt={`Image ${idx + 1}`}
              width={100}
              height={70}
              className="w-24 h-16 object-cover rounded-md border"
            />
          ))}
        </div>
      )}

      {/* Title, Rating & Location */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold">{property.name}</h1>
          <div className="flex items-center text-muted-foreground text-sm gap-1">
            <MapPin className="w-4 h-4" />
            {property.location?.streetAddress}, {property.location?.city}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500 font-medium text-lg">5.0</span>
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-500" />
        </div>
      </div>

      {/* Pricing */}
      <div className="flex flex-wrap gap-6 text-sm border rounded-lg p-4 bg-muted/20">
        <div>
          <p className="font-semibold">1-day rental</p>
          <p>${property.price}/night</p>
        </div>
        <div>
          <p className="font-semibold">Week rental</p>
          <p>${Number(property.price) - 10}/night</p>
        </div>
        <div>
          <p className="font-semibold">Month rental</p>
          <p>${Number(property.price) - 20}/night</p>
        </div>
      </div>

      {/* Property Description */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Property details</h2>
        <p className="text-sm text-muted-foreground">{property.description}</p>

        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Expansive oceanfront terrace for outdoor entertaining</li>
          <li>Gourmet kitchen with top-of-the-line appliances</li>
          <li>Private beach access & sunset views</li>
          <li>Master suite with spa bathroom and ocean-facing balcony</li>
        </ul>
      </div>

      {/* Amenities */}
      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mt-4">
        <div className="flex items-center gap-2">
          <Bed className="w-5 h-5" />
          {property.feature?.bedrooms} Bedrooms
        </div>
        <div className="flex items-center gap-2">
          <Bath className="w-5 h-5" />
          {property.feature?.bathrooms} Bathrooms
        </div>
        <div className="flex items-center gap-2">
          <Ruler className="w-5 h-5" />
          {property.feature?.area} sq ft
        </div>
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5" />
          {property.feature?.parkingSpots} Garage
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5" />
          Free Wi-Fi
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex items-center justify-between border rounded-xl p-4 shadow-sm bg-muted/50">
        <div className="flex items-center gap-3">
          <UserCircle2 className="w-10 h-10 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">{property.contact?.name}</p>
            <p className="text-xs text-muted-foreground">48 Reviews</p>
          </div>
        </div>
        <Button variant="default" className="flex items-center gap-2">
          <PhoneCall className="w-4 h-4" />
          Contact
        </Button>
      </div>
    </div>
  )
}
