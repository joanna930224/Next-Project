"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "@/models/user";
import FollowRecommend from "./follow_recommend";
import { getFollowRecommends } from "../_lib/get_follow_recommends";

export default function FollowRecommendSection() {
  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((user) => <FollowRecommend user={user} key={user.id} />);
}
