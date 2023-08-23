"use client";

import { useCustomToast } from "@/hooks/use-custom-toast";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

const ProfileContact = () => {
  const { dummyFeatureToast } = useCustomToast();

  return (
    <div className="flex flex-row-reverse sm:flex-row gap-x-2 items-center">
      <Button onClick={() => dummyFeatureToast()} variant="ghost" size="icon">
        <Icons.bookmark className="h-4 w-4" />
      </Button>
      <Button onClick={() => dummyFeatureToast()}>Contact</Button>
    </div>
  );
};

export default ProfileContact;
