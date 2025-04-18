"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface PropertyWithRelations {
  id: number
  name: string
  description: string
  price: number
  type: { id: number; value: string }
  status: { id: number; value: string }
  feature?: {
    bedrooms: number
    bathrooms: number
    area: number
  }
  location?: {
    city: string
    state: string
  }
  images: { id: number; url: string }[]
}

interface PropertyCardProps {
  property: PropertyWithRelations
  onDelete?: (id: number) => void
}

export function PropertyCard({ property, onDelete }: PropertyCardProps) {
  const [imageDialogOpen, setImageDialogOpen] = useState(false)

  // Get the first image or use a placeholder
  const mainImage = property.images.length > 0 ? property.images[0].url : "/placeholder.svg?height=200&width=300"

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all shadow-lg hover:shadow-xl">
      {/* Property Image (clickable) */}
      <div className="relative aspect-video cursor-pointer overflow-hidden" onClick={() => setImageDialogOpen(true)}>
        <div className="absolute inset-0 bg-black/5 transition-opacity hover:bg-black/10 z-10" />
        <img
          src={mainImage || "/placeholder.svg"}
          alt={property.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=300"
          }}
        />
        <Badge
          className="absolute right-2 top-2 z-20"
          variant={
            property.status.value === "Published"
              ? "default"
              : property.status.value === "Draft"
                ? "outline"
                : property.status.value === "Sold"
                  ? "secondary"
                  : "destructive"
          }
        >
          {property.status.value}
        </Badge>
      </div>

      <CardContent className="flex-grow p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-emerald-600 text-white px-2 py-1">{property.type.value}</Badge>
            <span className="font-bold text-xl text-emerald-700">{formatCurrency(property.price)}</span>
          </div>

          <h3 className="font-semibold text-lg line-clamp-1">{property.name}</h3>

          <p className="text-sm text-slate-700 line-clamp-2">{property.description}</p>

          <div className="flex items-center text-sm text-slate-700">
            <span>{property.location ? `${property.location.city}, ${property.location.state}` : "Location N/A"}</span>
          </div>

          {property.feature && (
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="font-medium">{property.feature.bedrooms}</span>
                <span className="text-slate-700">Beds</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{property.feature.bathrooms}</span>
                <span className="text-slate-700">Baths</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{property.feature.area}</span>
                <span className="text-slate-700">Sq Ft</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1 text-emerald-700 font-semibold hover:text-emerald-800">
          <Link href={`/admin/properties/${property.id}`}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="flex-1 text-sky-700 font-semibold hover:text-sky-800">
          <Link href={`/admin/properties/${property.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
        {onDelete && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1 font-semibold text-destructive hover:text-destructive"
            onClick={() => onDelete(property.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        )}
      </CardFooter>

      {/* Image Gallery Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{property.name}</DialogTitle>
          </DialogHeader>

          {property.images.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image, index) => (
                  <CarouselItem key={image.id}>
                    <div className="p-1">
                      <div className="relative aspect-video overflow-hidden rounded-xl">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={`${property.name} - Image ${index + 1}`}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=600"
                          }}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
              <p className="text-muted-foreground">No images available</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

