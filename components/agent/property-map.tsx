"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const properties = [
  {
    id: 1,
    title: "فيلا فاخرة في العليا",
    type: "فيلا",
    district: "العليا",
    status: "تمت الموافقة",
    lat: 24.7136,
    lng: 46.6753,
  },
  {
    id: 2,
    title: "شقة حديثة في الملز",
    type: "شقة",
    district: "الملز",
    status: "قيد الانتظار",
    lat: 24.6748,
    lng: 46.7354,
  },
  {
    id: 3,
    title: "أرض تجارية في النسيم",
    type: "أرض",
    district: "النسيم",
    status: "مرفوض",
    lat: 24.7719,
    lng: 46.7247,
  },
  {
    id: 4,
    title: "مساحة مكتبية في قرطبة",
    type: "مكتب",
    district: "قرطبة",
    status: "تمت الموافقة",
    lat: 24.7867,
    lng: 46.7184,
  },
  {
    id: 5,
    title: "محل تجاري في الورود",
    type: "محل تجاري",
    district: "الورود",
    status: "قيد الانتظار",
    lat: 24.7328,
    lng: 46.6564,
  },
  {
    id: 6,
    title: "فيلا واسعة في حطين",
    type: "فيلا",
    district: "حطين",
    status: "تمت الموافقة",
    lat: 24.7742,
    lng: 46.6415,
  },
  {
    id: 7,
    title: "شقة فاخرة في النخيل",
    type: "شقة",
    district: "النخيل",
    status: "تمت الموافقة",
    lat: 24.7531,
    lng: 46.6804,
  },
  {
    id: 8,
    title: "مبنى تجاري في الياسمين",
    type: "تجاري",
    district: "الياسمين",
    status: "قيد الانتظار",
    lat: 24.8232,
    lng: 46.6365,
  },
  {
    id: 9,
    title: "أرض سكنية في المربع",
    type: "أرض",
    district: "المربع",
    status: "تمت الموافقة",
    lat: 24.6384,
    lng: 46.7124,
  },
];

export default function PropertyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { locale } = useParams();
  const t = useTranslations();
  const isRtl = locale === "ar";

  useEffect(() => {
    // This is a placeholder for actual map integration
    // In a real implementation, you would use a library like Leaflet, Mapbox, or Google Maps
    if (mapRef.current) {
      // Simulate map loading
      const timer = setTimeout(() => {
        setMapLoaded(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

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
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {t("common.propertyMap")}
        </h2>
        <p className="text-muted-foreground">{t("map.viewProperties")}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t("map.mapView")}</CardTitle>
            <CardDescription>{t("map.interactiveMap")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              ref={mapRef}
              className="relative h-[500px] w-full rounded-md overflow-hidden "
            >
              {!mapLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
                </div>
              ) : (
                <>
                  {/* Placeholder for the actual map */}
                  <div className="absolute inset-0 bg-[url('/map.png')] bg-cover bg-left">
                    {/* Simulated map with property pins */}
                    {properties.map((property) => (
                      <button
                        key={property.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-125 ${
                          property.status === "approved"
                            ? "bg-green-500"
                            : property.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        } ${
                          selectedProperty?.id === property.id
                            ? "ring-2 ring-white ring-offset-2"
                            : ""
                        }`}
                        style={{
                          left: `${((property.lng - 46.6) / 0.3) * 100}%`,
                          top: `${100 - ((property.lat - 24.6) / 0.3) * 100}%`,
                        }}
                        onClick={() => setSelectedProperty(property)}
                      >
                        <span className="text-white text-xs font-bold">
                          {property.id}
                        </span>
                      </button>
                    ))}

                    {/* Map labels */}
                    <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md text-xs">
                      <div className="font-bold mb-1">
                        {t("map.riyadhDistricts")}
                      </div>
                      <div className="grid grid-cols-2 gap-x-4">
                        <div>• Al Olaya</div>
                        <div>• Al Malaz</div>
                        <div>• Al Naseem</div>
                        <div>• Qurtubah</div>
                        <div>• Al Wurud</div>
                        <div>• Hittin</div>
                        <div>• Al Nakheel</div>
                        <div>• Al Yasmin</div>
                        <div>• Al Murabba</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("map.propertyDetails")}</CardTitle>
            <CardDescription>{t("map.selectProperty")}</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedProperty ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedProperty.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusBadge(selectedProperty.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">{t("properties.type")}:</div>
                  <div>{selectedProperty.type}</div>

                  <div className="font-medium">{t("properties.district")}:</div>
                  <div>{selectedProperty.district}</div>

                  <div className="font-medium">{t("map.coordinates")}:</div>
                  <div>
                    {selectedProperty.lat.toFixed(4)},{" "}
                    {selectedProperty.lng.toFixed(4)}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">
                    {t("properties.actions")}:
                  </h4>
                  <div className="flex gap-2">
                    <button className="text-sm px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700">
                      {t("map.viewDetails")}
                    </button>
                    {selectedProperty.status !== "approved" && (
                      <button className="text-sm px-3 py-1 bg-muted text-muted-foreground rounded-md">
                        {t("properties.edit")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 mb-4 text-green-500"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p>{t("map.selectProperty")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("common.propertyMap")}</CardTitle>
          <CardDescription>{t("properties.allProperties")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left font-medium">ID</th>
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
                      {t("properties.status")}
                    </th>
                    <th className="h-12 px-4 text-left font-medium">
                      {t("properties.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr
                      key={property.id}
                      className={`border-b ${
                        selectedProperty?.id === property.id
                          ? "bg-green-50"
                          : ""
                      }`}
                    >
                      <td className="p-4 align-middle font-medium">
                        {property.id}
                      </td>
                      <td className="p-4 align-middle">{property.title}</td>
                      <td className="p-4 align-middle">{property.type}</td>
                      <td className="p-4 align-middle">{property.district}</td>
                      <td className="p-4 align-middle">
                        {getStatusBadge(property.status)}
                      </td>
                      <td className="p-4 align-middle">
                        <button
                          className="text-sm px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                          onClick={() => setSelectedProperty(property)}
                        >
                          {t("map.showOnMap")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
