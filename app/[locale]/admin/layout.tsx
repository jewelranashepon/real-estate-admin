// // app/[locale]/admin/layout.tsx

// import type React from "react";
// import type { Metadata } from "next";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import AdminSidebar from "@/components/admin/admin-sidebar";
// import AdminHeader from "@/components/admin/admin-header";
// import { NextIntlClientProvider } from "next-intl";
// import { notFound } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Real Estate Admin Panel",
//   description: "Admin panel for managing real estate properties",
// };

// export default async function AdminLayout({
//   children,
//   params: { locale },
// }: {
//   children: React.ReactNode;
//   params: { locale: string };
// }) {
//   let messages;
//   try {
//     messages = (await import(`../../../locale/${locale}.json`)).default;
//   } catch (error) {
//     notFound(); // Show 404 if locale file is missing
//   }

//   return (
//     <NextIntlClientProvider locale={locale} messages={messages}>
//       <SidebarProvider>
//         <div className="flex h-screen w-full bg-background overflow-hidden">
//           {/* Fixed Sidebar */}
//           <AdminSidebar />

//           {/* Right section: Header + Scrollable content */}
//           <div className="flex flex-col flex-1 h-full">
//             <AdminHeader />
//             <main className="flex-1 overflow-y-auto p-6">{children}</main>
//           </div>
//         </div>
//       </SidebarProvider>
//     </NextIntlClientProvider>
//   );
// }



// app/[locale]/admin/layout.tsx

import type React from "react";
import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Real Estate Admin Panel",
  description: "Admin panel for managing real estate properties",
};

export default async function AdminLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { children, params } = props;
  const locale = params.locale;

  let messages;
  try {
    messages = (await import(`../../../locale/${locale}.json`)).default;
  } catch (error) {
    notFound(); // Show 404 if locale file is missing
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SidebarProvider>
        <div className="flex h-screen w-full bg-background overflow-hidden">
          {/* Fixed Sidebar */}
          <AdminSidebar />

          {/* Right section: Header + Scrollable content */}
          <div className="flex flex-col flex-1 h-full">
            <AdminHeader />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </NextIntlClientProvider>
  );
}
