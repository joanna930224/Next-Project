"use client";
import React from "react";
import { PuffLoader } from "react-spinners";

const ErrorMessage = () => {
  return (
    <div className="my-20 flex flex-col justify-center items-center gap-4">
      <PuffLoader color="red" size={150} />
      <div className="text-[50px]">Oops!</div>
      <div>잠시 후 다시 확인해주세요..</div>
    </div>
  );
};

export default ErrorMessage;
