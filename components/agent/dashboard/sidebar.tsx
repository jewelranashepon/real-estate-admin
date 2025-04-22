"use client";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import {
  BarChart3,
  Building2,
  Calendar,
  Home,
  LogOut,
  Settings,
  Users,
  DollarSign,
  UserPlus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin");

  const agentNavItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Properties", href: "/properties", icon: Building2 },
    { name: "Leads", href: "/leads", icon: Users },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Transactions", href: "/transactions", icon: DollarSign },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const adminNavItems = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Agents", href: "/admin/agents", icon: UserPlus },
    { name: "Properties", href: "/admin/properties", icon: Building2 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const navItems = isAdmin ? adminNavItems : agentNavItems;

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          <div className="font-semibold text-lg">
            {isAdmin ? "Admin Portal" : "Agent Portal"}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-2 py-4">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.name}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Agent" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">John Doe</div>
              <div className="text-muted-foreground text-xs">Senior Agent</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/auth/login">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Link>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarTrigger className="absolute right-4 top-4 md:hidden" />
    </Sidebar>
  );
}
