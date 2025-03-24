// import type { Metadata } from "next"
// import { PropertyForm } from "@/components/admin/property-form"
// import { getPropertyById, getPropertyStatuses, getPropertyTypes } from "@/lib/actions"
// import { notFound } from "next/navigation"

// export const metadata: Metadata = {
//   title: "Edit Property | Real Estate Admin",
//   description: "Edit property details",
// }

// interface EditPropertyPageProps {
//   params: {
//     id: string
//   }
// }

// export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
//   const id = Number.parseInt(params.id)
//   if (isNaN(id)) {
//     notFound()
//   }

//   const [property, propertyTypes, propertyStatuses] = await Promise.all([
//     getPropertyById(id),
//     getPropertyTypes(),
//     getPropertyStatuses(),
//   ])

//   if (!property) {
//     notFound()
//   }

//   return (
//     <div className="flex flex-col gap-6">
//       <h1 className="text-3xl font-bold tracking-tight">Edit Property</h1>
//       <PropertyForm property={property} propertyTypes={propertyTypes} propertyStatuses={propertyStatuses} />
//     </div>
//   )
// }










import type { Metadata } from "next"
import { PropertyForm } from "@/components/admin/property-form"
import { getPropertyById, getPropertyStatuses, getPropertyTypes } from "@/lib/actions"
import { notFound } from "next/navigation"
import { AddEnvironmentVariables } from "@/components/add-environment-variables"

export const metadata: Metadata = {
  title: "Edit Property | Real Estate Admin",
  description: "Edit property details",
}

interface EditPropertyPageProps {
  params: {
    id: string
  }
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const id = Number.parseInt(params.id)
  if (isNaN(id)) {
    notFound()
  }

  // Check if we have the required environment variables
  const hasSupabaseEnvVars = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const [property, propertyTypes, propertyStatuses] = await Promise.all([
    getPropertyById(id),
    getPropertyTypes(),
    getPropertyStatuses(),
  ])

  if (!property) {
    notFound()
  }

  return (
    <>
      {!hasSupabaseEnvVars && (
        <AddEnvironmentVariables names={["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]} />
      )}

      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Edit Property</h1>
        <PropertyForm property={property} propertyTypes={propertyTypes} propertyStatuses={propertyStatuses} />
      </div>
    </>
  )
}

