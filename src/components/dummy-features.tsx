"use client";

import { Icons } from "@/components/icons";
import { useCustomToast } from "@/hooks/use-custom-toast";

export const Notifications = () => {
  const { dummyFeatureToast } = useCustomToast();

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => dummyFeatureToast()}
    >
      <Icons.notification className="h-5 w-5 text-muted-foreground" />
      <span className="font-bold bg-pink-400 py-.5 px-1 text-white rounded-full text-[10px] absolute -top-2 -right-1">
        1
      </span>
    </div>
  );
};

export const Streaks = () => {
  const { dummyFeatureToast } = useCustomToast();

  return (
    <div
      className="flex gap-x-1 cursor-pointer"
      onClick={() => dummyFeatureToast()}
    >
      <Icons.thunderbolt className="h-5 w-5 text-primary" />
      <span className="font-bold text-muted-foreground text-sm">2</span>
    </div>
  );
};
