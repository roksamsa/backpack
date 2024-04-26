import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserData } from "./src/services/user-service";

export async function middleware(request: NextRequest) {
  const user = await getUserData();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/app/dashboard") && !user.ok) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    currentPath.startsWith("/register") ||
    (currentPath.startsWith("/login") && user.ok)
  ) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }

  return NextResponse.next();
}
