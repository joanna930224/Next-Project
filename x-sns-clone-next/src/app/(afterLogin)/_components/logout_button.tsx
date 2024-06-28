"use client";
import React from "react";
import style from "./logout_button.module.css";
import Image from "next/image";
import { FiMoreHorizontal } from "react-icons/fi";

const LogoutButton = () => {
  // 더미데이터
  const me = {
    id: "kun_0426",
    nickname: "쿤",
    image: "/kun.jpeg",
  };

  const onLogout = () => {};

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <Image src={me.image} width={40} height={40} alt={me.id} />
      </div>
      <div className={style.logOutUserInfo}>
        <div className={style.logOutUserName}>
          <div>{me.nickname}</div>
          <div className={style.logOutUserId}>@{me.id}</div>
        </div>
        <div>
          <FiMoreHorizontal />
        </div>
      </div>
    </button>
  );
};

export default LogoutButton;
