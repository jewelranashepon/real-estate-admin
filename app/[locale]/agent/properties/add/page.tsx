import { DashboardHeader } from "@/components/agent/dashboard/header";
import { PropertyForm } from "@/components/agent/properties/property-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Property - Real Estate Agent Portal",
  description: "Add a new property listing",
};

export default function AddPropertyPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader
        heading="Add Property"
        text="Create a new property listing"
      />
      <div className="container py-6">
        <PropertyForm />
      </div>
    </div>
  );
}
