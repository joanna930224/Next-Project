"use client";

import Image from "next/image";
import style from "./follow_recommend.module.css";
import FollowButton from "./follow_button";

export default function FollowRecommend() {
  const user = {
    id: "LCK",
    nickname: "LCK",
    image: "/lck.jpeg",
  };

  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <Image src={user.image} width={40} height={40} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <FollowButton />
    </div>
  );
}
