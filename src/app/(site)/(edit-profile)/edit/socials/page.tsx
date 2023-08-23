import { redirect } from "next/navigation";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import SocialsForm from "@/components/forms/socials-form";

export const metadata: Metadata = {
  title: "Socials",
  description:
    "Connect your online presence seamlessly. Add, update, or remove social links such as GitHub, LinkedIn, Behance, Facebook, Instagram, and Dribbble. Strengthen your digital footprint and provide a comprehensive view of your professional identity.",
};

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
