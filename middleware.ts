export { default } from "next-auth/middleware";

/**
 * Protect all app routes. The NextAuth middleware redirects unauthenticated
 * requests to the sign-in page (configured via authOptions.pages.signIn).
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/integrations/:path*",
    "/knowledge/:path*",
    "/settings/:path*",
    "/onboarding/:path*",
  ],
};
