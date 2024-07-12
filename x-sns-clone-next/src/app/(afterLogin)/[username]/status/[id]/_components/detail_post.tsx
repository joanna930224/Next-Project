"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Post as PostModel } from "@/models/post";
import { getDetailPost } from "../_lib/get_detail_post";
import Post from "@/app/(afterLogin)/_components/post";

type Props = {
  id: string;
  noImage?: boolean;
};

const DetailPost = ({ id, noImage }: Props) => {
  const { data: post, error } = useQuery<
    PostModel,
    Object,
    PostModel,
    [_1: string, _2: string]
  >({
    queryKey: ["posts", id],
    queryFn: getDetailPost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (error) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  if (!post) {
    return null;
  }

  return <Post key={post.postId} post={post} noImage={noImage} />;
};

export default DetailPost;
