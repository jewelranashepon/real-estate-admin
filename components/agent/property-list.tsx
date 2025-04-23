"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, Trash2, Eye } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function PropertyList() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [filter, setFilter] = useState<
    "all" | "sold" | "approved" | "pending" | "rejected"
  >("all");

  const { locale } = useParams();
  const tCommon = useTranslations("common");
  const t = useTranslations("propertiesdata");
  const isRtl = locale === "ar";

  const getLocalizedProperties = () => {
    return [
      {
        id: 1,
        title: t("allProperties.luxury_villa"),
        price: t("allProperties.price1"),
        type: t("allProperties.villa_type"),
        district: t("allProperties.al_olaya"),
        status: "approved",
        createdAt: "2023-10-15",
        thumbnail: "/sa1.jpg",
      },
      {
        id: 2,
        title: t("allProperties.modern_apartment"),
        price: t("allProperties.price2"),
        type: t("allProperties.apartment_type"),
        district: t("allProperties.al_malaz"),
        status: "pending",
        createdAt: "2023-11-02",
        thumbnail: "/sa2.jpg",
      },
      {
        id: 3,
        title: t("allProperties.commercial_land"),
        price: t("allProperties.price3"),
        type: t("allProperties.land_type"),
        district: t("allProperties.al_naseem"),
        status: "rejected",
        createdAt: "2023-11-10",
        thumbnail: "/sa3.webp",
      },
      {
        id: 4,
        title: t("allProperties.office_space"),
        price: t("allProperties.price4"),
        type: t("allProperties.office_type"),
        district: t("allProperties.qurtubah"),
        status: "approved",
        createdAt: "2023-09-28",
        thumbnail: "/sa4.jpeg",
      },
      {
        id: 5,
        title: t("allProperties.retail_shop"),
        price: t("allProperties.price5"),
        type: t("allProperties.retail_type"),
        district: t("allProperties.al_wurud"),
        status: "pending",
        createdAt: "2023-10-30",
        thumbnail: "/sa5.jpg",
      },
      {
        id: 6,
        title: t("allProperties.spacious_villa"),
        price: t("allProperties.price6"),
        type: t("allProperties.villa_type"),
        district: t("allProperties.hittin"),
        status: "approved",
        createdAt: "2023-09-15",
        thumbnail: "/pj6.jpg",
      },
      {
        id: 7,
        title: t("allProperties.commercial_land"),
        price: t("allProperties.price3"),
        type: t("allProperties.land_type"),
        district: t("allProperties.al_naseem"),
        status: "sold",
        createdAt: "2023-11-10",
        thumbnail: "/sa3.webp",
      },
    ];
  };

  const allproperties = getLocalizedProperties();

  const filteredProperties =
    filter === "all"
      ? allproperties
      : allproperties.filter((p) => p.status === filter);

  const toastAction = (action: string, id: number) =>
    toast({ title: `${action} Property`, description: `Property ID: ${id}` });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sold":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">{t("sold")}</Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            {t("approved")}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            {t("pending")}
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">{t("rejected")}</Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {tCommon("myProperties")}
          </h2>
          <p className="text-muted-foreground">{t("manageListings")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={filter} onValueChange={setFilter} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("all")}
              </TabsTrigger>
              <TabsTrigger
                value="sold"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("sold")}
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("approved")}
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("pending")}
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("rejected")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </Button>
            <Button
              variant={view === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("table")}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <Card key={property.id}>
              <div className="relative h-48">
                <img
                  src={property.thumbnail || "/placeholder.svg"}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(property.status)}
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                <CardDescription>
                  {property.type} {property.district}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg">
                    {property.price.toLocaleString()} {t("allProperties.sar")}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => toastAction("View", property.id)}
                    >
                      <Eye className="h-4 w-4 text-green-600" />
                    </Button>
                    {property.status !== "approved" && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toastAction("Edit", property.id)}
                        >
                          <Edit className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toastAction("Delete", property.id)}
                        >
                          <Trash2 className="h-4 w-4 text-green-600" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="h-12 px-4 text-left">{t("title")}</th>
                <th className="h-12 px-4 text-left">{t("type")}</th>
                <th className="h-12 px-4 text-left">{t("district")}</th>
                <th className="h-12 px-4 text-left">{t("price")}</th>
                <th className="h-12 px-4 text-left">{t("status")}</th>
                <th className="h-12 px-4 text-left">{t("dateAdded")}</th>
                <th className="h-12 px-4 text-left">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr key={property.id} className="border-b">
                  <td className="p-4">{property.title}</td>
                  <td className="p-4">{property.type}</td>
                  <td className="p-4">{property.district}</td>
                  <td className="p-4">{property.price.toLocaleString()}</td>
                  <td className="p-4">{getStatusBadge(property.status)}</td>
                  <td className="p-4">{property.createdAt}</td>
                  <td className="p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => toastAction("View", property.id)}
                        >
                          <Eye className="mr-2 h-4 w-4" /> {t("view")}
                        </DropdownMenuItem>
                        {property.status !== "approved" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => toastAction("Edit", property.id)}
                            >
                              <Edit className="mr-2 h-4 w-4" /> {t("edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toastAction("Delete", property.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> {t("delete")}
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
