import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { experienceFormSchema } from "@/lib/validators/experience";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    let formattedBody = {};

    if (body.endDate) {
      formattedBody = {
        ...body,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
      };
    } else {
      formattedBody = {
        ...body,
        startDate: new Date(body.startDate),
      };
    }

    const { title, description, company, location, startDate, endDate } =
      experienceFormSchema.parse(formattedBody);

    if (endDate && endDate < startDate) {
      return new Response("End date must be after start date", { status: 400 });
    }

    await db.experiences.create({
      data: {
        userId: session.user.id,
        title,
        description,
        company,
        location,
        startDate,
        endDate,
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
