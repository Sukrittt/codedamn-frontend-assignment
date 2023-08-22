import { FC } from "react";
import { User } from "next-auth";
import { AvatarProps } from "@radix-ui/react-avatar";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
  profileAvatar?: boolean;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, profileAvatar, ...props }) => {
  return (
    <Avatar {...props}>
      <AvatarImage
        src={user.image ?? ""}
        alt={user.name ?? "user avatar"}
        className="object-cover"
      />
      <AvatarFallback>
        <span className="sr-only">{user?.name}</span>
        <Icons.user
          className={cn({
            "h-4 w-4": !profileAvatar,
            "h-24 w-24": profileAvatar,
          })}
        />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
