"use client";

import React from "react";
import style from "@/app/(afterLogin)/_components/nav_menu.module.css";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { GoPersonFill } from "react-icons/go";
import { useSelectedLayoutSegment } from "next/navigation";
import { useSession } from "next-auth/react";

const NavMenu = () => {
  const segment = useSelectedLayoutSegment();
  const { data: me } = useSession();

  return (
    <>
      <li>
        <Link href="/home">
          <div className={style.navItem}>
            {segment === "home" ? (
              <>
                <GoHomeFill size={24} />
                <div style={{ fontWeight: "bold" }}>Home</div>
              </>
            ) : (
              <>
                <GoHomeFill size={24} />
                <div>Home</div>
              </>
            )}
          </div>
        </Link>
        <Link href="/explore">
          <div className={style.navItem}>
            {segment && ["search", "explore"].includes(segment) ? (
              <>
                <FiSearch size={24} />
                <div style={{ fontWeight: "bold" }}>Explore</div>
              </>
            ) : (
              <>
                <FiSearch size={24} />
                <div>Explore</div>
              </>
            )}
          </div>
        </Link>
        <Link href="/messages">
          <div className={style.navItem}>
            {segment === "messages" ? (
              <>
                <FiMail size={24} />
                <div style={{ fontWeight: "bold" }}>Messages</div>
              </>
            ) : (
              <>
                <FiMail size={24} />
                <div>Messages</div>
              </>
            )}
          </div>
        </Link>
        <Link href={`/${me?.user?.email}`}>
          <div className={style.navItem}>
            {segment === me?.user?.email ? (
              <>
                <GoPersonFill size={24} />
                <div style={{ fontWeight: "bold" }}>Profile</div>
              </>
            ) : (
              <>
                <GoPersonFill size={24} />
                <div>Profile</div>
              </>
            )}
          </div>
        </Link>
      </li>
    </>
  );
};

export default NavMenu;
