"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Post as PostModel } from "@/models/post";
import { getSearchResult } from "../_lib/get_search_result";
import Post from "../../_components/post";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

const SearchResult = ({ searchParams }: Props) => {
  const { data } = useQuery<
    PostModel[],
    Object,
    PostModel[],
    [_1: string, _2: string, Props["searchParams"]]
  >({
    queryKey: ["posts", "search", searchParams],
    queryFn: getSearchResult,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
};

export default SearchResult;
