import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const authPath = path === "/login" || path === "/signup";

  console.log(path);

  const token = request.cookies.get("USER_TOKEN")?.value || "";

  console.log(token);

  if (authPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (path === "/create" && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/profile", "/create"],
};
