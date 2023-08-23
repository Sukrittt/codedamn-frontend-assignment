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
      experience: true,
      education: true,
    },
  });

  if (!currentUser) redirect("/sign-in");

  return (
    <div className="mx-6 sm:mx-12 pb-12 lg:mx-36 space-y-8">
      <div className="border rounded-xl overflow-hidden pb-6">
        <div
          className={cn("h-[250px] relative", {
            "bg-gradient-to-r from-blue-500 via-sky-500 to-purple-600 to-90%":
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
        <div className="flex flex-col lg:flex-row gap-x-2 mx-8">
          <UserAvatar
            user={currentUser}
            profileAvatar
            className="h-44 w-44 -mt-[88px] border-[3px] border-white"
          />
          <div className="mt-8 flex flex-col gap-y-4 w-full">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center flex-wrap">
                <h1 className="text-4xl font-bold text-neutral-800">
                  {currentUser.name}
                </h1>
                {currentUser.lookingForJob && (
                  <span className="py-1 px-3 bg-blue-200 text-[#075985] font-semibold text-sm rounded-md">
                    Looking for job
                  </span>
                )}
              </div>
              <a
                href="/edit/personal"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-full text-neutral-700"
                )}
              >
                <Icons.pencil className="h-4 w-4" />
              </a>
            </div>
            <div className="text-muted-foreground flex flex-col gap-y-1">
              <span>{currentUser.bio}</span>
              {currentUser.location && (
                <div className="text-neutral-400 flex items-center">
                  <Icons.location className="h-4 w-4 mr-1" />
                  {currentUser.location}
                </div>
              )}
            </div>
            {currentUser.techSkills.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {currentUser.techSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="relative bg-accent rounded-lg py-1 px-4"
                  >
                    <span className="tracking-tight text-sm font-medium">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-y-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between sm:mt-4">
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
    <div className="flex gap-x-2 items-center">
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
