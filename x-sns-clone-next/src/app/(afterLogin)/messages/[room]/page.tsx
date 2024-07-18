import style from "./room.module.css";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import UserProfile from "./_components/user_profile";
import ChatForm from "./_components/chat_form";
import relativeTime from "dayjs/plugin/relativeTime";
import { auth } from "@/auth";
import { QueryClient } from "@tanstack/react-query";
import { getUserServer } from "../../[username]/_lib/get_user_server";
import ChatList from "./_components/chat_list";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  params: { room: string };
};

export default async function Home({ params }: Props) {
  const session = await auth();
  const queryClient = new QueryClient();

  const ids = params.room.split("-").filter((v) => v !== session?.user?.email);

  if (!ids[0]) {
    return null;
  }

  await queryClient.prefetchQuery({
    queryKey: ["users", ids[0]],
    queryFn: getUserServer,
  });

  return (
    <main className={style.main}>
      <div>
        <UserProfile id={ids[0]} />
      </div>
      <ChatList id={ids[0]} />
      <div>
        <ChatForm id={ids[0]} />
      </div>
    </main>
  );
}
