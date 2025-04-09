import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentsTable } from "@/components/admin/payments-table"
import { InvoicesTable } from "@/components/admin/invoices-table"
import { PaymentStats } from "@/components/admin/payment-stats"

export const metadata: Metadata = {
  title: "Payments | Real Estate Admin",
  description: "Manage payments and invoices",
}

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Payments</h1>

      <PaymentStats />

      <Tabs defaultValue="payments" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
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

