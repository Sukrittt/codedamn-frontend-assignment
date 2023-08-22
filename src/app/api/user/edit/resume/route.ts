import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { resumeFormSchemaServer } from "@/lib/validators/resume";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { interests, languages, lookingForJob, techSkills, bio, location } =
      resumeFormSchemaServer.parse(body);

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        interests,
        languages,
        lookingForJob,
        techSkills,
        bio,
        location,
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
