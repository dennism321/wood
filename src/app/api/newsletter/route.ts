import { db } from "@/db";
import { subscribers } from "@/db/schema";

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: string };
    email = body.email?.trim().toLowerCase() ?? "";
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  if (!emailPattern.test(email)) {
    return Response.json({ ok: false, message: "Please use a valid email address." }, { status: 422 });
  }

  try {
    await db.insert(subscribers).values({ email: email.slice(0, 180) }).onConflictDoNothing();
    return Response.json({
      ok: true,
      message: "You are on the list — the next letter from the shop will find you.",
    });
  } catch (error) {
    console.error("[newsletter] insert failed", error);
    return Response.json(
      { ok: false, message: "Subscription failed. Please try again later." },
      { status: 500 },
    );
  }
}
