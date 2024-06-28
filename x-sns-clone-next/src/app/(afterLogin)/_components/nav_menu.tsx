import React from "react";
import style from "@/app/(afterLogin)/_components/nav_menu.module.css";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { GoPersonFill } from "react-icons/go";

const NavMenu = () => {
  // 더미데이터
  const me = {
    id: "kun_0426",
  };

  return (
    <>
      <li>
        <Link href="/home">
          <div className={style.navItem}>
            <GoHomeFill size={24} />
            <div>Home</div>
          </div>
        </Link>
        <Link href="/explore">
          <div className={style.navItem}>
            <FiSearch size={24} />
            <div>Explore</div>
          </div>
        </Link>
        <Link href="/messages">
          <div className={style.navItem}>
            <FiMail size={24} />
            <div>Messages</div>
          </div>
        </Link>
        <Link href={`/${me?.id}`}>
          <div className={style.navItem}>
            <GoPersonFill size={24} />
            <div>Profile</div>
          </div>
        </Link>
      </li>
    </>
  );
};

export default NavMenu;
