import { redirect } from "next/navigation";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { SearchBar } from "./search-bar";
import { getAuthSession } from "@/lib/auth";
import UserAvatar from "@/components/user-avatar";
import { UserDropdown } from "@/components/user-dropdown";
import { Notifications, Streaks } from "@/components/dummy-features";

const Navbar = async () => {
  const session = await getAuthSession();

  if (!session) redirect("/sign-in");

  return (
    <div className="flex items-center justify-between px-8 py-6">
      <Link href="/profile">
        <Icons.logo className="h-16 w-28 sm:w-44" />
      </Link>
      <div className="flex items-center gap-x-4 sm:gap-x-8">
        <SearchBar />
        <Streaks />
        <Notifications />
        <UserDropdown>
          <UserAvatar user={session.user} className="h-8 w-8 cursor-pointer" />
        </UserDropdown>
      </div>
    </div>
  );
};

export default Navbar;
