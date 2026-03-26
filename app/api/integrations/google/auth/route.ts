import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { getGoogleAuthUrl } from "@/lib/integrations/google-sheets";

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL("/sign-in", process.env.NEXT_PUBLIC_APP_URL));
  }

  const url = getGoogleAuthUrl();
  return NextResponse.redirect(url);
}
