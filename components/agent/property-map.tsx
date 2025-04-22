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

// Mock property data with coordinates
const properties = [
  {
    id: 1,
    title: "Luxury Villa in Al Olaya",
    type: "Villa",
    district: "Al Olaya",
    status: "approved",
    lat: 24.7136,
    lng: 40.6753,
  },
  {
    id: 2,
    title: "Modern Apartment in Al Malaz",
    type: "Apartment",
    district: "Al Malaz",
    status: "pending",
    lat: 26.7867,
    lng: 44.7184,
  },
  {
    id: 3,
    title: "Commercial Land in Al Naseem",
    type: "Land",
    district: "Al Naseem",
    status: "rejected",
    lat: 24.7719,
    lng: 46.7247,
  },
  {
    id: 4,
    title: "Office Space in Qurtubah",
    type: "Office",
    district: "Qurtubah",
    status: "approved",
    lat: 24.7867,
    lng: 46.7184,
  },
  {
    id: 5,
    title: "Retail Shop in Al Wurud",
    type: "Retail",
    district: "Al Wurud",
    status: "pending",
    lat: 20.7867,
    lng: 40.7184,
  },
];

export default function PropertyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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
          <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
        );
      case "rejected":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Property Map</h2>
        <p className="text-muted-foreground">
          View your properties on the map of Riyadh.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Map View</CardTitle>
            <CardDescription>
              Interactive map showing your property locations in Riyadh.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              ref={mapRef}
              className="relative h-[500px] w-full rounded-md overflow-hidden "
            >
              {!mapLoaded ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
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
                      <div className="font-bold mb-1">Riyadh Districts</div>
                      <div className="grid grid-cols-2 gap-x-4">
                        <div>• Al Olaya</div>
                        <div>• Al Malaz</div>
                        <div>• Al Naseem</div>
                        <div>• Qurtubah</div>
                        <div>• Al Wurud</div>
                        <div>• Hittin</div>
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
            <CardTitle>Property Details</CardTitle>
            <CardDescription>
              Select a property on the map to view details.
            </CardDescription>
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
                  <div className="font-medium">Type:</div>
                  <div>{selectedProperty.type}</div>

                  <div className="font-medium">District:</div>
                  <div>{selectedProperty.district}</div>

                  <div className="font-medium">Coordinates:</div>
                  <div>
                    {selectedProperty.lat.toFixed(4)},{" "}
                    {selectedProperty.lng.toFixed(4)}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Actions:</h4>
                  <div className="flex gap-2">
                    <button className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md">
                      View Details
                    </button>
                    {selectedProperty.status !== "approved" && (
                      <button className="text-sm px-3 py-1 bg-muted text-muted-foreground rounded-md">
                        Edit
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
                  className="h-12 w-12 mb-4"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p>Select a property pin on the map to view its details.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property List</CardTitle>
          <CardDescription>
            All your properties shown on the map.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left font-medium">ID</th>
                    <th className="h-12 px-4 text-left font-medium">Title</th>
                    <th className="h-12 px-4 text-left font-medium">Type</th>
                    <th className="h-12 px-4 text-left font-medium">
                      District
                    </th>
                    <th className="h-12 px-4 text-left font-medium">Status</th>
                    <th className="h-12 px-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr
                      key={property.id}
                      className={`border-b ${
                        selectedProperty?.id === property.id
                          ? "bg-muted/50"
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
                          className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded-md"
                          onClick={() => setSelectedProperty(property)}
                        >
                          Show on Map
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
