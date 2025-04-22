"use client";

import type React from "react";
import { useState } from "react";
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
import {
  LayoutDashboard,
  User,
  Bell,
  LogOut,
  Building,
  Settings,
  HelpCircle,
  FileText,
  ChevronDown,
  BarChart4,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function AgentSidebar() {
  const pathname = usePathname();
  const [propertiesOpen, setPropertiesOpen] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);
  const pendingNotifications = 3;

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
            Agent Portal
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <div className="mb-4 px-4 ">
          <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
            <Avatar className="h-10 w-10 border-2 border-primary">
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
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/agent/dashboard" passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={isActive("/agent")}
                    tooltip="Dashboard"
                  >
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/agent/overview" passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={isActive("/agent/overview")}
                    tooltip="Overview"
                  >
                    <BarChart4 />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <Collapsible
                open={propertiesOpen}
                onOpenChange={setPropertiesOpen}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Building />
                      <span>Properties</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <Link href="/agent/properties" passHref legacyBehavior>
                        <SidebarMenuSubButton
                          isActive={isActive("/agent/properties")}
                        >
                          My Properties
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
                        >
                          Add New Property
                        </SidebarMenuSubButton>
                      </Link>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <Link href="/agent/map" passHref legacyBehavior>
                        <SidebarMenuSubButton isActive={isActive("/agent/map")}>
                          Property Map
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
                    tooltip="Profile"
                  >
                    <User />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/agent/notifications" passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={isActive("/agent/notifications")}
                    tooltip="Notifications"
                  >
                    <Bell />
                    <span>Notifications</span>
                  </SidebarMenuButton>
                </Link>
                {pendingNotifications > 0 && (
                  <SidebarMenuBadge>{pendingNotifications}</SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut />
              <span>Logout</span>
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
    className={`mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5 group-data-[collapsible=icon]:hidden ${className}`}
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
