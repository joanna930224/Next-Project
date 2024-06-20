"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import UserIcon from "./UserIcon";
import PagePadding from "./PagePadding";
import { FaChromecast } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Logo from "./elements/Logo";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Navigator from "./elements/Navigator";
import { cn } from "@/lib/utils";

const HeaderDrawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="w-[240px] h-full">
        <div className="py-[24px]">
          <div className="px-3">
            <Logo isInDrawer={isOpen} onClickClose={() => setIsOpen(false)} />
          </div>
          <Navigator />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const Header = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = headRef?.current?.scrollTop;
      // 최상단일때 value=0
      setIsScrolled(scrollValue !== 0);
    };

    const headRefCurrent = headRef?.current;

    headRefCurrent.addEventListener("scroll", handleScroll);
    return () => {
      headRefCurrent.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header ref={headRef} className="relative overflow-y-auto w-full h-full">
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
      <section
        className={cn("sticky top-0 left-0 z-10", isScrolled && "bg-black")}
      >
        <PagePadding>
          <div className="h-[64px] flex flex-row justify-between items-center">
            <HeaderDrawer>
              <article className="lg:hidden">
                <Logo />
              </article>
            </HeaderDrawer>
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
