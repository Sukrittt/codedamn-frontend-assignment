import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { deleteExperienceSchema } from "@/lib/validators/experience";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { experienceId } = deleteExperienceSchema.parse(body);

    const existingExperience = await db.experiences.findFirst({
      where: {
        id: experienceId,
        userId: session.user.id,
      },
    });

    if (!existingExperience) {
      return new Response("Experience not found.", {
        status: 404,
      });
    }

    await db.experiences.delete({
      where: {
        id: experienceId,
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
