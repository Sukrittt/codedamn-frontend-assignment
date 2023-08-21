import { redirect } from "next/navigation";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { SearchBar } from "./search-bar";
import { getAuthSession } from "@/lib/auth";
import UserAvatar from "@/components/user-avatar";
import { UserDropdown } from "@/components/user-dropdown";

const Navbar = async () => {
  const session = await getAuthSession();

  if (!session) redirect("/sign-in");

  return (
    <div className="flex items-center justify-between px-8 py-6">
      <Link href="/profile">
        <Icons.logo className="h-6 w-6" />
      </Link>
      <div className="flex items-center gap-x-8">
        <SearchBar />
        <div className="flex gap-x-1">
          <Icons.thunderbolt className="h-5 w-5 text-primary" />
          <span className="font-bold text-muted-foreground text-sm">2</span>
        </div>
        <div className="relative">
          <Icons.notification className="h-5 w-5 text-muted-foreground" />
          <span className="font-bold bg-pink-400 py-.5 px-1 text-white rounded-full text-[10px] absolute -top-2 -right-1">
            1
          </span>
        </div>
        <UserDropdown>
          <UserAvatar user={session.user} className="h-8 w-8" />
        </UserDropdown>
      </div>
    </div>
  );
};

export default Navbar;
