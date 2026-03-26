import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { exchangeGoogleCode } from "@/lib/integrations/google-sheets";

export async function GET(req: Request) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.redirect(`${appUrl}/sign-in`);

    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error || !code) {
      return NextResponse.redirect(`${appUrl}/integrations?error=google_auth_denied`);
    }

    const { accessToken, refreshToken, expiresAt } = await exchangeGoogleCode(code);

    await db.integration.upsert({
      where: { userId_provider: { userId: session.user.id, provider: "GOOGLE" } },
      update: { accessToken, refreshToken, expiresAt, isActive: true },
      create: {
        userId: session.user.id,
        provider: "GOOGLE",
        accessToken,
        refreshToken,
        expiresAt,
        isActive: true,
      },
    });

    return NextResponse.redirect(`${appUrl}/integrations?success=google_connected`);
  } catch (err) {
    console.error("GET /api/integrations/google/callback", err);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    return NextResponse.redirect(`${appUrl}/integrations?error=google_auth_failed`);
  }
}
