"use client";

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect } from "react";
import { getPostRecommends } from "../_lib/get_post_recommends";
import { Post as PostModel } from "@/models/post";
import Post from "../../_components/post";
import { useInView } from "react-intersection-observer";

const PostRecommends = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    PostModel[],
    Object,
    InfiniteData<PostModel[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    // 처음 커서 값
    initialPageParam: 0,
    // 가장최근에 불러왔던 마지막 게시글의 post id
    // useInfiniteQuery는 데이터를 2차원 배열로 되어있음
    getNextPageParam: (lastPage) => lastPage?.at(-1)?.postId,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  // 다음페이지를 언제 호출할 것인지 설정
  const { ref, inView } = useInView({
    // 몇 픽셀정도가 보였을 때 호출될 것인지 설정 0으로 하면 보이자마자 호출
    threshold: 0,
    // 보인 후 몇초후에 이벤트를 발생시킬지 설정
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // <></> 로 사용하던것 key 값 전달하려면 Fragment로 기입해서 사용
  // 마지막 태그가 보였을때 ref로 연결된 useInView를 사용해서 다음 데이터 호출
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

export default PostRecommends;
