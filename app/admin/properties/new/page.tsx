// import type { Metadata } from "next"
// import { PropertyForm } from "@/components/admin/property-form"
// import { getPropertyStatuses, getPropertyTypes } from "@/lib/actions"

// export const metadata: Metadata = {
//   title: "Add Property | Real Estate Admin",
//   description: "Add a new property listing",
// }

// export default async function NewPropertyPage() {
//   const [propertyTypes, propertyStatuses] = await Promise.all([getPropertyTypes(), getPropertyStatuses()])

//   return (
//     <div className="flex flex-col gap-6">
//       <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
//       <PropertyForm propertyTypes={propertyTypes} propertyStatuses={propertyStatuses} />
//     </div>
//   )
// }










import type { Metadata } from "next"
import { PropertyForm } from "@/components/admin/property-form"
import { getPropertyStatuses, getPropertyTypes } from "@/lib/actions"
import { AddEnvironmentVariables } from "@/components/add-environment-variables"

export const metadata: Metadata = {
  title: "Add Property | Real Estate Admin",
  description: "Add a new property listing",
}

export default async function NewPropertyPage() {
  // Check if we have the required environment variables
  const [propertyTypes, propertyStatuses] = await Promise.all([getPropertyTypes(), getPropertyStatuses()])

  return (
    <>

      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
        <PropertyForm propertyTypes={propertyTypes} propertyStatuses={propertyStatuses} />
      </div>
    </>
  )
}

