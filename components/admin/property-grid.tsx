"use client"

import { useState } from "react"
import { PropertyCard } from "./property-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteProperty } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

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

interface PropertyGridProps {
  properties: PropertyWithRelations[]
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null)

  // Filter properties based on search query
  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.type.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (property.location?.city && property.location.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (property.location?.state && property.location.state.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleDeleteClick = (id: number) => {
    setPropertyToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteProperty = async () => {
    if (!propertyToDelete) return

    try {
      const result = await deleteProperty(propertyToDelete)

      if (result.success) {
        toast({
          title: "Property deleted",
          description: "The property has been successfully deleted.",
        })
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete property. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setPropertyToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
          <div className="text-center">
            <h3 className="mt-2 text-lg font-semibold">No properties found</h3>
            <p className="mb-4 mt-1 text-sm text-muted-foreground">
              {searchQuery ? "Try a different search term" : "Get started by adding a new property"}
            </p>
            {!searchQuery && (
              <Button asChild>
                <Link href="/admin/properties/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Property
                </Link>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} onDelete={handleDeleteClick} />
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the property and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProperty} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

