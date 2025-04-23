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

// Mock property data
const properties = [
  {
    id: 1,
    title: "Luxury Villa in Al Olaya",
    price: 2500000,
    type: "Villa",
    district: "Al Olaya",
    status: "approved",
    createdAt: "2023-10-15",
    thumbnail: "/sa1.jpg",
  },
  {
    id: 2,
    title: "Modern Apartment in Al Malaz",
    price: 850000,
    type: "Apartment",
    district: "Al Malaz",
    status: "pending",
    createdAt: "2023-11-02",
    thumbnail: "/sa2.jpg",
  },
  {
    id: 3,
    title: "Commercial Land in Al Naseem",
    price: 4200000,
    type: "Land",
    district: "Al Naseem",
    status: "rejected",
    createdAt: "2023-11-10",
    thumbnail: "/sa3.webp",
  },
  {
    id: 4,
    title: "Office Space in Qurtubah",
    price: 1200000,
    type: "Office",
    district: "Qurtubah",
    status: "approved",
    createdAt: "2023-09-28",
    thumbnail: "/sa4.jpeg",
  },
  {
    id: 5,
    title: "Retail Shop in Al Wurud",
    price: 950000,
    type: "Retail",
    district: "Al Wurud",
    status: "pending",
    createdAt: "2023-10-30",
    thumbnail: "/sa5.jpg",
  },
  {
    id: 6,
    title: "Spacious Villa in Hittin",
    price: 3100000,
    type: "Villa",
    district: "Hittin",
    status: "approved",
    createdAt: "2023-09-15",
    thumbnail: "/pj6.jpg",
  },
];

export default function PropertyList() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [filter, setFilter] = useState<
    "all" | "approved" | "pending" | "rejected"
  >("all");
  const { locale } = useParams();
  const t = useTranslations();
  const isRtl = locale === "ar";

  const filteredProperties =
    filter === "all"
      ? properties
      : properties.filter((property) => property.status === filter);

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Property",
      description: `Editing property ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Property",
      description: `Property ID: ${id} has been deleted.`,
    });
  };

  const handleView = (id: number) => {
    toast({
      title: "View Property",
      description: `Viewing property ID: ${id}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            {t("properties.approved")}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            {t("properties.pending")}
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            {t("properties.rejected")}
          </Badge>
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
            {t("common.myProperties")}
          </h2>
          <p className="text-muted-foreground">
            {t("properties.manageListings")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs
            value={filter}
            onValueChange={(value: any) => setFilter(value)}
            className="w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("properties.all")}
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("properties.approved")}
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("properties.pending")}
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                {t("properties.rejected")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("grid")}
              className="h-8 w-8 data-[state=active]:bg-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </Button>
            <Button
              variant={view === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("table")}
              className="h-8 w-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M8 6h13" />
                <path d="M8 12h13" />
                <path d="M8 18h13" />
                <path d="M3 6h.01" />
                <path d="M3 12h.01" />
                <path d="M3 18h.01" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden">
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
                  {property.type} in {property.district}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-lg">
                    {property.price.toLocaleString()} SAR
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleView(property.id)}
                      className="border-green-200 hover:bg-green-50 hover:border-green-300"
                    >
                      <Eye className="h-4 w-4 text-green-600" />
                    </Button>
                    {property.status !== "approved" && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(property.id)}
                          className="border-green-200 hover:bg-green-50 hover:border-green-300"
                        >
                          <Edit className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(property.id)}
                          className="border-green-200 hover:bg-green-50 hover:border-green-300"
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
        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left font-medium">
                    {t("properties.title")}
                  </th>
                  <th className="h-12 px-4 text-left font-medium">
                    {t("properties.type")}
                  </th>
                  <th className="h-12 px-4 text-left font-medium">
                    {t("properties.district")}
                  </th>
                  <th className="h-12 px-4 text-left font-medium">
                    {t("properties.price")}
                  </th>
                  <th className="h-12 px-4 text-left font-medium">
                    {t("properties.status")}
                  </th>
                  <th className="h-12 px-4 text-left font-medium">
                    {t("properties.dateAdded")}
                  </th>
                  <th className="h-12 px-4 text-left font-medium">
                    {t("properties.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="border-b">
                    <td className="p-4 align-middle font-medium">
                      {property.title}
                    </td>
                    <td className="p-4 align-middle">{property.type}</td>
                    <td className="p-4 align-middle">{property.district}</td>
                    <td className="p-4 align-middle">
                      {property.price.toLocaleString()}
                    </td>
                    <td className="p-4 align-middle">
                      {getStatusBadge(property.status)}
                    </td>
                    <td className="p-4 align-middle">{property.createdAt}</td>
                    <td className="p-4 align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleView(property.id)}
                            className="text-green-600 focus:bg-green-50 focus:text-green-700"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            {t("properties.view")}
                          </DropdownMenuItem>
                          {property.status !== "approved" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleEdit(property.id)}
                                className="text-green-600 focus:bg-green-50 focus:text-green-700"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                {t("properties.edit")}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(property.id)}
                                className="text-green-600 focus:bg-green-50 focus:text-green-700"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {t("properties.delete")}
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
        </div>
      )}
    </div>
  );
}
