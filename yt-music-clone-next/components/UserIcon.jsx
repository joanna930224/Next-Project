import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserIcon = () => {
  return (
    <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/109578911?v=4" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserIcon;
