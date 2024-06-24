"use client";
import React, { useEffect } from "react";
import useUIState from "@/hooks/use_ui_state";

type HeaderBgChangerProps = {
  imageSrc: string;
};

const HeaderBgChanger = ({ imageSrc }: HeaderBgChangerProps) => {
  const { setHomeImageSrc } = useUIState();

  useEffect(() => {
    if (imageSrc) setHomeImageSrc(imageSrc);
  }, [imageSrc, setHomeImageSrc]);

  return <div></div>;
};

export default HeaderBgChanger;
