import { db } from "@/db";
import { messages } from "@/db/schema";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const [saved] = await db
    .insert(messages)
    .values({ name: name.trim(), email: email.trim(), message: message.trim() })
    .returning();

  return Response.json(saved, { status: 201 });
}
