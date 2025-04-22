import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getSession } from "./lib/getSession";

// Setup i18n middleware
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Run BetterAuth check for protected admin route
  if (pathname.startsWith("/admin")) {
    const session = await getSession();

    const role = session?.user?.role;
    const locale = request.nextUrl.pathname.split("/")[1] || "en";

    // If not logged in or not admin, redirect based on role
    if (!session || role !== "admin") {
      let destination = `/${locale}`;
      if (role === "user") {
        destination = `/${locale}/user/dashboard`;
      } else if (role === "agent") {
        destination = `/${locale}/agent/dashboard`;
      }

      return NextResponse.redirect(new URL(destination, request.url));
    }
  }

  // Fall back to default next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|api|_vercel|favicon.ico).*)"], // Match everything except internal paths
};
