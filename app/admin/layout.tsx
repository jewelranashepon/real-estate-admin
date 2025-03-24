import type React from "react"
import type { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

export const metadata: Metadata = {
  title: "Real Estate Admin Panel",
  description: "Admin panel for managing real estate properties",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <SidebarProvider>
    //   <div className="flex h-screen overflow-hidden w-full bg-background">
    //     <AdminSidebar />
    //     <div className="flex min-h-screen flex-col w-full overflow-y-auto">
    //       <AdminHeader />
    //       <main className="flex-1 p-6">{children}</main>
    //     </div>
    //   </div>
    // </SidebarProvider>
    <SidebarProvider>
  <div className="flex h-screen w-full bg-background overflow-hidden">
    {/* Fixed Sidebar */}
    <AdminSidebar />

    {/* Right section: Header + Scrollable content */}
    <div className="flex flex-col flex-1 h-full">
      <AdminHeader />

      {/* Only this area scrolls */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  </div>
</SidebarProvider>

  )
}

