import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchSheetData, inferSheetFields } from "@/lib/integrations/google-sheets";
import { z } from "zod";

const connectSchema = z.object({
  name: z.string().min(1),
  spreadsheetId: z.string().min(1),
  sheetName: z.string().min(1),
  range: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Check Google integration exists
    const integration = await db.integration.findFirst({
      where: { userId: session.user.id, provider: "GOOGLE", isActive: true },
    });
    if (!integration?.accessToken) {
      return NextResponse.json(
        { error: "Google account not connected. Connect Google first." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = connectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { name, spreadsheetId, sheetName, range } = parsed.data;
    const fullRange = `${sheetName}!${range}`;

    // Fetch data and infer schema
    const [fields, rows] = await Promise.all([
      inferSheetFields(integration.accessToken, integration.refreshToken ?? undefined, spreadsheetId, fullRange),
      fetchSheetData(integration.accessToken, integration.refreshToken ?? undefined, spreadsheetId, fullRange),
    ]);

    const dataSource = await db.dataSource.create({
      data: {
        name,
        type: "GOOGLE_SHEETS",
        userId: session.user.id,
        connectionConfig: { spreadsheetId, sheetName, range },
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
    console.error("POST /api/data-sources/google-sheets", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
