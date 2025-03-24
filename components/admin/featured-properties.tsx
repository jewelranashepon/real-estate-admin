import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PropertyCard } from "./property-card"

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

interface FeaturedPropertiesProps {
  properties: PropertyWithRelations[]
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  // Only show up to 4 properties
  const displayProperties = properties.slice(0, 4)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Featured Properties</h2>
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/properties">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {displayProperties.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed">
          <div className="text-center">
            <h3 className="mt-2 text-sm font-medium">No properties found</h3>
            <p className="mt-1 text-xs text-muted-foreground">Get started by adding a new property</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  )
}

