"use client";
import React from "react";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/navigation";
import IconButton from "./IconButton";

const Logo = () => {
  const { push } = useRouter();

  const onClickLogo = () => {
    push("/");
  };

  const onClickMenu = () => {};

  return (
    <section className="flex flex-row items-center gap-3">
      <IconButton
        onClickIcon={onClickMenu}
        icon={<RxHamburgerMenu size={24} />}
      />
      <div className="cursor-pointer">
        <Image
          onClick={onClickLogo}
          width={100}
          height={30}
          src={"/main-logo.svg"}
          alt="logo"
        />
      </div>
    </section>
  );
};

export default Logo;
