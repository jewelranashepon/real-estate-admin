import type { Metadata } from "next"
import ProfileManagement from "@/components/agent/profile-management"

export const metadata: Metadata = {
  title: "Profile | Agent Portal",
  description: "Manage your agent profile",
}

export default function ProfilePage() {
  return <ProfileManagement />
}
