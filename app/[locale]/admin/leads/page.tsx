import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadsTable } from "@/components/admin/leads-table"
import { MessagesTable } from "@/components/admin/messages-table"
import { useTranslations } from "next-intl"

export const metadata: Metadata = {
  title: "Leads & Messages | Real Estate Admin",
  description: "Manage leads and messages",
}

export default function LeadsPage() {
  const t = useTranslations('dashboard')
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('leadsAndMessages')}</h1>

      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="leads">{t('leads')}</TabsTrigger>
          <TabsTrigger value="messages">{t('messages')}</TabsTrigger>
        </TabsList>
        <TabsContent value="leads" className="pt-4">
          <LeadsTable />
        </TabsContent>
        <TabsContent value="messages" className="pt-4">
          <MessagesTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

