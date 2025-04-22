// import type React from "react"
// import { NextIntlClientProvider } from "next-intl"
// import { notFound } from "next/navigation"
// import { getMessages } from "next-intl/server";



// import "../globals.css"


// export default async function MainLayout({
//   children,
//   params
// }: {
//   children: React.ReactNode;
//   params: Promise<{ locale: string }>;
// }) {
//   // Ensure that the incoming `locale` is valid
//   const { locale } = await params;
//   if (!locale.includes(locale as never)) {
//     notFound();
//   }

//   const messages = await getMessages();
//   return (
//     <div lang={locale}>
//       <NextIntlClientProvider messages={messages}>
       
//         <main className="grow shrink-0 overflow-y-auto">{children}</main>
//         {/* Footer */}
      
//       </NextIntlClientProvider>
//     </div>
//   );
// }




// import type React from "react";
// import { NextIntlClientProvider } from "next-intl";
// import { notFound } from "next/navigation";
// import { getMessages } from "next-intl/server";

// import "../globals.css";
// import { SearchProvider } from "@/lib/search-context"; // ✅ Import your provider
// import { locales } from "@/next-intl.config"; // ✅ Assuming this exports the list of supported locales

// export default async function MainLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { locale: string }; // ❌ No need for `Promise` here
// }) {
//   const { locale } = params;

//   // ✅ Ensure the incoming locale is supported
//   if (!locales.includes(locale)) {
//     notFound();
//   }

//   const messages = await getMessages({ locale });

//   return (
//     <html lang={locale}>
//       <body>
//         <NextIntlClientProvider locale={locale} messages={messages}>
//           <SearchProvider>
//             <main className="grow shrink-0 overflow-y-auto">{children}</main>
//             {/* Footer */}
//           </SearchProvider>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }


// import type React from "react";
// import { NextIntlClientProvider } from "next-intl";
// import { notFound } from "next/navigation";
// import { getMessages } from "next-intl/server";

// import "../globals.css";

// import { SearchProvider } from "@/lib/search-context";
// import { locales } from "@/next-intl.config";

// export default async function MainLayout(props: {
//   children: React.ReactNode;

//   params: { locale: string };
// }) {
//   const locale = props.params.locale; // ✅ Safe access inside body

 
//   if (!locales.includes(locale)) {
//     notFound();
//   }

//   const messages = await getMessages({ locale });

//   return (
//     <html lang={locale}>
//       <body>
//         <NextIntlClientProvider locale={locale} messages={messages}>
//           <SearchProvider>
//             <main className="grow shrink-0 overflow-y-auto">{props.children}</main>
//           </SearchProvider>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }




import type React from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

import "../globals.css";

import { SearchProvider } from "@/lib/search-context";
import { locales } from "@/next-intl.config";
import { getSession } from "@/lib/getSession";
import { redirect } from "@/i18n/navigation";

export default async function MainLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { children, params } = props;
  const locale = params.locale; // ✅ now safely inside the body

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  
    // const session = await getSession();
    // const role = session?.user?.role;
  
    // if (role === "admin") {
    //   redirect({ href: "/admin", locale });
    // }
  
    // if (role === "agent") {
    //   redirect({ href: "/agent/dashboard", locale });
    // }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SearchProvider>
            <main className="grow shrink-0 overflow-y-auto">
              {children}
            </main>
          </SearchProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
