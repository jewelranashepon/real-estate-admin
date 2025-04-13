import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsOverview } from "@/components/admin/analytics-overview"
import { PropertyPerformance } from "@/components/admin/property-performance"
import { UserActivity } from "@/components/admin/user-activity"
import { MarketTrends } from "@/components/admin/market-trends"
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: "Analytics | Real Estate Admin",
  description: "Real estate analytics and insights",
}

export default function AnalyticsPage() {
  const t = useTranslations('dashboard')
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('analytics')}</h1>

      <AnalyticsOverview />

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="performance">{t('propertyPerformance')}</TabsTrigger>
          <TabsTrigger value="users">{t('userActivity')}</TabsTrigger>
          <TabsTrigger value="market">{t('marketTrends')}</TabsTrigger>
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

