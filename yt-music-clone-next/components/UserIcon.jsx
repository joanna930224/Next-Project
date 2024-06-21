import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const UserIcon = ({ size = "sm" }) => {
  return (
    <Avatar
      className={cn(
        "w-[26px] h-[26px]" && size === "lg" && "w-[56px] h-[56px]"
      )}
    >
      <AvatarImage src="https://avatars.githubusercontent.com/u/109578911?v=4" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserIcon;
