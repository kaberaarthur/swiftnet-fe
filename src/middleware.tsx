import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken"); // Check for accessToken cookie

  // Exclusions: Allow these routes without authentication
  if (
    path.startsWith("/authentication/acustomer") ||
    path.startsWith("/acau")
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!accessToken && !path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect authenticated users away from auth pages to dashboard
  if (accessToken && path.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard/default", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/authentication/(.*)",
    "/acau/(.*)",
    "/backend/(.*)",
    "/assets/(.*)",
  ],
};
