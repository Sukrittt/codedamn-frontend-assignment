import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import SocialsForm from "@/components/forms/socials-form";

const EditSocials = async () => {
  const session = await getAuthSession();

  if (!session) redirect("/sign-in");

  const currentUser = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!currentUser) redirect("/sign-in");

  return <SocialsForm user={currentUser} />;
};

export default EditSocials;
