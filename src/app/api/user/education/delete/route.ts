import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { deleteEducationSchema } from "@/lib/validators/education";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { educationId } = deleteEducationSchema.parse(body);

    const existingEducation = await db.educations.findFirst({
      where: {
        id: educationId,
        userId: session.user.id,
      },
    });

    if (!existingEducation) {
      return new Response("Education not found.", {
        status: 404,
      });
    }

    await db.educations.delete({
      where: {
        id: educationId,
        userId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
