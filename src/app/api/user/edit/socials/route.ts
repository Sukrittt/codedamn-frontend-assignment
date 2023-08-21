import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { socialsFormSchema } from "@/lib/validators/socials";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const {
      behanceUrl,
      dribbbleUrl,
      facebookUrl,
      githubUrl,
      instagramUrl,
      linkedInUrl,
    } = socialsFormSchema.parse(body);

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        behanceUrl,
        dribbbleUrl,
        facebookUrl,
        githubUrl,
        instagramUrl,
        linkedInUrl,
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
