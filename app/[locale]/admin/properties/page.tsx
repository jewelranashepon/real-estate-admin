import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertiesTable } from "@/components/admin/properties-table";
import {
  getProperties,
  getPropertyStatuses,
  getPropertyTypes,
} from "@/lib/actions";
import { PropertyGrid } from "@/components/admin/property-grid";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { PlusCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { getSession } from "@/lib/getSession";

export default async function PropertiesPage() {
  const t = await getTranslations("dashboard");
  const [properties, propertyTypes, propertyStatuses] = await Promise.all([
    getProperties(),
    getPropertyTypes(),
    getPropertyStatuses(),
  ]);

  const session = await getSession();
  const userRole = session?.user?.role || null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t("properties")}</h1>
        {userRole === "admin" && (
          <Button asChild>
            <Link href="/admin/properties/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              {t("addProperty")}
            </Link>
          </Button>
        )}
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full max-w-[200px] grid-cols-2">
          <TabsTrigger value="grid">{t("grid")}</TabsTrigger>
          <TabsTrigger value="table">{t("table")}</TabsTrigger>
        </TabsList>
        <TabsContent value="grid" className="pt-4">
          <PropertyGrid properties={properties} />
        </TabsContent>
        <TabsContent value="table" className="pt-4">
          <PropertiesTable
            properties={properties}
            propertyTypes={propertyTypes}
            propertyStatuses={propertyStatuses}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
