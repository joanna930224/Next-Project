"use client";

import { useContext } from "react";
import { TabContext } from "./tab_provider";
import PostRecommends from "./post_recommends";
import FollowingPosts from "./following_posts";

export default function TabDecider() {
  const { tab } = useContext(TabContext);

  console.log(tab);

  if (tab === "forYou") {
    return <PostRecommends />;
  } else {
    return <FollowingPosts />;
  }
}
