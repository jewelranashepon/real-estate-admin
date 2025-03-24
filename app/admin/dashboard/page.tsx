import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/admin/overview"
import { RecentProperties } from "@/components/admin/recent-properties"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { getDashboardStats, getRecentProperties } from "@/lib/actions"

export const metadata: Metadata = {
  title: "Dashboard | Real Estate Admin",
  description: "Admin dashboard for real estate management",
}

export default async function DashboardPage() {
  const [stats, recentProperties] = await Promise.all([getDashboardStats(), getRecentProperties(5)])

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <DashboardStats stats={stats} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Property Overview</CardTitle>
            <CardDescription>Distribution of properties by type and status</CardDescription>
          </CardHeader>
          <CardContent>
            <Overview stats={stats} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Properties</CardTitle>
            <CardDescription>Recently added or updated properties</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentProperties properties={recentProperties} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

