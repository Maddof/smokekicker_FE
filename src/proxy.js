import { NextResponse } from "next/server";
import { fetchSession } from "./lib/utils/auth/authDAL";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // 4) Protected routes logic
  const protectedRoutes = ["/dashboard"];
  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    const session = await fetchSession();
    if (!session) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

// Define the matcher for the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    // Explicitly include specific API routes
    // "/api/checkout-sessions/create/:path*",
  ],
};
