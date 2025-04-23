"use client";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import {
  Home,
  Heart,
  Search,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import {
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
import { useLocale, useTranslations } from "use-intl";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations();

  const menuItems = [
    {
      title: t("common.dashboard"),
      icon: Home,
      href: "/user/dashboard",
    },
    {
      title: t("common.savedProperties"),
      icon: Heart,
      href: "/user/dashboard/saved",
    },
    {
      title: t("common.userSearch"),
      icon: Search,
      href: "/user/dashboard/search",
    },
    {
      title: t("common.messages"),
      icon: MessageSquare,
      href: "/user/dashboard/messages",
    },
    {
      title: t("common.settings"),
      icon: Settings,
      href: "/user/dashboard/settings",
    },
  ];

  return (
    <div className="border-r h-screen grow flex flex-col w-64 rtl:order-1 shrink-0 border-border/40 bg-sidebar overflow-y-auto">
      <SidebarHeader className="h-16 shrink-0 flex items-center justify-center border-b">
        <div className="flex items-center gap-2">
          <div className="font-semibold text-xl">
            {t("common.userDashboard")}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-6 px-4">
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
      <SidebarFooter className="py-0 bg-zinc-800">
        <div className="flex items-center gap-3 px-2 py-3">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
            <AvatarImage src="https://avatar.iran.liara.run/public/boy" />
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
    </div>
  );
}
