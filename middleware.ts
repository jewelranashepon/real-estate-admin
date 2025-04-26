import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const session = getSessionCookie(request);

  const { pathname } = request.nextUrl;

  // Remove locale prefix for clean matching
  const localePattern = new RegExp(
    `^/(${routing.locales.join("|")})(/|$)`,
    "i"
  );
  const strippedPathname = pathname.replace(localePattern, "/");

  const authRoutes = ["/sign-in", "/sign-up"];
  const protectedRoutePrefixes = ["/user/", "/agent/", "/admin/"];

  const isAuthRoute = authRoutes.includes(strippedPathname);
  const isProtectedRoute =
    ["/user", "/agent", "/admin"].includes(strippedPathname) ||
    protectedRoutePrefixes.some((prefix) =>
      strippedPathname.startsWith(prefix)
    );

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
