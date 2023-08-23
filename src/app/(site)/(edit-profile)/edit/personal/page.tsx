import { redirect } from "next/navigation";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import PersonalDetailsForm from "@/components/forms/personal-details-form";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Personal Details",
  description:
    "Manage and update your personal details with ease. Keep your information accurate and up-to-date using our user-friendly editing interface, ensuring your profile remains current.",
};

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
