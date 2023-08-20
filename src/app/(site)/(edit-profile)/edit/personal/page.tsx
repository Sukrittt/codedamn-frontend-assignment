import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import PersonalDetailsForm from "@/components/forms/personal-details-form";
import { db } from "@/lib/db";

const PersonalDetailsPage = async () => {
  const session = await getAuthSession();

  if (!session) redirect("/sign-in");

  const currentUser = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!currentUser) redirect("/sign-in");

  return <PersonalDetailsForm user={currentUser} />;
};

export default PersonalDetailsPage;
