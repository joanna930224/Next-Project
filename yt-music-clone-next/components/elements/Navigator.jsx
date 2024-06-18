"use client";
import React, { useMemo } from "react";
import { GoHome } from "react-icons/go";
import { FiPlus, FiMusic, FiCompass } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { dummyPlaylistArray } from "@/lib/dummyData";
import PlaylistItem from "./PlaylistItem";

const Navigator = () => {
  const pathname = usePathname();

  const routes = useMemo(() => {
    return [
      {
        icon: <GoHome size={24} />,
        label: "홈",
        isActive: pathname === "/",
        href: "/",
      },
      {
        icon: <FiCompass size={24} />,
        label: "둘러보기",
        isActive: pathname === "/explore",
        href: "/explore",
      },
      {
        icon: <FiMusic size={24} />,
        label: "보관함",
        isActive: pathname === "/library",
        href: "/library",
      },
    ];
  }, [pathname]);

  // TODO : onClickNewPlaylist
  const onClickNewPlaylist = () => {
    console.log("onClickNewPlaylist");
  };

  return (
    <div>
      <section className="flex flex-col gap-2 p-4">
        {routes.map((route) => {
          return (
            <Link key={route.label} href={route.href}>
              <div
                className={cn(
                  "flex flex-row items-center text-[16px] gap-3 p-[10px] hover:bg-neutral-700 rounded-md",
                  route.isActive && "bg-neutral-800"
                )}
              >
                {route.icon}
                <span>{route.label}</span>
              </div>
            </Link>
          );
        })}
      </section>
      <section className="px-6">
        <div className="w-full h-[1px] bg-neutral-700"></div>
        <div
          onClick={onClickNewPlaylist}
          className="flex flex-row p-2 my-6 items-center justify-center bg-neutral-800 rounded-full gap-2 font-[200] hover:bg-neutral-700 cursor-pointer"
        >
          <FiPlus size={24} />새 재생목록
        </div>
      </section>
      <section>
        <ul>
          {dummyPlaylistArray.map((playList) => {
            return <PlaylistItem key={playList.id} playList={playList} />;
          })}
        </ul>
      </section>
    </div>
  );
};

export default Navigator;
