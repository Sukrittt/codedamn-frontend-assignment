import { z } from "zod";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { deleteCertificateSchema } from "@/lib/validators/certificates";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { certificateId } = deleteCertificateSchema.parse(body);

    const existingCertificate = await db.certificates.findFirst({
      where: {
        id: certificateId,
        userId: session.user.id,
      },
    });

    if (!existingCertificate) {
      return new Response("Certificate not found.", {
        status: 404,
      });
    }

    await db.certificates.delete({
      where: {
        id: certificateId,
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
