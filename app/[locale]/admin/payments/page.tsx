import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentsTable } from "@/components/admin/payments-table"
import { InvoicesTable } from "@/components/admin/invoices-table"
import { PaymentStats } from "@/components/admin/payment-stats"
import { useTranslations } from "next-intl"

export const metadata: Metadata = {
  title: "Payments | Real Estate Admin",
  description: "Manage payments and invoices",
}

export default function PaymentsPage() {
  const t = useTranslations('dashboard')
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">{t('payments')}</h1>

      <PaymentStats />

      <Tabs defaultValue="payments" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="payments">{t('payments')}</TabsTrigger>
          <TabsTrigger value="invoices">{t('invoices')}</TabsTrigger>
        </TabsList>
        <TabsContent value="payments" className="pt-4">
          <PaymentsTable />
        </TabsContent>
        <TabsContent value="invoices" className="pt-4">
          <InvoicesTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

