import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface PropertyWithRelations {
  id: number
  name: string
  price: number
  type: { id: number; value: string }
  status: { id: number; value: string }
  location?: {
    city: string
    state: string
  }
  images: { id: number; url: string }[]
}

interface RecentPropertiesProps {
  properties: PropertyWithRelations[]
}

export function RecentProperties({ properties }: RecentPropertiesProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-4">
      {properties.length === 0 ? (
        <p className="text-center text-muted-foreground">No properties found.</p>
      ) : (
        properties.map((property) => {
          const imageUrl = property.images.length > 0 ? property.images[0].url : "/placeholder.svg?height=40&width=40"

          return (
            <Link
              key={property.id}
              href={`/admin/properties/${property.id}`}
              className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50"
            >
              <Avatar className="h-10 w-10 rounded-md">
                <AvatarImage src={imageUrl} alt={property.name} />
                <AvatarFallback className="rounded-md">{property.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{property.name}</p>
                  <Badge
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
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(property.price)} •{" "}
                  {property.location ? `${property.location.city}, ${property.location.state}` : "Location N/A"}
                </p>
              </div>
            </Link>
          )
        })
      )}
    </div>
  )
}

