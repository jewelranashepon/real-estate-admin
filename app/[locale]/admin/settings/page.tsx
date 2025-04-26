import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsGeneral } from "@/components/admin/settings-general"
import { SettingsAppearance } from "@/components/admin/settings-appearance"
import { SettingsNotifications } from "@/components/admin/settings-notifications"
import { SettingsIntegrations } from "@/components/admin/settings-integrations"
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: "Settings | Real Estate Admin",
  description: "Manage application settings",
}

export default function SettingsPage() {
  const t = useTranslations('dashboard')
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('settings')}</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full max-w-xl grid-cols-4">
          <TabsTrigger value="general">{t('general')}</TabsTrigger>
          <TabsTrigger value="appearance">{t('appearance')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('notifications')}</TabsTrigger>
          <TabsTrigger value="integrations">{t('integrations')}</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="pt-4">
          <SettingsGeneral />
        </TabsContent>
        <TabsContent value="appearance" className="pt-4">
          <SettingsAppearance />
        </TabsContent>
        <TabsContent value="notifications" className="pt-4">
          <SettingsNotifications />
        </TabsContent>
        <TabsContent value="integrations" className="pt-4">
          <SettingsIntegrations />
        </TabsContent>
      </Tabs>
    </div>
  )
}

