import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/getSession";

const UserDashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const locale = params.locale;

  const session = await getSession();
  const role = session?.user?.role;

  if(!session){
    redirect({ href: "/", locale });
  }

  if (role === "admin") {
    redirect({ href: "/admin", locale });
  }

  if (role === "agent") {
    redirect({ href: "/agent/dashboard", locale });
  }

  return children;
};

export default UserDashboardLayout;
