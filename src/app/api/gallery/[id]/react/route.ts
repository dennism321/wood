import { reactToPost } from "@/lib/gallery-server";

const visitorPattern = /^[A-Za-z0-9-]{6,64}$/;

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const postId = Number.parseInt(id, 10);
  if (!Number.isFinite(postId) || postId <= 0) {
    return Response.json({ ok: false, message: "Unknown photo." }, { status: 400 });
  }

  let body: { visitorId?: string; kind?: string; active?: boolean };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const visitorId = body.visitorId?.trim() ?? "";
  const kind = body.kind === "save" ? "save" : "like";
  const active = Boolean(body.active);

  if (!visitorPattern.test(visitorId)) {
    return Response.json({ ok: false, message: "Missing visitor id." }, { status: 422 });
  }

  try {
    const result = await reactToPost({ postId, visitorId, kind, active });
    return Response.json({ ok: true, ...result });
  } catch (error) {
    console.error("[gallery] reaction failed", error);
    return Response.json({ ok: false, message: "Could not save that reaction." }, { status: 500 });
  }
}
