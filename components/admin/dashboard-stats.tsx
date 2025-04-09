import { Building2, Users, MessageSquare, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "next-intl"

interface DashboardStatsProps {
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

export function DashboardStats({ stats }: DashboardStatsProps) {
  // Find the count of properties with "Published" status
  const publishedCount = stats.statusStats.find((stat) => stat.statusName === "Published")?.count || 0

  // Find the count of properties with "Sold" status
  const soldCount = stats.statusStats.find((stat) => stat.statusName === "Sold")?.count || 0
  const t = useTranslations('dashboard')

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t('totalProperties')}</p>
            <h3 className="text-2xl font-bold">{stats.propertyCount}</h3>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">{publishedCount} {t('published')}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t('activeUsers')}</p>
            <h3 className="text-2xl font-bold">{stats.userCount}</h3>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">{t('activePlatformUsers')}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t('propertyTypes')}</p>
            <h3 className="text-2xl font-bold">{stats.typeStats.length}</h3>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">{stats.typeStats[0]?.typeName || "None"} {t('noneIsMostCommon')}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t('propertiesSold')}</p>
            <h3 className="text-2xl font-bold">{soldCount}</h3>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">
                {Math.round((soldCount / stats.propertyCount) * 100) || 0}% {t('conversionRate')}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

