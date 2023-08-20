"use client";
import { usePathname } from "next/navigation";

import { sidebarItems } from "@/config";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export const EditSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col gap-2 bg-neutral-100 border rounded-xl py-3">
      {sidebarItems.map((item) => (
        <div key={item.id} className="focus:outline-none group">
          <span
            className={cn(
              "relative group flex w-full items-center rounded-md border border-transparent px-2 py-1 group-focus:bg-muted group-focus:text-foreground group-focus:font-medium transition-all pointer-events-none",
              pathname === item.href
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
          >
            <div
              className={cn(
                "w-1 h-full absolute left-0 rounded-tr-xl rounded-br-xl bg-neutral-800 hidden",
                {
                  block: pathname === item.href,
                }
              )}
            />
            <div className="ml-2 flex gap-x-2 items-center">
              <Icons.chrome className="h-4 w-4" aria-hidden="true" />
              <span className="tracking-tight text-sm">{item.label}</span>
            </div>
          </span>
        </div>
      ))}
    </div>
  );
};
