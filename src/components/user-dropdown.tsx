"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User } from "next-auth";

import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserDropdown = ({
  children,
  user,
}: {
  children: ReactNode;
  user: Pick<User, "email" | "name">;
}) => {
  const dropdownLinks = [
    {
      id: 1,
      label: "Profile",
      href: "/profile",
      icon: <Icons.user className="h-4 w-4" />,
    },
    {
      id: 2,
      label: "About",
      href: "/about",
      icon: <Icons.about className="h-4 w-4" />,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2 text-sm">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {dropdownLinks.map((link) => (
          <DropdownMenuItem asChild key={link.id} className="cursor-pointer">
            <Link href={link.href}>
              <div className="flex items-center gap-x-2">
                {link.icon}
                {link.label}
              </div>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => {
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-x-2">
            <Icons.logout className="h-4 w-4" />
            Log out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
