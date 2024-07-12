"use client";

import Post from "@/app/(afterLogin)/_components/post";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { Fragment, useEffect } from "react";
import { Post as PostModel } from "@/models/post";
import { getComments } from "../_lib/get_comments";
import { useInView } from "react-intersection-observer";

type Props = {
  id: string;
};

const Comments = ({ id }: Props) => {
  const queryClient = useQueryClient();
  const post = queryClient.getQueryData(["posts", id]);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    PostModel[],
    Object,
    InfiniteData<PostModel[]>,
    [_1: string, _2: string, _3: string],
    number
  >({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
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

  if (post) {
    return (
      <>
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.map((post) => (
              <Post key={post.postId} post={post} />
            ))}
          </Fragment>
        ))}
        <div ref={ref} style={{ height: 50 }} />
      </>
    );
  }

  return null;
};

export default Comments;
