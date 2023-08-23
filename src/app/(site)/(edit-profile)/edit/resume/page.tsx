import { redirect } from "next/navigation";
import { Metadata } from "next";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import EditResumeForm from "@/components/forms/edit-resume-form";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Craft and refine your professional profile effortlessly. Tailor your bio, location, technical skills, interests, and languages using our intuitive editing interface. Ensure your resume showcases your strengths accurately and stays current.",
};

const ResumePage = async () => {
  const session = await getAuthSession();

  if (!session) redirect("/sign-in");

  const currentUser = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!currentUser) redirect("/sign-in");

  return <EditResumeForm user={currentUser} />;
};

export default ResumePage;
