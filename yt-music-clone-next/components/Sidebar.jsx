"use client";
import React from "react";
import Logo from "./elements/Logo";
import Navigator from "./elements/Navigator";
import usePlayerState from "@/hooks/usePlayerState";
import { cn } from "@/lib/utils";

const Sidebar = ({ children }) => {
  const { isVisiblePlayer } = usePlayerState();

  return (
    <div
      className={cn(
        "flex flex-row h-full ",

        isVisiblePlayer && "h-[calc(100vh-72px)]"
      )}
    >
      <nav className="w-[240px] border-r-[1px] border-neutral-600 hidden lg:block">
        <div className="p-[24px]">
          <Logo />
        </div>
        <div>
          <Navigator />
        </div>
      </nav>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Sidebar;
