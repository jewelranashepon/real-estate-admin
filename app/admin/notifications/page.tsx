import type { Metadata } from "next"
import { NotificationsList } from "@/components/admin/notifications-list"

export const metadata: Metadata = {
  title: "Notifications | Real Estate Admin",
  description: "View and manage notifications",
}

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>

      <NotificationsList />
    </div>
  )
}

