"use client";

import { Bell, Search, Settings, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "@/i18n/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import LanguageSwitcher from "../language-switcher";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function AdminHeader() {
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;
  const { locale } = useParams();
  const t = useTranslations("adminNotification");
  const isRtl = locale === "ar";

  return (
    <header
      className="sticky top-0 z-30 flex shrink-0 h-16 items-center gap-4 border-b bg-background px-6 shadow-sm"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SidebarTrigger className="md:hidden" />

      {/* Search bar */}
      <div className="relative hidden md:flex md:w-64">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("searchPlaceholder")}
          className="w-full pl-10 rounded-md border bg-muted text-sm"
        />
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-4">
        <LanguageSwitcher />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>{t("notifications.title")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-auto">
              {t.raw("notifications.items").map((item: any, index: number) => (
                <DropdownMenuItem
                  key={index}
                  className="flex flex-col items-start gap-1 p-3"
                >
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.desc}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {item.time}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/image.jpg" alt="Admin" />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{t("account.title")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              {t("account.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              {t("account.settings")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/");
                      router.refresh();
                    },
                  },
                });
              }}
            >
              {t("account.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
