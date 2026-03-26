import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";
import Stripe from "stripe";

const connectSchema = z.object({
  secretKey: z.string().startsWith("sk_"),
});

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = connectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid Stripe secret key" }, { status: 400 });
    }

    // Verify the key works
    const stripe = new Stripe(parsed.data.secretKey, { apiVersion: "2024-06-20" });
    try {
      await stripe.balance.retrieve();
    } catch {
      return NextResponse.json(
        { error: "Invalid Stripe API key — could not authenticate" },
        { status: 400 }
      );
    }

    const integration = await db.integration.upsert({
      where: { userId_provider: { userId: session.user.id, provider: "STRIPE" } },
      update: { accessToken: parsed.data.secretKey, isActive: true },
      create: {
        userId: session.user.id,
        provider: "STRIPE",
        accessToken: parsed.data.secretKey,
        isActive: true,
      },
    });

    await db.dataSource.upsert({
      where: { id: `stripe-${session.user.id}` },
      update: { connectionConfig: { integrationId: integration.id }, lastSyncedAt: new Date() },
      create: {
        id: `stripe-${session.user.id}`,
        name: "Stripe",
        type: "STRIPE",
        userId: session.user.id,
        connectionConfig: { integrationId: integration.id },
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/integrations/stripe/connect", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
