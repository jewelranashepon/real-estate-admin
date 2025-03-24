// "use client"

// import {
//   Building2,
//   LayoutDashboard,
//   Users,
//   MessageSquare,
//   CreditCard,
//   BarChart,
//   FileText,
//   Settings,
//   Bell,
//   HelpCircle,
// } from "lucide-react"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarFooter,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// export default function AdminSidebar() {
//   const pathname = usePathname()

//   const isActive = (path: string) => {
//     return pathname === path || pathname.startsWith(`${path}/`)
//   }

//   return (
//     <Sidebar>
//       <SidebarHeader className="flex h-14 items-center border-b px-4">
//         <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
//           <Building2 className="h-6 w-6" />
//           <span className="text-lg">Real Estate Admin</span>
//         </Link>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/admin/dashboard")} tooltip="Dashboard">
//               <Link href="/admin/dashboard">
//                 <LayoutDashboard />
//                 <span>Dashboard</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/admin/properties")} tooltip="Properties">
//               <Link href="/admin/properties">
//                 <Building2 />
//                 <span>Properties</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/admin/users")} tooltip="Users & Agents">
//               <Link href="/admin/users">
//                 <Users />
//                 <span>Users & Agents</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/admin/leads")} tooltip="Leads & Messages">
//               <Link href="/admin/leads">
//                 <MessageSquare />
//                 <span>Leads & Messages</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/admin/payments")} tooltip="Payments">
//               <Link href="/admin/payments">
//                 <CreditCard />
//                 <span>Payments</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/admin/analytics")} tooltip="Analytics">
//               <Link href="/admin/analytics">
//                 <BarChart />
//                 <span>Analytics</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/admin/content")} tooltip="Content">
//               <Link href="/admin/content">
//                 <FileText />
//                 <span>Content</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/admin/settings")} tooltip="Settings">
//               <Link href="/admin/settings">
//                 <Settings />
//                 <span>Settings</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/admin/notifications")} tooltip="Notifications">
//               <Link href="/admin/notifications">
//                 <Bell />
//                 <span>Notifications</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={isActive("/admin/support")} tooltip="Support">
//               <Link href="/admin/support">
//                 <HelpCircle />
//                 <span>Support</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarContent>
//       <SidebarFooter className="border-t p-4">
//         <div className="flex items-center gap-2">
//           <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
//             <span className="text-sm font-medium">AD</span>
//           </div>
//           <div className="flex flex-col">
//             <span className="text-sm font-medium">Admin User</span>
//             <span className="text-xs text-muted-foreground">admin@example.com</span>
//           </div>
//         </div>
//       </SidebarFooter>
//       <SidebarTrigger className="absolute right-4 top-3 md:hidden" />
//     </Sidebar>
//   )
// }

"use client";

import {
  Building2,
  LayoutDashboard,
  Users,
  MessageSquare,
  CreditCard,
  BarChart,
  FileText,
  Settings,
  Bell,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Properties", icon: Building2, path: "/admin/properties" },
    { label: "Users & Agents", icon: Users, path: "/admin/users" },
    { label: "Leads & Messages", icon: MessageSquare, path: "/admin/leads" },
    { label: "Payments", icon: CreditCard, path: "/admin/payments" },
    { label: "Analytics", icon: BarChart, path: "/admin/analytics" },
    { label: "Content", icon: FileText, path: "/admin/content" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
    {
      label: "Notifications",
      icon: Bell,
      path: "/admin/notifications",
      badge: 5,
    },
    { label: "Support", icon: HelpCircle, path: "/admin/support" },
  ];

  return (
    <div
      className={`flex flex-col max-h-screen overflow-hidden transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      } bg-zinc-900 text-white shadow-lg rounded-r-xl`}
    >
      <SidebarHeader className="flex h-16 items-center px-4 border-b border-zinc-800">
        <div className="flex items-center justify-between w-full">
          {!collapsed && (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Building2 className="h-6 w-6 text-primary" />
              <div>
                <p className="text-xl leading-tight">Real Estate</p>
                <p className="text-sm text-muted-foreground">Admin Panel</p>
              </div>
            </Link>
          )}
          <SidebarTrigger
            className="text-zinc-400 hover:text-white"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            ☰
          </SidebarTrigger>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4 px-2">
        <SidebarMenu className="space-y-3">
          {menuItems.map(({ label, icon: Icon, path, badge }) => {
            const active = isActive(path);
            return (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    active
                      ? "bg-primary/90 text-white shadow-md"
                      : "hover:bg-zinc-800 hover:text-white text-zinc-400"
                  }`}
                >
                  <Link href={path} className="flex items-center w-full">
                    <div>
                      <Icon className="size-6 shrink-0" />
                    </div>
                    {!collapsed && (
                      <span className="ml-3 text-base font-medium">{label}</span>
                    )}
                    {badge && !collapsed && (
                      <span className="ml-auto bg-green-500 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {badge}
                      </span>
                    )}
                    {badge && collapsed && (
                      <span className="absolute top-1.5 right-1.5 bg-green-500 text-xs w-4 h-4 rounded-full text-center text-white">
                        {badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t border-zinc-800 px-4 py-3 bg-zinc-950">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 text-white flex items-center justify-center font-bold shadow-inner">
            AD
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Admin User</span>
              <span className="text-xs text-zinc-400">admin@example.com</span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </div>
  );
}
