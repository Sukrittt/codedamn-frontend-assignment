"use client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCustomToast } from "@/hooks/use-custom-toast";

const PlayGrounds = () => {
  const { dummyFeatureToast } = useCustomToast();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl tracking-tight">Playgrounds</h1>
        <Button
          variant="secondary"
          className="tracking-tight font-medium bg-transparent"
          onClick={() => dummyFeatureToast()}
        >
          Create new playground
        </Button>
      </div>
      <PlaygroundDisplay />
    </div>
  );
};

export default PlayGrounds;

const PlaygroundDisplay = () => {
  const dummyPlaygrounds = [
    {
      id: 1,
      title: "Learning HTML & CSS",
      tech: "HTML/CSS",
      sharedUsers: ["Adam", "Julie"],
    },
    {
      id: 2,
      title: "React Playground",
      tech: "React",
      sharedUsers: ["Jonathan", "Bill"],
    },
    {
      id: 3,
      title: "CSS Battle",
      tech: "CSS",
      sharedUsers: ["Josh", "Theo"],
    },
    {
      id: 4,
      title: "Typescript Playground",
      tech: "Typescript",
      sharedUsers: ["Matt", "Sukrit"],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {dummyPlaygrounds.map((playground, index) => (
        <div
          key={playground.id}
          className="bg-neutral-100 border rounded-xl p-4 flex flex-col gap-y-2"
        >
          <h1 className="text-lg text-neutral-800 tracking-tight font-semibold">
            {playground.title}
          </h1>
          <div className="flex gap-x-2 items-center text-muted-foreground">
            <span>{playground.tech}</span>
            <span>•</span>
            <span>{(index + 1) * 3} min ago</span>
          </div>

          <div className="flex gap-x-2 items-center text-sm">
            <div className="flex">
              <div className="h-5 w-5 relative">
                <Image
                  src="/images/user1.avif"
                  alt="User Avatar"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-full object-cover"
                  fill
                />
              </div>
              <div className="h-5 w-5 relative">
                <Image
                  src="/images/user2.avif"
                  alt="User Avatar"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-full object-cover -ml-1"
                  fill
                />
              </div>
            </div>

            <span className="text-muted-foreground">Shared with </span>
            <div className="flex gap-x-2 items-center text-muted-foreground">
              {playground.sharedUsers.map((user, index) => (
                <div key={index}>
                  <span className="font-bold text-neutral-500">{user}</span>
                  <span
                    className={cn({
                      hidden: index === playground.sharedUsers.length - 1,
                    })}
                  >
                    ,
                  </span>
                  <span
                    className={cn({
                      hidden: index !== playground.sharedUsers.length - 1,
                    })}
                  >
                    ... +{(index + 1) * 5} more
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
