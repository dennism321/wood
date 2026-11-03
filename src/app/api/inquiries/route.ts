import { db } from "@/db";
import { inquiries } from "@/db/schema";

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  town?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  source?: string;
};

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return Response.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (name.length < 2) {
    return Response.json({ ok: false, message: "Please share your name." }, { status: 422 });
  }
  if (!emailPattern.test(email)) {
    return Response.json({ ok: false, message: "Please use a valid email address." }, { status: 422 });
  }
  if (message.length < 12) {
    return Response.json(
      { ok: false, message: "A little more detail helps us reply properly (12+ characters)." },
      { status: 422 },
    );
  }

  try {
    const [row] = await db
      .insert(inquiries)
      .values({
        name: name.slice(0, 120),
        email: email.slice(0, 180),
        phone: payload.phone?.trim().slice(0, 40) || null,
        town: payload.town?.trim().slice(0, 120) || null,
        projectType: (payload.projectType?.trim() || "General enquiry").slice(0, 80),
        budget: payload.budget?.trim().slice(0, 60) || null,
        timeline: payload.timeline?.trim().slice(0, 60) || null,
        message: message.slice(0, 4000),
        source: (payload.source?.trim() || "website").slice(0, 60),
      })
      .returning({ id: inquiries.id });

    const reference = `SW-${new Date().getFullYear()}-${String(row?.id ?? 1).padStart(4, "0")}`;
    return Response.json({ ok: true, reference }, { status: 201 });
  } catch (error) {
    console.error("[inquiries] insert failed", error);
    return Response.json(
      { ok: false, message: "We could not save that just now. Please call 860-379-9837." },
      { status: 500 },
    );
  }
}
