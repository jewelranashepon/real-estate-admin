import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { PropertiesTable } from "@/components/admin/properties-table"
import { getProperties, getPropertyStatuses, getPropertyTypes } from "@/lib/actions"

export const metadata: Metadata = {
  title: "Properties | Real Estate Admin",
  description: "Manage real estate properties",
}

export default async function PropertiesPage() {
  const [properties, propertyTypes, propertyStatuses] = await Promise.all([
    getProperties(),
    getPropertyTypes(),
    getPropertyStatuses(),
  ])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
        <Button asChild>
          <Link href="/admin/properties/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      <PropertiesTable properties={properties} propertyTypes={propertyTypes} propertyStatuses={propertyStatuses} />
    </div>
  )
}

