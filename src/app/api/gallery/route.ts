import { getGalleryItems } from "@/lib/gallery-server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const visitorId = new URL(request.url).searchParams.get("visitorId")?.slice(0, 64) ?? undefined;
  const items = await getGalleryItems(visitorId);
  return Response.json({ ok: true, items });
}
