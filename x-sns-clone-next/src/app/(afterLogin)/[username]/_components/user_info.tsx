"use client";

import React, { MouseEventHandler } from "react";
import Image from "next/image";
import BackButton from "../../_components/back_button";
import FollowButton from "../../_components/follow_button";
import style from "../profile.module.css";
import { FiMail } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Session } from "@auth/core/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const follow = useMutation({
    mutationFn: (userId: string) => {
      console.log("follow", userId);
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          credentials: "include",
          method: "post",
        }
      );
    },
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        if (index > -1) {
          console.log(value, userId, index);
          const shallow = [...value];
          shallow[index] = {
            ...shallow[index],
            Followers: [{ id: session?.user?.email as string }],
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers + 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }
      const value2: User | undefined = queryClient.getQueryData([
        "users",
        userId,
      ]);
      if (value2) {
        const shallow: User = {
          ...value2,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", userId], shallow);
      }
    },
    onError(error, userId: string) {
      console.error(error);
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        console.log(value, userId, index);
        if (index > -1) {
          const shallow = [...value];
          shallow[index] = {
            ...shallow[index],
            Followers: shallow[index].Followers.filter(
              (v) => v.id !== session?.user?.email
            ),
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
        const value2: User | undefined = queryClient.getQueryData([
          "users",
          userId,
        ]);
        if (value2) {
          const shallow = {
            ...value2,
            Followers: value2.Followers.filter(
              (v) => v.id !== session?.user?.email
            ),
            _count: {
              ...value2._count,
              Followers: value2._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", userId], shallow);
        }
      }
    },
  });

  const unfollow = useMutation({
    mutationFn: (userId: string) => {
      console.log("unfollow", userId);
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
        {
          credentials: "include",
          method: "delete",
        }
      );
    },
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        console.log(value, userId, index);
        if (index > -1) {
          const shallow = [...value];
          shallow[index] = {
            ...shallow[index],
            Followers: shallow[index].Followers.filter(
              (v) => v.id !== session?.user?.email
            ),
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
        const value2: User | undefined = queryClient.getQueryData([
          "users",
          userId,
        ]);
        if (value2) {
          const shallow = {
            ...value2,
            Followers: value2.Followers.filter(
              (v) => v.id !== session?.user?.email
            ),
            _count: {
              ...value2._count,
              Followers: value2._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", userId], shallow);
        }
      }
    },
    onError(error, userId: string) {
      console.error(error);
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        console.log(value, userId, index);
        if (index > -1) {
          const shallow = [...value];
          shallow[index] = {
            ...shallow[index],
            Followers: [{ id: session?.user?.email as string }],
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers + 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }
      const value2: User | undefined = queryClient.getQueryData([
        "users",
        userId,
      ]);
      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", userId], shallow);
      }
    },
  });

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

  const followed = user.Followers?.find((v) => v.id === session?.user?.email);
  console.log(session?.user?.email, followed);

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("follow", followed, user.id);
    if (followed) {
      unfollow.mutate(user.id);
    } else {
      follow.mutate(user.id);
    }
  };

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
        {user.id !== session?.user?.email && (
          <>
            <div className={style.messageButton} onClick={onMessage}>
              <FiMail />
            </div>
            <div>
              <FollowButton
                onFollow={onFollow}
                text={followed ? "Unfollow" : "Follow"}
              />
            </div>
          </>
        )}
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
