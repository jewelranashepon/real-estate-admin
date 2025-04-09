import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsOverview } from "@/components/admin/analytics-overview"
import { PropertyPerformance } from "@/components/admin/property-performance"
import { UserActivity } from "@/components/admin/user-activity"
import { MarketTrends } from "@/components/admin/market-trends"

export const metadata: Metadata = {
  title: "Analytics | Real Estate Admin",
  description: "Real estate analytics and insights",
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>

      <AnalyticsOverview />

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="performance">Property Performance</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="market">Market Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="pt-4">
          <PropertyPerformance />
        </TabsContent>
        <TabsContent value="users" className="pt-4">
          <UserActivity />
        </TabsContent>
        <TabsContent value="market" className="pt-4">
          <MarketTrends />
        </TabsContent>
      </Tabs>
    </div>
  )
}

