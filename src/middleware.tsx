import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.split("/")[1] !== "auth" && !request.cookies.has("edmin_login")) return NextResponse.redirect(new URL("/auth/login", request.url));
  if (path.split("/")[1] === "auth" && request.cookies.has("edmin_login")) return NextResponse.redirect(new URL(`/dashboard/default`, request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

