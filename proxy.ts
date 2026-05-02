import { type NextRequest } from "next/server";
import { updateSession } from "@/packages/supabase/src/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - privacy-policy (privacy policy page)
     * - terms-of-service (terms of service page)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|privacy-policy|terms-of-service|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)",
  ],
};
