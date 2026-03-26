import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { uploadToS3 } from "@/lib/s3";
import { parseCsv, inferCsvFields } from "@/lib/integrations/csv";
import { randomUUID } from "crypto";

/**
 * Accepts a multipart CSV upload, stores it in S3, and creates a DataSource + Dataset.
 */
export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const name = formData.get("name") as string | null;

    if (!file || !name) {
      return NextResponse.json({ error: "file and name are required" }, { status: 400 });
    }

    if (!file.name.endsWith(".csv")) {
      return NextResponse.json({ error: "Only CSV files are accepted" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const csvString = buffer.toString("utf-8");

    // Parse to infer fields
    const rows = parseCsv(csvString);
    const fields = inferCsvFields(rows);

    // Upload to S3
    const s3Key = `csv/${session.user.id}/${randomUUID()}.csv`;
    await uploadToS3(s3Key, buffer, "text/csv");

    // Create DataSource + Dataset in DB
    const dataSource = await db.dataSource.create({
      data: {
        name: name.trim(),
        type: "CSV",
        userId: session.user.id,
        connectionConfig: {
          s3Key,
          originalFileName: file.name,
          rowCount: rows.length,
        },
        lastSyncedAt: new Date(),
        datasets: {
          create: {
            name: name.trim(),
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
    console.error("POST /api/integrations/csv/upload", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
