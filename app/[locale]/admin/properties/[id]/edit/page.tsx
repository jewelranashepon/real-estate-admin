import type { Metadata } from "next";
import { PropertyForm } from "@/components/admin/property-form";
import {
  getPropertyById,
  getPropertyStatuses,
  getPropertyTypes,
} from "@/lib/actions";
import { notFound } from "next/navigation";
import { AddEnvironmentVariables } from "@/components/add-environment-variables";

export const metadata: Metadata = {
  title: "Edit Property | Real Estate Admin",
  description: "Edit property details",
};

interface EditPropertyPageProps {
  params: {
    id: string;
  };
}

export default async function EditPropertyPage(props: {
  params: { id: string; locale: string };
}) {
  const id = Number.parseInt(props.params.id);
  if (isNaN(id)) {
    notFound();
  }

  const [property, propertyTypes, propertyStatuses] = await Promise.all([
    getPropertyById(id),
    getPropertyTypes(),
    getPropertyStatuses(),
  ]);

  if (!property) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">تعديل العقار</h1>
        <PropertyForm
          property={property}
          propertyTypes={propertyTypes}
          propertyStatuses={propertyStatuses}
        />
      </div>
    </>
  );
}
