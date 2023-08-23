"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserDropdown = ({ children }: { children: ReactNode }) => {
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
      <DropdownMenuContent align="end" className="w-[200px]">
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
