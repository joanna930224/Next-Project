"use client";

import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import React, { Fragment, useEffect } from "react";
import { getFollowingPosts } from "../_lib/get_following_posts";
import { Post as PostModel } from "@/models/post";
import Post from "../../_components/post";
import { useInView } from "react-intersection-observer";

const FollowingPosts = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    PostModel[],
    DefaultError,
    InfiniteData<PostModel[]>,
    [string, string],
    number
  >({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      {data?.pages?.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
};

export default FollowingPosts;
