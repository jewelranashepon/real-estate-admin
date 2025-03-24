"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function PropertyPerformance() {
  const [propertyType, setPropertyType] = useState("all")

  // Mock data for the charts
  const viewsData = [
    { name: "Week 1", apartments: 120, houses: 90, condos: 70, villas: 40, townhouses: 60 },
    { name: "Week 2", apartments: 132, houses: 85, condos: 75, villas: 45, townhouses: 65 },
    { name: "Week 3", apartments: 145, houses: 95, condos: 80, villas: 50, townhouses: 70 },
    { name: "Week 4", apartments: 160, houses: 100, condos: 85, villas: 55, townhouses: 75 },
    { name: "Week 5", apartments: 175, houses: 110, condos: 90, villas: 60, townhouses: 80 },
    { name: "Week 6", apartments: 190, houses: 120, condos: 95, villas: 65, townhouses: 85 },
    { name: "Week 7", apartments: 205, houses: 130, condos: 100, villas: 70, townhouses: 90 },
    { name: "Week 8", apartments: 220, houses: 140, condos: 105, villas: 75, townhouses: 95 },
  ]

  // Mock data for top performing properties
  const topProperties = [
    { id: 1, name: "Modern Apartment in Downtown", type: "Apartment", views: 1250, inquiries: 45, conversion: "3.6%" },
    { id: 2, name: "Luxury Villa with Pool", type: "Villa", views: 980, inquiries: 38, conversion: "3.9%" },
    { id: 3, name: "Spacious Family Home", type: "House", views: 870, inquiries: 32, conversion: "3.7%" },
    { id: 4, name: "Waterfront Condo", type: "Condo", views: 760, inquiries: 29, conversion: "3.8%" },
    { id: 5, name: "Urban Townhouse", type: "Townhouse", views: 650, inquiries: 24, conversion: "3.7%" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Property Views by Type</CardTitle>
            <CardDescription>Weekly property views breakdown by property type</CardDescription>
          </div>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="apartments">Apartments</SelectItem>
              <SelectItem value="houses">Houses</SelectItem>
              <SelectItem value="condos">Condos</SelectItem>
              <SelectItem value="villas">Villas</SelectItem>
              <SelectItem value="townhouses">Townhouses</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {(propertyType === "all" || propertyType === "apartments") && (
                <Line type="monotone" dataKey="apartments" name="Apartments" stroke="#8884d8" activeDot={{ r: 8 }} />
              )}
              {(propertyType === "all" || propertyType === "houses") && (
                <Line type="monotone" dataKey="houses" name="Houses" stroke="#82ca9d" />
              )}
              {(propertyType === "all" || propertyType === "condos") && (
                <Line type="monotone" dataKey="condos" name="Condos" stroke="#ffc658" />
              )}
              {(propertyType === "all" || propertyType === "villas") && (
                <Line type="monotone" dataKey="villas" name="Villas" stroke="#ff8042" />
              )}
              {(propertyType === "all" || propertyType === "townhouses") && (
                <Line type="monotone" dataKey="townhouses" name="Townhouses" stroke="#0088fe" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Properties</CardTitle>
          <CardDescription>Properties with the highest views and inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Inquiries</TableHead>
                <TableHead className="text-right">Conversion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{property.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{property.views}</TableCell>
                  <TableCell className="text-right">{property.inquiries}</TableCell>
                  <TableCell className="text-right">{property.conversion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Metrics</CardTitle>
          <CardDescription>View to inquiry conversion rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Apartments</div>
                <div className="text-sm text-muted-foreground">3.6%</div>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "72%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Houses</div>
                <div className="text-sm text-muted-foreground">3.9%</div>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "78%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Condos</div>
                <div className="text-sm text-muted-foreground">3.8%</div>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "76%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Villas</div>
                <div className="text-sm text-muted-foreground">4.1%</div>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "82%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Townhouses</div>
                <div className="text-sm text-muted-foreground">3.7%</div>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div className="h-2 rounded-full bg-primary" style={{ width: "74%" }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

