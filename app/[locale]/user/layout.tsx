import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/getSession";
import UserHeader from "@/components/user/header";
import UserSidebar from "@/components/user/sidebar";

const UserDashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
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
    <div className="flex flex-col w-full">
      <UserHeader />

      <div className="flex">
        <UserSidebar />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
