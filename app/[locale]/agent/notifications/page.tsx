import type { Metadata } from "next"
import NotificationCenter from "@/components/agent/notification-center"

export const metadata: Metadata = {
  title: "Notifications | Agent Portal",
  description: "View your notifications and alerts",
}

export default function NotificationsPage() {
  return <NotificationCenter />
}
