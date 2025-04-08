"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

export function PropertyPerformance() {
  const data = [
    {
      name: "Luxury Condo",
      views: 120,
      leads: 24,
    },
    {
      name: "Family Home",
      views: 98,
      leads: 13,
    },
    {
      name: "Beach Villa",
      views: 86,
      leads: 18,
    },
    {
      name: "City Apartment",
      views: 99,
      leads: 15,
    },
    {
      name: "Suburban House",
      views: 85,
      leads: 11,
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Top Performing Properties</CardTitle>
        <CardDescription>Views and leads for your top 5 properties</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#adfa1d" name="Views" radius={[4, 4, 0, 0]} />
            <Bar dataKey="leads" fill="#f97316" name="Leads" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

