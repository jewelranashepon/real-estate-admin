"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/language-switcher";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function AgentHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;
  const locale = useLocale();
  const t = useTranslations("headerdata");
  const isRtl = locale === "ar";

  return (
    <header
      className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b bg-background px-4 md:px-6"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SidebarTrigger className="md:hidden" />

      <div className="flex flex-1 items-center gap-4 md:gap-8">
        <div className="hidden md:block">
          <h1 className="text-xl font-semibold">{t("propertyManagement")}</h1>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t("toggleMenu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side={isRtl ? "right" : "left"}
            className="w-[300px] sm:w-[400px] pr-0"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage src="/image.jpg" alt="Agent" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{t("agentName")}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("agentTitle")}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 overflow-auto py-4">
                <div className="px-2 py-1">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    {t("mainMenu")}
                  </h2>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/dashboard">{t("dashboard")}</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/overview">{t("overview")}</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/properties">{t("properties")}</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/properties/add">
                        {t("addProperty")}
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/map">{t("propertyMap")}</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/profile">{t("profile")}</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                      asChild
                    >
                      <Link href="/agent/notifications">
                        {t("notifications")}
                        <Badge className="ml-auto">3</Badge>
                      </Link>
                    </Button>
                  </div>
                </div>

                <Separator className="my-4" />
                <div className="px-2 py-1">
                  <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    {t("support")}
                  </h2>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                    >
                      {t("helpResources")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                    >
                      {t("documentation")}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      size="sm"
                    >
                      {t("settings")}
                    </Button>
                  </div>
                </div>
              </nav>

              <div className="border-t pt-4">
                <Button variant="outline" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout")}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Search */}
        <div
          className={`relative flex-1 ${
            searchOpen ? "block" : "hidden md:block"
          } md:max-w-sm`}
        >
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchPlaceholder")}
            className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <LanguageSwitcher />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex bg-green-700 hover:bg-green-600 text-white"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t("help")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("userGuide")}</DropdownMenuItem>
              <DropdownMenuItem>{t("faqs")}</DropdownMenuItem>
              <DropdownMenuItem>{t("contactSupport")}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("reportIssue")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative bg-green-700 text-white font-extrabold"
              >
                <Bell className="h-7 w-7" />
                <Badge className="absolute bg-gray-600 text-white -right-1 -top-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                {t("notifications")}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-1 text-xs"
                >
                  {t("markAllRead")}
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                {/* Optional: Replace with t("notificationX") if you want to localize these too */}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="justify-center font-medium cursor-pointer"
                asChild
              >
                <Link href="/agent/notifications">
                  {t("viewAllNotifications")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ring-2 text-white">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/image.jpg" alt="Agent" />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "AG"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                {t("profile")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                {t("settings")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
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
                <LogOut className="mr-2 h-4 w-4" />
                {t("logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
