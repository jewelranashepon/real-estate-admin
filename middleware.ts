import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getSessionCookie } from "better-auth/cookies";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const session = getSessionCookie(request);

  const { pathname } = request.nextUrl;

  /**
   * Trailing slash is important in the route prefix.
   * Prefix is defined to avoid manually declaring routes.
   * RoutePrefix type ensures that the correct route prefix is used, preventing unintended access.
   */
  type RoutePrefix = `/${string}/`;
  const authRoutePrefix: RoutePrefix[] = ["/auth/"];
  const protectedRoutePrefix: RoutePrefix[] = ["/user/", "/agent/", "/admin/"];

  // Auth routes (e.g., /auth/login)
  const isAuthRoute =
    pathname == "/auth" ||
    authRoutePrefix.some((prefix) => pathname.startsWith(prefix));

  // Protected routes (e.g., /dashboard/settings)
  const isProtectedRoute =
    pathname == "/user" || pathname == "/agent" || pathname == "/admin";
  protectedRoutePrefix.some((prefix) => pathname.startsWith(prefix));

  /**
   * If not authenticated don't allow /dashboard pages
   * Redirect to /auth/sign-in
   */
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  /**
   * If authenticated don't allow /auth pages
   * Redirect to /dashboard
   */
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
