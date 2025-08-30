import type React from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

import { SearchProvider } from "@/lib/search-context";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Locale layouts should not render <html> or <body> because
  // the root layout already renders them. Return only the inner tree.
  return (
    <NextIntlClientProvider>
      <SearchProvider>{children}</SearchProvider>
    </NextIntlClientProvider>
  );
}
