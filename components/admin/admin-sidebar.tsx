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
  Menu,
  X,
} from "lucide-react";
import { usePathname, Link } from "@/i18n/navigation";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function AdminSidebar() {
  const t = useTranslations("dashboard");
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { label: t("db"), icon: LayoutDashboard, path: "/admin" },
    { label: t("properties"), icon: Building2, path: `/admin/properties` },
    { label: t("usersAndAgents"), icon: Users, path: "/admin/users" },
    { label: t("content"), icon: FileText, path: "/admin/content" },
    { label: t("leadsAndMessages"), icon: MessageSquare, path: "/admin/leads" },
    { label: t("payments"), icon: CreditCard, path: "/admin/payments" },
    { label: t("analytics"), icon: BarChart, path: "/admin/analytics" },
    { label: t("settings"), icon: Settings, path: "/admin/settings" },
    {
      label: t("notifications"),
      icon: Bell,
      path: "/admin/notifications",
      badge: 5,
    },
    { label: t("support"), icon: HelpCircle, path: "/admin/support" },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  const SidebarBody = () => (
    <div
      className={`flex flex-col h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      } bg-zinc-900 text-white shadow-2xl md:rounded-r-xl`}
    >
      {/* Header */}
      <SidebarHeader
        className={`h-16 border-b border-zinc-800 ${
          collapsed
            ? "flex items-center justify-center px-6"
            : "flex items-center pl-0 pr-4"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-primary" />
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-base font-semibold text-white">
                  Birds of Eden
                </span>
                <span className="text-sm text-zinc-400 font-medium tracking-wide">
                  Admin Panel
                </span>
              </div>
            </Link>
          )}
          <button
            className="text-zinc-400 hover:text-white md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
          <button
            className={`text-zinc-400 hover:text-white ${
              collapsed ? "" : "hidden md:block"
            }`}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="py-4 px-2 overflow-y-auto">
        <SidebarMenu className="space-y-3">
          {menuItems.map(({ label, icon: Icon, path, badge }) => {
            const active = pathname === path;
            return (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    active
                      ? "bg-primary/90 text-white shadow-md border-l-4 "
                      : "hover:bg-zinc-800 hover:text-white text-zinc-400"
                  }`}
                >
                  <Link href={path} className="flex items-center w-full">
                    {/* Active bar (optional) */}
                    <Icon
                      className={`h-5 w-5 shrink-0 transition-colors ${
                        active
                          ? "text-black"
                          : "text-zinc-400 group-hover:text-white"
                      }`}
                    />

                    {!collapsed && (
                      <span
                        className={`ml-3 text-base font-medium transition-colors ${
                          active
                            ? "text-black"
                            : "text-zinc-400 group-hover:text-white"
                        }`}
                      >
                        {label}
                      </span>
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

      {/* Footer */}
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

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">{SidebarBody()}</div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed z-50 top-3 left-4 bg-zinc-900 text-white p-2 rounded-md shadow-md"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden flex"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="bg-zinc-900 shadow-2xl w-72 h-full animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            {SidebarBody()}
          </div>
        </div>
      )}
    </>
  );
}
