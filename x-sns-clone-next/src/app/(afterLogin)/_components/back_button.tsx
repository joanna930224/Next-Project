"use client";

import React from "react";
import style from "./back_button.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <button className={style.backButton} onClick={onClick}>
      <IoMdArrowRoundBack size={20} />
    </button>
  );
};

export default BackButton;
