import type React from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

import "../globals.css";

import { SearchProvider } from "@/lib/search-context";
import { locales } from "@/next-intl.config";

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SearchProvider>
            <main className="grow shrink-0 overflow-y-auto">{children}</main>
          </SearchProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
