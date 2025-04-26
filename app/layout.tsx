import type { Metadata } from "next";
import { Toaster } from "../components/ui/sonner";
import "./globals.css";
import "@emran-alhaddad/saudi-riyal-font/index.css";
import { SearchProvider } from "@/lib/search-context";

export const metadata: Metadata = {
  title: "real-estate-app",
  description: "Real Estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ fontFamily: "saudi_riyal" }}>
      <body>
        <SearchProvider>{children}</SearchProvider>
        <Toaster />
      </body>
    </html>
  );
}
