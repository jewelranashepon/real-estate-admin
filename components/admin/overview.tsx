"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell } from "@/components/ui/chart"
import { useTranslations } from "next-intl"

interface OverviewProps {
  stats: {
    propertyCount: number
    userCount: number
    typeStats: Array<{
      typeId: number
      count: number
      typeName: string
    }>
    statusStats: Array<{
      statusId: number
      count: number
      statusName: string
    }>
  }
}

export function Overview({ stats }: OverviewProps) {
  const t = useTranslations('dashboard')
  // Colors for the pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  return (
    <Tabs defaultValue="types">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="types">{t('propertyTypes')}</TabsTrigger>
        <TabsTrigger value="status">{t('propertyStatus')}</TabsTrigger>
      </TabsList>

      <TabsContent value="types" className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.typeStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="typeName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Properties" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </TabsContent>

      <TabsContent value="status" className="pt-4">
        <div className="flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.statusStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                nameKey="statusName"
                label={({ statusName, count }) => `${statusName}: ${count}`}
              >
                {stats.statusStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {stats.statusStats.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm">
                  {entry.statusName}: {entry.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}

