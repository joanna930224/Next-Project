"use client";

import React from "react";
import style from "./user_profile.module.css";
import Image from "next/image";
import BackButton from "@/app/(afterLogin)/_components/back_button";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/app/(afterLogin)/[username]/_lib/get_user";
import Link from "next/link";

type Props = {
  id: string;
};

const UserProfile = ({ id }: Props) => {
  const { data: user } = useQuery({
    queryKey: ["users", id],
    queryFn: getUser,
  });
  if (!user) {
    return null;
  }

  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3>{user.nickname}</h3>
      </div>
      <div className={style.profile}>
        <Link href={"/" + user.id} className={style.userInfo}>
          <Image src={user.image} width={64} height={64} alt="profile" />
          <div className={style.userNickname}>{user.nickname}</div>
          <div className={style.userId}>@{user.id}</div>
        </Link>
      </div>
    </>
  );
};

export default UserProfile;
