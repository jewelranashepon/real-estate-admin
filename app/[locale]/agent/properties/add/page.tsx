import type { Metadata } from "next"
import PropertyForm from "@/components/agent/property-form"

export const metadata: Metadata = {
  title: "Add Property | Agent Portal",
  description: "Add a new property listing",
}

export default function AddPropertyPage() {
  return <PropertyForm />
}
