"use client";

import style from "./trend_section.module.css";
import Trend from "./trend";
import { usePathname } from "next/navigation";

export default function TrendSection() {
  const pathname = usePathname();
  if (pathname === "/explore") return null;
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <h3>Trends for you</h3>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <button className={style.trendShowMore}>
          <div>Show more</div>
        </button>
      </div>
    </div>
  );
}
