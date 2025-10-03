// app/api/cms/route.ts
import { NextResponse } from "next/server";
import { put, head } from "@vercel/blob";

const PATH = "cms/bq.json"; // one JSON file for your whole config
export const dynamic = "force-dynamic"; // never cache this route

export async function GET() {
  try {
    const meta = await head(PATH); // check if the blob exists
    if (!meta) return NextResponse.json(null, { status: 200 });

    // meta.url is a public URL if we uploaded with access:"public"
    const json = await fetch(meta.url, { cache: "no-store" }).then((r) =>
      r.json()
    );
    return NextResponse.json(json, { status: 200 });
  } catch (e) {
    return NextResponse.json(null, { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // overwrite the file with your config; make it public so pages can read it fast
    await put(PATH, JSON.stringify(data), {
      contentType: "application/json",
      access: "public",
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Invalid JSON" },
      { status: 400 }
    );
  }
}
