"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AnalyticsOverview() {
  // Mock data for the charts
  const monthlyData = [
    { name: "Jan", listings: 65, views: 240, inquiries: 24 },
    { name: "Feb", listings: 59, views: 280, inquiries: 28 },
    { name: "Mar", listings: 80, views: 290, inquiries: 29 },
    { name: "Apr", listings: 81, views: 310, inquiries: 31 },
    { name: "May", listings: 56, views: 180, inquiries: 18 },
    { name: "Jun", listings: 55, views: 255, inquiries: 25 },
    { name: "Jul", listings: 40, views: 190, inquiries: 19 },
    { name: "Aug", listings: 72, views: 320, inquiries: 32 },
    { name: "Sep", listings: 78, views: 280, inquiries: 28 },
    { name: "Oct", listings: 82, views: 310, inquiries: 31 },
    { name: "Nov", listings: 85, views: 350, inquiries: 35 },
    { name: "Dec", listings: 68, views: 270, inquiries: 27 },
  ]

  const weeklyData = [
    { name: "Mon", listings: 12, views: 45, inquiries: 5 },
    { name: "Tue", listings: 15, views: 52, inquiries: 6 },
    { name: "Wed", listings: 18, views: 58, inquiries: 7 },
    { name: "Thu", listings: 16, views: 50, inquiries: 5 },
    { name: "Fri", listings: 14, views: 48, inquiries: 4 },
    { name: "Sat", listings: 10, views: 40, inquiries: 3 },
    { name: "Sun", listings: 8, views: 35, inquiries: 2 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>View your real estate performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="listings" name="New Listings" fill="hsl(var(--primary))" />
                <Bar dataKey="views" name="Property Views" fill="hsl(var(--secondary))" />
                <Bar dataKey="inquiries" name="Inquiries" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="weekly" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="listings" name="New Listings" fill="hsl(var(--primary))" />
                <Bar dataKey="views" name="Property Views" fill="hsl(var(--secondary))" />
                <Bar dataKey="inquiries" name="Inquiries" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

