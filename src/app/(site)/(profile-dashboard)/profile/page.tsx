import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import UserAvatar from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const ProfilePage = async () => {
  const session = await getAuthSession();

  if (!session) redirect("/sign-in");

  return (
    <div className="m-12 pb-12 lg:mx-28 border rounded-tl-xl rounded-tr-xl overflow-hidden">
      <div className="h-[250px] bg-gradient-to-r from-blue-500 via-sky-500 to-blue-700 to-90% relative">
        <Button
          variant="link"
          className="absolute right-2 top-2 text-white text-sm"
        >
          Edit cover <Icons.edit className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-x-2 mx-8">
        <UserAvatar
          user={session.user}
          className="h-44 w-44 -mt-[88px] border-[3px] border-white"
        />
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-neutral-800">
            {session.user.name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
