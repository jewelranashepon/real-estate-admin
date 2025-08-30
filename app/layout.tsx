import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import { Toaster } from "../components/ui/sonner";
import "./globals.css";
import { SearchProvider } from "@/lib/search-context";
import { cn } from "@/lib/utils";
import { getLocale } from "next-intl/server";
import { getLangDir } from "rtl-detect";

export const metadata: Metadata = {
  title: "real-estate-app",
  description: "Real Estate",
};

// English
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// Arabic
const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const direction = getLangDir(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body
        className={cn("antialiased", {
          [inter.className]: locale === "en",
          [amiri.className]: locale === "ar",
        })}
      >
        <SearchProvider>{children}</SearchProvider>
        <Toaster />
      </body>
    </html>
  );
}
