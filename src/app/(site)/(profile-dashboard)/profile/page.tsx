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
      <div className="border rounded-xl overflow-hidden">
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
            />
          )}
        </div>
        <div className="flex gap-x-2 mx-8">
          <UserAvatar
            user={currentUser}
            profileAvatar
            className="h-44 w-44 -mt-[88px] border-[3px] border-white"
          />
          <div className="mt-4 sapce-y-8">
            <h1 className="text-3xl font-bold text-neutral-800">
              {currentUser.name}
            </h1>
            <SocialLinks user={currentUser} />
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
    <div className="flex gap-x-2">
      {socialLinks.map((social) => {
        if (!social.url) return;

        return (
          <Link
            href={social.url}
            target="_blank"
            key={social.id}
            className="relative p-1 border rounded-lg h-5 w-5"
          >
            <Image src={social.image} alt={`${user.name}'s socials`} fill />
          </Link>
        );
      })}
    </div>
  );
};
