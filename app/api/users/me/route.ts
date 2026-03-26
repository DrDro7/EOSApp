import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const updateUserSchema = z.object({
  onboardingComplete: z.boolean().optional(),
  name: z.string().min(1).max(100).optional(),
});

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await db.user.update({
      where: { id: session.user.id },
      data: parsed.data,
    });

    return NextResponse.json({ id: updated.id, onboardingComplete: updated.onboardingComplete });
  } catch (err) {
    console.error("PATCH /api/users/me", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
