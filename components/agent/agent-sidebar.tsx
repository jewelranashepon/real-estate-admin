"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SiGoogleadsense } from "react-icons/si";
import {
  LayoutDashboard,
  User,
  Bell,
  LogOut,
  Building,
  Settings,
  ChevronDown,
  BarChart4,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function AgentSidebar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState("");
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const pendingNotifications = 3;
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === "ar";

  useEffect(() => {
    // URL পরিবর্তন হলে Active মেনু আপডেট করুন
    if (pathname === "/agent/dashboard") {
      setActiveMenu("dashboard");
      setPropertiesOpen(false);
    } else if (pathname === "/agent/overview") {
      setActiveMenu("overview");
      setPropertiesOpen(false);
    } else if (pathname === "/agent/leads") {
      setActiveMenu("leads");
      setPropertiesOpen(false);
    } else if (pathname.startsWith("/agent/properties")) {
      setPropertiesOpen(true);
      if (pathname === "/agent/properties/add") {
        setActiveMenu("addProperty");
      } else if (pathname === "/agent/map") {
        setActiveMenu("propertyMap");
      } else {
        setActiveMenu("myProperties");
      }
    } else if (pathname === "/agent/profile") {
      setActiveMenu("profile");
      setPropertiesOpen(false);
    } else if (pathname === "/agent/notifications") {
      setActiveMenu("notifications");
      setPropertiesOpen(false);
    }
  }, [pathname]);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    if (
      menu === "myProperties" ||
      menu === "addProperty" ||
      menu === "propertyMap"
    ) {
      setPropertiesOpen(true);
    } else {
      setPropertiesOpen(false);
    }
  };

  const getActiveClass = (menu: string) => {
    return activeMenu === menu ? "bg-green-600 text-white" : "";
  };

  return (
    <div className="border-r h-full flex flex-col w-64 rtl:order-1">
      {/* সাইডবার হেডার */}
      <SidebarHeader className="bg-green-600 text-white flex flex-col items-center justify-center py-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-white" />
            <h1 className="text-xl font-bold">{t("common.agentPortal")}</h1>
          </div>
          <Badge variant="outline" className="px-2 py-0.5 text-xs text-white">
            {t("common.agentPortal")}
          </Badge>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="bg-green-50">
        {/* এজেন্ট প্রোফাইল */}
        <div className="mb-4 px-4">
          <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
            <Avatar className="h-10 w-10 border-2 border-green-500">
              <AvatarImage src="/image.jpg" alt="Agent" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-sm font-medium leading-none">
                {t("common.agentName")}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t("common.description")}
              </p>
            </div>
          </div>
        </div>

        {/* ড্যাশবোর্ড মেনু */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-800">
            {t("common.agentdashboard")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/agent/dashboard" passHref legacyBehavior>
                  <SidebarMenuButton
                    className={`hover:bg-green-500 hover:text-white ${getActiveClass(
                      "dashboard"
                    )}`}
                    onClick={() => handleMenuClick("dashboard")}
                  >
                    <LayoutDashboard />
                    <span>{t("common.agentdashboard")}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/agent/overview" passHref legacyBehavior>
                  <SidebarMenuButton
                    className={`hover:bg-green-500 hover:text-white ${getActiveClass(
                      "overview"
                    )}`}
                    onClick={() => handleMenuClick("overview")}
                  >
                    <BarChart4 />
                    <span>{t("common.overview")}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/agent/leads" passHref legacyBehavior>
                  <SidebarMenuButton
                    className={`hover:bg-green-500 hover:text-white ${getActiveClass(
                      "leads"
                    )}`}
                    onClick={() => handleMenuClick("leads")}
                  >
                    <SiGoogleadsense />
                    <span>{t("common.leads")}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* প্রোপার্টিজ মেনু */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-green-800">
            {t("common.properties")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible
                open={propertiesOpen}
                onOpenChange={setPropertiesOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className={`hover:bg-green-500 hover:text-white ${
                        activeMenu === "myProperties" ||
                        activeMenu === "addProperty" ||
                        activeMenu === "propertyMap"
                          ? "bg-green-600 text-white"
                          : ""
                      }`}
                    >
                      <Building />
                      <span>{t("common.properties")}</span>
                      <ChevronDown
                        className={`ml-auto h-4 w-4 transition-transform ${
                          propertiesOpen ? "rotate-180" : ""
                        } ${isRtl ? "mr-auto ml-0" : ""}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent>
                  <ul className="mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-green-300 px-2.5 py-0.5">
                    <li>
                      <Link href="/agent/properties" passHref legacyBehavior>
                        <a
                          className={`flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sm hover:bg-green-500 hover:text-white ${
                            activeMenu === "myProperties"
                              ? "bg-green-600 text-white"
                              : ""
                          }`}
                          onClick={() => handleMenuClick("myProperties")}
                        >
                          {t("common.myProperties")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/agent/properties/add"
                        passHref
                        legacyBehavior
                      >
                        <a
                          className={`flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sm hover:bg-green-500 hover:text-white ${
                            activeMenu === "addProperty"
                              ? "bg-green-600 text-white"
                              : ""
                          }`}
                          onClick={() => handleMenuClick("addProperty")}
                        >
                          {t("common.addProperty")}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/agent/map" passHref legacyBehavior>
                        <a
                          className={`flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sm hover:bg-green-500 hover:text-white ${
                            activeMenu === "propertyMap"
                              ? "bg-green-600 text-white"
                              : ""
                          }`}
                          onClick={() => handleMenuClick("propertyMap")}
                        >
                          {t("common.propertyMap")}
                        </a>
                      </Link>
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>

              <SidebarMenuItem>
                <Link href="/agent/profile" passHref legacyBehavior>
                  <SidebarMenuButton
                    className={`hover:bg-green-500 hover:text-white ${getActiveClass(
                      "profile"
                    )}`}
                    onClick={() => handleMenuClick("profile")}
                  >
                    <User />
                    <span>{t("common.profile")}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/agent/notifications" passHref legacyBehavior>
                  <SidebarMenuButton
                    className={`hover:bg-green-500 hover:text-white ${getActiveClass(
                      "notifications"
                    )}`}
                    onClick={() => handleMenuClick("notifications")}
                  >
                    <Bell />
                    <span>{t("common.notifications")}</span>
                  </SidebarMenuButton>
                </Link>
                {pendingNotifications > 0 && (
                  <SidebarMenuBadge className="bg-green-700">
                    {pendingNotifications}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />
      </SidebarContent>
      {/* সাইডবার ফুটার */}
      <SidebarFooter className="p-4 bg-green-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-green-500 hover:text-white">
              <Settings />
              <span>{t("common.settings")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={async () => {
                try {
                  await signOut();
                  router.push("/");
                  router.refresh();
                } catch (error) {
                  console.error("Logout failed", error);
                }
              }}
            >
              <LogOut />
              <span>{t("common.logout")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
         
    </div>
  );
}
