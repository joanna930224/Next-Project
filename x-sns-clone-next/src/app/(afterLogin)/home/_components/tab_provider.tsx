"use client";

import { createContext, ReactNode, useState } from "react";

export const TabContext = createContext({
  tab: "forYou",
  setTab: (value: "forYou" | "following") => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState("forYou");

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
