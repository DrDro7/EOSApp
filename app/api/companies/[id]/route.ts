import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

const updateCompanySchema = z.object({
  name: z.string().min(1).max(100).optional(),
  logoUrl: z.string().url().optional().nullable(),
});

async function getOwnedCompany(id: string, userId: string) {
  return db.company.findFirst({ where: { id, userId } });
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const company = await getOwnedCompany(params.id, session.user.id);
    if (!company) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(company);
  } catch (err) {
    console.error("GET /api/companies/[id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const existing = await getOwnedCompany(params.id, session.user.id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const body = await req.json();
    const parsed = updateCompanySchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const updated = await db.company.update({ where: { id: params.id }, data: parsed.data });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/companies/[id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const existing = await getOwnedCompany(params.id, session.user.id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await db.company.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/companies/[id]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
