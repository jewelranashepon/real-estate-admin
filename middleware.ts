// import { NextResponse } from "next/server"
// import { auth } from "@/auth"

// export default auth((req) => {
//   const { nextUrl } = req
//   const isLoggedIn = !!req.auth?.user
//   const isAuthPage = nextUrl.pathname === "/login" || nextUrl.pathname === "/register"
//   const isAdminPage = nextUrl.pathname.startsWith("/admin")

//   // Redirect to login if trying to access admin pages without being logged in
//   if (isAdminPage && !isLoggedIn) {
//     return NextResponse.redirect(new URL("/login", nextUrl))
//   }

//   // Redirect to dashboard if already logged in and trying to access login page
//   if (isAuthPage && isLoggedIn) {
//     return NextResponse.redirect(new URL("/admin/dashboard", nextUrl))
//   }

//   return NextResponse.next()
// })

// // Ensure middleware runs on these paths
// export const config = {
//   matcher: ["/admin/:path*", "/login", "/register"],
// }



import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
