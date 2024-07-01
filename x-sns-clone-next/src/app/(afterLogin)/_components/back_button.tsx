import React from "react";
import style from "./back_button.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = () => {
  return (
    <button className={style.backButton}>
      <IoMdArrowRoundBack size={20} />
    </button>
  );
};

export default BackButton;
