import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/getSession";
import { SidebarProvider } from "@/components/user/ui/sidebar";
import { AppSidebar } from "@/components/user/app-sidebar";
import { getLocale } from "next-intl/server";
import LanguageSwitcher from "@/components/language-switcher";

export default async function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
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
    <SidebarProvider defaultOpen={true}>
      <div className="dark bg-gradient-to-br from-background/90 text-white to-background fixed flex size-full">
        <AppSidebar />
        <div className="flex rtl:order-2 flex-col w-full overflow-hidden">
          <header className="px-6 shrink-0 h-16 bg-sidebar flex items-center justify-end border-b sticky top-0 w-full">
            <LanguageSwitcher />
          </header>
          <main className="overflow-y-auto grow">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
