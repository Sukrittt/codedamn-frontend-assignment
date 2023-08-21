import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { personalDetailsServerFormSchema } from "@/lib/validators";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const formattedBody = {
      ...body,
      dateOfBirth: new Date(body.dateOfBirth),
    };

    const {
      name,
      about,
      image,
      gender,
      profession,
      showAchievementBadges,
      showFollowersAndFollowing,
      showXP,
      dateOfBirth,
    } = personalDetailsServerFormSchema.parse(formattedBody);

    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        about,
        image,
        gender,
        profession,
        dateOfBirth,
        showXP,
        showAchievementBadges,
        showFollowersAndFollowing,
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
