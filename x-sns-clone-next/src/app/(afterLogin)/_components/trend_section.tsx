"use client";

import { useSession } from "next-auth/react";
import style from "./trend_section.module.css";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Hashtag } from "@/models/hashtag";
import { getTrends } from "../_lib/get_trends";
import Trend from "./trend";
import Link from "next/link";

export default function TrendSection() {
  const { data: session } = useSession();
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    // true이면 컴포넌트가 마운트될 때 자동으로 실행
    enabled: !!session?.user,
  });

  const pathname = usePathname();
  if (pathname === "/explore") return null;

  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>Trends for you</h3>
          {data?.map((trend) => (
            <Trend trend={trend} key={trend.title} />
          ))}
          <div className={style.trendShowMore}>
            <Link href={`/explore`}>Show more</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>Could not get trend</h3>
      </div>
    </div>
  );
}
