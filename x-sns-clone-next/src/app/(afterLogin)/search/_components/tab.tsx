"use client";

import style from "./tab.module.css";
import { useState } from "react";

export default function Tab() {
  const [tab, setTab] = useState("Top");

  const onClickTop = () => {
    setTab("Top");
  };
  const onClickLatest = () => {
    setTab("Latest");
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
