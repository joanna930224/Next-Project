"use client";

import Image from "next/image";
import style from "./chat.module.css";
import { useRouter } from "next/navigation";

const Chat = () => {
  const { push } = useRouter();

  const onClick = () => {
    push(`/messages/${"user.id"}`);
  };

  //더미 데이터
  const user = {
    id: "lol_champion_korea",
    nickname: "LCK",
    image: "/lck.jpeg",
  };

  return (
    <>
      <div className={style.chat} onClick={onClick}>
        <div className={style.profileImage}>
          <Image src={user.image} width={40} height={40} alt="profile" />
        </div>
        <div className={style.info}>
          <div className={style.userInfo}>
            <div className={style.nickname}>{user.nickname}</div>
            <div>@{user.id}</div>
          </div>
          <div>message</div>
        </div>
      </div>
    </>
  );
};

export default Chat;
