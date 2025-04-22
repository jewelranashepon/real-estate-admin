import type { Metadata } from "next"
import PropertyMap from "@/components/agent/property-map"

export const metadata: Metadata = {
  title: "Property Map | Agent Portal",
  description: "View your properties on a map",
}

export default function MapPage() {
  return <PropertyMap />
}
