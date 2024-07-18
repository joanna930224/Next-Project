import { FiSearch } from "react-icons/fi";
import EmptyChat from "./_components/empty_chat";
import style from "./messages.module.css";
import { auth } from "@/auth";
import { QueryClient } from "@tanstack/react-query";
import { getRoomsServer } from "./_lib/get_room_server";
import Rooms from "./_components/rooms";
import WebSocketComponent from "./_components/web_socket_component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages / X",
  description: "Messages",
};

export default async function Home() {
  const session = await auth();
  const queryClient = new QueryClient();

  if (!session?.user?.email) {
    return <EmptyChat />;
  }

  await queryClient.prefetchQuery({
    queryKey: ["rooms", session?.user?.email],
    queryFn: getRoomsServer,
  });

  return (
    <main className={style.main}>
      <WebSocketComponent id={session.user.email} />
      <div className={style.header}>
        <h3>Messages</h3>
      </div>
      <div>
        <form className={style.search}>
          <FiSearch size={24} />
          <input type="search" placeholder="Search Direct Messages" />
        </form>
      </div>
      <Rooms id={session.user.email} />
    </main>
  );
}
