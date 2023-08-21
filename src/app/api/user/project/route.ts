import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { projectFormSchemaServer } from "@/lib/validators/project";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { image, link, skills, title } = projectFormSchemaServer.parse(body);

    const existingProject = await db.projects.findFirst({
      where: {
        userId: session.user.id,
        title,
      },
    });

    if (existingProject) {
      return new Response("Project with this title already exists", {
        status: 409,
      });
    }

    if (!image) {
      return new Response("Image is required", { status: 400 });
    }

    await db.projects.create({
      data: {
        userId: session.user.id,
        image,
        link,
        skills,
        title,
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
