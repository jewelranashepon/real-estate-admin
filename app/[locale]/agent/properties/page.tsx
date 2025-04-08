import { DashboardHeader } from "@/components/agent/dashboard/header";
import { PropertyFilters } from "@/components/agent/properties/property-filters";
import { PropertyTable } from "@/components/agent/properties/property-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties - Real Estate Agent Portal",
  description: "Manage your property listings",
};

export default function PropertiesPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        heading="Properties"
        text="Manage your property listings"
      />
      <div className="container py-6">
        <PropertyFilters />
        <PropertyTable />
      </div>
    </div>
  );
}
