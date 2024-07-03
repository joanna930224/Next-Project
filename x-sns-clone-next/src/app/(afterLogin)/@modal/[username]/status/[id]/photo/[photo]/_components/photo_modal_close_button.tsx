"use client";

import React from "react";
import { RiCloseFill } from "react-icons/ri";
import style from "../photo_modal.module.css";
import { useRouter } from "next/navigation";

const PhotoModalCloseButton = () => {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  return (
    <button className={style.closeButton}>
      <RiCloseFill onClick={onClickClose} size={20} />
    </button>
  );
};

export default PhotoModalCloseButton;
