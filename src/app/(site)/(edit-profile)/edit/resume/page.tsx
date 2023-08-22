import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import EditResumeForm from "@/components/forms/edit-resume-form";

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
