import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/getSession";
import { SidebarProvider } from "@/components/user/ui/sidebar";
import { AppSidebar } from "@/components/user/app-sidebar";

export default async function UserDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getSession();
  const role = session?.user?.role;

  if (!session) {
    redirect({ href: "/", locale });
  }

  if (role === "admin" || role === "support") {
    redirect({ href: "/admin", locale });
  }

  if (role === "agent") {
    redirect({ href: "/agent/dashboard", locale });
  }

  return (
    <SidebarProvider>
      <div className="dark relative min-h-screen bg-gradient-to-br from-background/90 text-white to-background">
        <div className="relative flex min-h-screen">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
