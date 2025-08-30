"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();
  const t = useTranslations();

  // Set initial direction based on current locale
  useEffect(() => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale as string;
  }, [locale]);

  const switchLanguage = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
    // The useEffect will handle the direction change after the locale changes
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-green-700 hover:bg-green-600 text-white hover:text-white"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => switchLanguage("en")}
          className={
            (locale === "en"
              ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 "
              : "") +
            "cursor-pointer focus:bg-green-100 focus:text-green-700"
          }
        >
          {locale === "en" ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <span className="mr-6" />
          )}
          <span className={locale === "en" ? "font-semibold" : ""}>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLanguage("ar")}
          className={
            (locale === "ar"
              ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 "
              : "") +
            "cursor-pointer focus:bg-green-100 focus:text-green-700"
          }
        >
          {locale === "ar" ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <span className="mr-6" />
          )}
          <span className={locale === "ar" ? "font-semibold" : ""}>العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
