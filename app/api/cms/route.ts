// app/api/cms/route.ts
import { NextRequest } from "next/server";
import { put, list } from "@vercel/blob";

const KEY = "cms.json";
export const runtime = "nodejs";

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export async function GET() {
  try {
    // Find our file by pathname
    const { blobs } = await list();
    const hit = blobs.find((b) => b.pathname === KEY);

    if (!hit) {
      // nothing saved yet → return empty so app can fall back to defaults
      return jsonResponse({}, 200);
    }

    // Read the JSON from its public URL
    const res = await fetch(hit.url, { cache: "no-store" });
    const text = await res.text();

    return new Response(text, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("GET /api/cms error:", err);
    // Don’t crash the site; return empty and let pages use DEFAULTS
    return jsonResponse({}, 200);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const json = JSON.stringify(body ?? {}, null, 2);

    await put(KEY, json, {
      contentType: "application/json",
      addRandomSuffix: false,
      access: "public",
    });

    return jsonResponse({ ok: true }, 200);
  } catch (err: any) {
    const message =
      err?.message ||
      err?.toString?.() ||
      "Unknown error writing to Vercel Blob";
    console.error("POST /api/cms error:", message);
    return jsonResponse({ ok: false, error: message }, 500);
  }
}
