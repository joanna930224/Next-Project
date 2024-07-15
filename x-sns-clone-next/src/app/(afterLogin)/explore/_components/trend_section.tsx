"use client";

import { Hashtag } from "@/models/hashtag";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTrends } from "../../_lib/get_trends";
import Trend from "../../_components/trend";

const TrendSection = () => {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((trend) => <Trend trend={trend} key={trend.title} />);
};

export default TrendSection;
