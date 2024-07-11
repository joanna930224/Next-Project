"use client";
import React from "react";
import style from "./logout_button.module.css";
import Image from "next/image";
import { FiMoreHorizontal } from "react-icons/fi";
import { Session } from "@auth/core/types";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

type Props = {
  me: Session | null;
};

const LogoutButton = ({ me }: Props) => {
  const queryClient = useQueryClient();

  const onLogout = () => {
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
    signOut({ callbackUrl: "/" });
  };

  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <Image
          src={me.user?.image as string}
          width={40}
          height={40}
          alt={me.user?.email as string}
        />
      </div>
      <div className={style.logOutUserInfo}>
        <div className={style.logOutUserName}>
          <div>{me.user?.name}</div>
          <div className={style.logOutUserId}>@{me.user?.email}</div>
        </div>
        <div>
          <FiMoreHorizontal />
        </div>
      </div>
    </button>
  );
};

export default LogoutButton;
