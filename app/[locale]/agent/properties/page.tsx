import type { Metadata } from "next"
import PropertyList from "@/components/agent/property-list"

export const metadata: Metadata = {
  title: "My Properties | Agent Portal",
  description: "View and manage your property listings",
}

export default function PropertiesPage() {
  return <PropertyList />
}
