import React from "react";
import style from "./chat_profile.module.css";
import Image from "next/image";

const ChatProfile = () => {
  //더미 데이터
  const user = {
    id: "lol_champion_korea",
    nickname: "LCK",
    image: "/lck.jpeg",
  };

  return (
    <>
      <div className={style.profile}>
        <div className={style.userInfo}>
          <Image src={user.image} width={64} height={64} alt="profile" />
          <div className={style.userNickname}>{user.nickname}</div>
          <div className={style.userId}>@{user.id}</div>
        </div>
      </div>
    </>
  );
};

export default ChatProfile;
