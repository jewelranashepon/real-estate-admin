"use client";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  Home,
  Heart,
  Search,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/user/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/user/ui/avatar";
import { signOut, useSession } from "@/lib/auth-client";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/user/dashboard",
    },
    {
      title: "Saved Properties",
      icon: Heart,
      href: "/user/dashboard/saved",
    },
    {
      title: "Search",
      icon: Search,
      href: "/user/dashboard/search",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/user/dashboard/messages",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/user/dashboard/settings",
    },
  ];

  return (
    <Sidebar className="border-r border-border/40 bg-gradient-to-b from-emerald-950/15 via-emerald-950/10 to-emerald-950/15">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-md"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <div className="relative flex items-center justify-center h-full text-white font-bold">
              RE
            </div>
          </div>
          <div className="font-semibold text-lg">RealEstate</div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
                className={
                  pathname === item.href
                    ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 text-emerald-400"
                    : ""
                }
              >
                <Link href={item.href}>
                  <item.icon
                    className={pathname === item.href ? "text-emerald-400" : ""}
                  />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 px-2 py-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{session?.user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{}</p>
          </div>
          <button
            className="text-muted-foreground hover:text-foreground"
            onClick={() => {
              signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.refresh();
                  },
                },
              });
            }}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
