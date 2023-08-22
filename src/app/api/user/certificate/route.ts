import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { certificateFormSchema } from "@/lib/validators/certificates";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const formattedBody = { ...body, issuedOn: new Date(body.issuedOn) };

    const { title, credentialLink, issuedOn } =
      certificateFormSchema.parse(formattedBody);

    const existingCertificate = await db.certificates.findFirst({
      where: {
        userId: session.user.id,
        title,
      },
    });

    if (existingCertificate) {
      return new Response("Certificate with this title already exists", {
        status: 409,
      });
    }

    await db.certificates.create({
      data: {
        userId: session.user.id,
        credentialLink,
        issuedOn,
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
