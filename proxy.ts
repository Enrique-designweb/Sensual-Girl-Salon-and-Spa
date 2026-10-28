import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  
  if (isAdminRoute) {
    // 1. Verificamos si hay sesión de NextAuth (Google)
    const isNextAuthLoggedIn = !!req.auth;
    
    // 2. Verificamos si hay sesión manual (Cookie que creamos en el login)
    const hasManualSession = !!req.cookies.get("session")?.value;

    // Si no tiene ninguna de las dos, lo mandamos al login
    if (!isNextAuthLoggedIn && !hasManualSession) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
