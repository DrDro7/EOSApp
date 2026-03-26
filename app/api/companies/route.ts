import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

const createCompanySchema = z.object({
  name: z.string().min(1).max(100),
  logoUrl: z.string().url().optional(),
});

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const companies = await db.company.findMany({
      where: { userId: session.user.id },
      include: { _count: { select: { dashboards: true } } },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(companies);
  } catch (err) {
    console.error("GET /api/companies", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = createCompanySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const company = await db.company.create({
      data: { ...parsed.data, userId: session.user.id },
      include: { _count: { select: { dashboards: true } } },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (err) {
    console.error("POST /api/companies", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
