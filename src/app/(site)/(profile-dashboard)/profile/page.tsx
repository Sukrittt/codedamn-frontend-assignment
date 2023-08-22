import { redirect } from "next/navigation";
import Image from "next/image";
import { User } from "@prisma/client";
import Link from "next/link";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import UserAvatar from "@/components/user-avatar";
import UpdateCoverImage from "@/components/forms/update-cover-image";
import { TabSection } from "@/components/layout/tab-section";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import ProfileContact from "@/components/profile/profile-contact";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const ProfilePage = async () => {
  const session = await getAuthSession();

  if (!session) redirect("/sign-in");

  const currentUser = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
    include: {
      projects: true,
      certificates: true,
    },
  });

  if (!currentUser) redirect("/sign-in");

  return (
    <div className="m-12 pb-12 lg:mx-28  space-y-8">
      <div className="border rounded-xl overflow-hidden pb-6">
        <div
          className={cn("h-[250px] relative", {
            "bg-gradient-to-r from-blue-500 via-sky-500 to-blue-700 to-90%":
              !currentUser.coverImage,
          })}
        >
          <UpdateCoverImage />
          {currentUser.coverImage && (
            <Image
              fill
              src={currentUser.coverImage}
              className="object-cover"
              alt={`${currentUser.name}'s cover photo`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        <div className="flex gap-x-2 mx-8">
          <UserAvatar
            user={currentUser}
            profileAvatar
            className="h-44 w-44 -mt-[88px] border-[3px] border-white"
          />
          <div className="mt-4 sapce-y-8 w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-neutral-800">
                {currentUser.name}
              </h1>
              <Link
                href="/edit/personal"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-full text-neutral-700"
                )}
              >
                <Icons.pencil className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex items-center justify-between mt-4">
              <SocialLinks user={currentUser} />
              <ProfileContact />
            </div>
          </div>
        </div>
      </div>

      <TabSection user={currentUser} />
    </div>
  );
};

export default ProfilePage;

const SocialLinks = ({ user }: { user: User }) => {
  const socialLinks = [
    {
      id: 1,
      image: "/images/github.png",
      url: user?.githubUrl,
    },
    {
      id: 2,
      image: "/images/linkedin.png",
      url: user?.linkedInUrl,
    },
    {
      id: 3,
      image: "/images/facebook.png",
      url: user?.facebookUrl,
    },
    {
      id: 4,
      image: "/images/instagram.png",
      url: user?.instagramUrl,
    },
    {
      id: 5,
      image: "/images/dribble.png",
      url: user?.dribbbleUrl,
    },
    {
      id: 6,
      image: "/images/behance.png",
      url: user?.behanceUrl,
    },
  ];

  return (
    <div className="flex gap-x-2 mt-4 items-center">
      {socialLinks.map((social) => {
        if (!social.url) return;

        return (
          <Link
            href={social.url}
            target="_blank"
            key={social.id}
            className="p-1.5 border rounded-lg"
          >
            <div className="relative h-5 w-5">
              <Image
                src={social.image}
                alt={`${user.name}'s socials`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};
