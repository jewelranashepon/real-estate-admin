import type { Metadata } from "next"
import { SupportDashboard } from "@/components/admin/support-dashboard"

export const metadata: Metadata = {
  title: "Support | Real Estate Admin",
  description: "Get help and support",
}

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Support</h1>

      <SupportDashboard />
    </div>
  )
}

