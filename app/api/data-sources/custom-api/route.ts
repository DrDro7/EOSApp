import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchCustomApiData } from "@/lib/integrations/custom-api";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  method: z.enum(["GET", "POST"]).optional().default("GET"),
  headers: z.record(z.string()).optional().default({}),
  body: z.string().optional(),
  responseDataPath: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { name, ...config } = parsed.data;

    // Fetch data to infer field schema
    const rows = await fetchCustomApiData(config);
    const fields =
      rows.length > 0 && typeof rows[0] === "object" && rows[0] !== null
        ? Object.keys(rows[0] as object).map((key) => ({
            name: key,
            type: "string",
          }))
        : [];

    const dataSource = await db.dataSource.create({
      data: {
        name,
        type: "CUSTOM_API",
        userId: session.user.id,
        connectionConfig: config as object,
        lastSyncedAt: new Date(),
        datasets: {
          create: {
            name,
            fields: fields as object[],
            rawData: rows as object[],
            lastSyncedAt: new Date(),
          },
        },
      },
      include: { datasets: true },
    });

    return NextResponse.json(dataSource, { status: 201 });
  } catch (err) {
    console.error("POST /api/data-sources/custom-api", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
