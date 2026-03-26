import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { testCustomApiConnection } from "@/lib/integrations/custom-api";
import { z } from "zod";

const testSchema = z.object({
  url: z.string().url(),
  method: z.enum(["GET", "POST"]).optional(),
  headers: z.record(z.string()).optional(),
  body: z.string().optional(),
  responseDataPath: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = testSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const result = await testCustomApiConnection(parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    console.error("POST /api/integrations/custom-api/test", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
