"use client";

import style from "./tab.module.css";
import { useState } from "react";

export default function Tab() {
  const [tab, setTab] = useState("forYou");

  const onClickForYou = () => {
    setTab("forYou");
  };
  const onClickFollowing = () => {
    setTab("following");
  };

  return (
    <div className={style.homeFixed}>
      <div className={style.homeTab}>
        <div
          onClick={onClickForYou}
          className={`${tab === "forYou" ? style.activeTab : ""}`}
        >
          For you
          <div
            className={style.tabIndicator}
            hidden={tab === "following"}
          ></div>
        </div>
        <div
          onClick={onClickFollowing}
          className={`${tab === "following" ? style.activeTab : ""}`}
        >
          Following
          <div className={style.tabIndicator} hidden={tab === "forYou"}></div>
        </div>
      </div>
    </div>
  );
}
