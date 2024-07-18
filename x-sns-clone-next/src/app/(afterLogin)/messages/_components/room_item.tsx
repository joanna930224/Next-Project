"use client";

import Image from "next/image";
import style from "./room_item.module.css";
import { useRouter } from "next/navigation";
import { Room } from "@/models/room";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  room: Room;
};

const RoomItem = ({ room }: Props) => {
  const { data: session } = useSession();
  const { push } = useRouter();

  const onClick = () => {
    push(`/messages/${room.room}`);
  };

  const user =
    room.Receiver.id === session?.user?.email ? room.Sender : room.Receiver;

  return (
    <>
      <div className={style.room} onClick={onClick}>
        <div className={style.profileImage}>
          <Image src={user.image} width={40} height={40} alt="profile" />
        </div>
        <div className={style.info}>
          <div className={style.userInfo}>
            <div className={style.nickname}>{user.nickname}</div>
            <span>@{user.id}</span>
            &nbsp; · &nbsp;
            <span className={style.postDate}>
              {dayjs(room.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{room.content}</div>
        </div>
      </div>
    </>
  );
};

export default RoomItem;
