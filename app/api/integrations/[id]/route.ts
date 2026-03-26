import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const integration = await db.integration.findFirst({
      where: { id: params.id, userId: session.user.id },
    });
    if (!integration) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await db.integration.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/integrations/[id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
