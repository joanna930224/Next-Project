"use client";

import React, { MouseEventHandler } from "react";
import style from "./follow_button.module.css";

type Props = {
  onFollow: MouseEventHandler<HTMLButtonElement>;
  text: string;
};

const FollowButton = ({ onFollow, text }: Props) => {
  return (
    <div className={style.followButtonSection}>
      <button onClick={onFollow}>{text}</button>
    </div>
  );
};

export default FollowButton;
