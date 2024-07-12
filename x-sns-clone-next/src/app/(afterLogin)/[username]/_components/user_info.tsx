"use client";

import React from "react";
import Image from "next/image";
import BackButton from "../../_components/back_button";
import FollowButton from "../../_components/follow_button";
import style from "../profile.module.css";
import { FiMail } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Session } from "@auth/core/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../_lib/get_user";
import { User } from "@/models/user";

type Props = {
  username: string;
  session: Session | null;
};

const UserInfo = ({ username, session }: Props) => {
  const { push } = useRouter();

  const { data: user, error } = useQuery<
    User,
    Object,
    User,
    [_1: string, _2: string]
  >({
    queryKey: ["users", username],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const queryClient = useQueryClient();

  console.log("error");
  console.dir(error);
  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3>Profile</h3>
        </div>
        <div className={style.empty}>
          <div>@{username}</div>
          <h2> 계정이 존재하지 않습니다.</h2>
        </div>
      </>
    );
  }
  if (!user) {
    return null;
  }

  const onMessage = () => {
    const ids = [session?.user?.email, user.id];
    ids.sort();
    push(`/messages/${ids.join("-")}`);
  };

  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3>{user?.nickname}</h3>
      </div>
      <div className={style.userBgImage}>
        <Image src={"/kun_bg.jpg"} width={3024} height={4032} alt="img" />
      </div>
      <div className={style.userImage}>
        <Image src={user?.image as string} width={512} height={512} alt="img" />
      </div>
      <div className={style.buttons}>
        <div className={style.messageButton} onClick={onMessage}>
          <FiMail />
        </div>
        <div>
          <FollowButton />
        </div>
      </div>
      <div className={style.info}>
        <h3>{user?.nickname}</h3>
        <div>@{user?.id}</div>
        <div>
          <span>{user._count.Followings}</span>
          <div>Following</div>
          <span>{user._count.Followers}</span>
          <div>Followers</div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
