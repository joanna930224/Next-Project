"use client";

import React from "react";
import Image from "next/image";
import ActionButtons from "@/app/(afterLogin)/_components/action_buttons";
import style from "../photo_modal.module.css";
import { getDetailPost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/get_detail_post";
import { useQuery } from "@tanstack/react-query";
import { Post as PostModel } from "@/models/post";

type Props = {
  id: string;
};

const ImageZone = ({ id }: Props) => {
  const { data: post, error } = useQuery<
    PostModel,
    Object,
    PostModel,
    [_1: string, _2: string]
  >({
    queryKey: ["posts", id],
    queryFn: getDetailPost,
    staleTime: 60 * 1000, //
    gcTime: 300 * 1000,
  });

  if (!post?.Images[0]) {
    return null;
  }

  return (
    <div className={style.imageZone}>
      <Image
        src={post.Images[0].link}
        width={1300}
        height={1300}
        alt={post.content}
      />
      <div
        className={style.image}
        style={{ backgroundImage: `url(${post.Images[0].link})` }}
      />
      <div className={style.buttonZone}>
        <div className={style.buttonInner}>
          <ActionButtons white />
        </div>
      </div>
    </div>
  );
};

export default ImageZone;
