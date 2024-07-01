"use client";

import React from "react";
import style from "./follow_button.module.css";

const FollowButton = () => {
  const onClick = () => {};

  return (
    <div className={style.followButtonSection}>
      <button onClick={onClick}>Follow</button>
    </div>
  );
};

export default FollowButton;
