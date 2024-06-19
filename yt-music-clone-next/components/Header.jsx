import React from "react";
import Image from "next/image";
import UserIcon from "./UserIcon";
import PagePadding from "./PagePadding";
import { FaChromecast } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const Header = ({ children }) => {
  return (
    <header className="relative overflow-y-auto w-full h-full">
      <section className="absolute top-0 w-full">
        <div className="relative h-[400px] w-full">
          <Image
            className="object-cover"
            fill
            alt="mediaItem"
            src={
              "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </div>
        <div className="absolute top-0 bg-black opacity-40 w-full h-[400px]"></div>
        <div className="absolute top-0 bg-gradient-to-t from-black w-full h-[400px]"></div>
      </section>
      {/* searchSection */}
      <section className="sticky">
        <PagePadding>
          <div className="h-[64px] flex flex-row justify-between items-center">
            <article className="lg:flex flex-row hidden justify-between items-center bg-[rgba(0,0,0,0.14)] rounded-2xl h-[42px] min-w-[480px] gap-[16px] px-[16px] border-neutral-500 border-[1px]">
              <div>
                <FiSearch size={24} />
              </div>
              <input
                className="h-full w-full bg-transparent"
                placeholder="노래, 앨범, 아티스트, 팟캐스트 검색"
                type="text"
              />
            </article>
            <article className="flex flex-row gap-4 items-center px-2">
              <FaChromecast size={26} />
              <UserIcon />
            </article>
          </div>
        </PagePadding>
      </section>
      <section className="absolute">{children}</section>
    </header>
  );
};

export default Header;
