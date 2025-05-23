import type React from "react";
import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";
import { getSession } from "@/lib/getSession";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Real Estate Admin Panel",
  description: "Admin panel for managing real estate properties",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  const session = await getSession();
  const role = session?.user?.role;

  if (!session) {
    redirect({ href: "/sign-in", locale });
  }

  if ((role !== "admin" || "support") && role === "user") {
    redirect({ href: "/user/dashboard", locale });
  }

  if ((role !== "admin" || "support") && role === "agent") {
    redirect({ href: "/agent/dashboard", locale });
  }

  return (
    <SidebarProvider>
      <div className="flex fixed size-full bg-background">
        <AdminSidebar />
        <div className="flex w-full flex-col overflow-hidden">
          <AdminHeader />
          <main className="grow overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
