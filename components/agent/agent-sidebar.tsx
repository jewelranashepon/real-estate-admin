"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
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
  const [propertiesOpen, setPropertiesOpen] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);
  const pendingNotifications = 3;
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const isRtl = locale === "ar";

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <Sidebar variant="floating" className="border-r w-64">
      <SidebarHeader className="bg-green-600 text-white flex flex-col items-center justify-center py-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-white" />
            <h1 className="text-xl font-bold">PropManage</h1>
          </div>
          <Badge variant="outline" className="px-2 py-0.5 text-xs text-white">
            {t("common.agentPortal")}
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent className="bg-green-50">
        <div className="mb-4 px-4">
          <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
            <Avatar className="h-10 w-10 border-2 border-green-500">
              <AvatarImage src="/avatar.png" alt="Agent" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-sm font-medium leading-none">Ahmed Rashid</h3>
              <p className="text-xs text-muted-foreground">Real Estate Agent</p>
            </div>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-green-800">
            {t("common.dashboard")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/agent/dashboard" passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={isActive("/agent/dashboard")}
                    tooltip={t("common.dashboard")}
                    className="hover:bg-green-500 hover:text-white data-[active=true]:bg-green-600 data-[active=true]:text-white"
                  >
                    <LayoutDashboard />
                    <span>{t("common.dashboard")}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/agent/overview" passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={isActive("/agent/overview")}
                    tooltip={t("common.overview")}
                    className="hover:bg-green-500 hover:text-white data-[active=true]:bg-green-600 data-[active=true]:text-white"
                  >
                    <BarChart4 />
                    <span>{t("common.overview")}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

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
                    <SidebarMenuButton className="hover:bg-green-500 hover:text-white">
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
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <Link href="/agent/properties" passHref legacyBehavior>
                        <SidebarMenuSubButton
                          isActive={isActive("/agent/properties")}
                          className="hover:bg-green-500 hover:text-white data-[active=true]:bg-green-600 data-[active=true]:text-white"
                        >
                          {t("common.myProperties")}
                        </SidebarMenuSubButton>
                      </Link>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <Link
                        href="/agent/properties/add"
                        passHref
                        legacyBehavior
                      >
                        <SidebarMenuSubButton
                          isActive={isActive("/agent/properties/add")}
                          className="hover:bg-green-500 hover:text-white data-[active=true]:bg-green-600 data-[active=true]:text-white"
                        >
                          {t("common.addProperty")}
                        </SidebarMenuSubButton>
                      </Link>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <Link href="/agent/map" passHref legacyBehavior>
                        <SidebarMenuSubButton
                          isActive={isActive("/agent/map")}
                          className="hover:bg-green-500 hover:text-white data-[active=true]:bg-green-600 data-[active=true]:text-white"
                        >
                          {t("common.propertyMap")}
                        </SidebarMenuSubButton>
                      </Link>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>

              <SidebarMenuItem>
                <Link href="/agent/profile" passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={isActive("/agent/profile")}
                    tooltip={t("common.profile")}
                    className="hover:bg-green-500 hover:text-white data-[active=true]:bg-green-600 data-[active=true]:text-white"
                  >
                    <User />
                    <span>{t("common.profile")}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/agent/notifications" passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={isActive("/agent/notifications")}
                    tooltip={t("common.notifications")}
                    className="hover:bg-green-500 hover:text-white data-[active=true]:bg-green-600 data-[active=true]:text-white"
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
    </Sidebar>
  );
}

// These components are needed for the submenu functionality
const SidebarMenuSub = ({
  className,
  ...props
}: React.ComponentProps<"ul">) => (
  <ul
    className={`mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-green-300 px-2.5 py-0.5 group-data-[collapsible=icon]:hidden ${className}`}
    {...props}
  />
);

const SidebarMenuSubItem = (props: React.ComponentProps<"li">) => (
  <li {...props} />
);

const SidebarMenuSubButton = ({
  className,
  isActive,
  ...props
}: React.ComponentProps<"a"> & {
  isActive?: boolean;
}) => (
  <a
    className={`flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground text-sm data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden ${className}`}
    data-active={isActive}
    {...props}
  />
);
