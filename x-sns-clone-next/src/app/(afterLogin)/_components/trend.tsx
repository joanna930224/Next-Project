"use client";

import Link from "next/link";
import style from "./trend.module.css";
import { Hashtag } from "@/models/hashtag";
import { useSearchParams } from "next/navigation";

type Props = {
  trend: Hashtag;
};

export default function Trend({ trend }: Props) {
  const searchPrams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchPrams);
  newSearchParams.set("q", trend.title);

  return (
    <Link
      href={`/search?${newSearchParams.toString()}`}
      className={style.container}
    >
      <div className={style.count}>Trending in South Korea</div>
      <div className={style.title}>{trend.title}</div>
      <div className={style.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
}
