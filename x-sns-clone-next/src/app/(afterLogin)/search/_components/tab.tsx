"use client";

import style from "./tab.module.css";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Tab() {
  const [tab, setTab] = useState("Top");
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClickTop = () => {
    setTab("Top");
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("f");
    router.replace(`/search?${newSearchParams.toString()}`);
  };
  const onClickLatest = () => {
    setTab("Latest");
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("f", "live");
    router.replace(`/search?${newSearchParams.toString()}`);
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div
          onClick={onClickTop}
          className={`${tab === "Top" ? style.activeTab : ""}`}
        >
          Top
          <div className={style.tabIndicator} hidden={tab === "Latest"}></div>
        </div>
        <div
          onClick={onClickLatest}
          className={`${tab === "Latest" ? style.activeTab : ""}`}
        >
          Latest
          <div className={style.tabIndicator} hidden={tab === "Top"}></div>
        </div>
      </div>
    </div>
  );
}
