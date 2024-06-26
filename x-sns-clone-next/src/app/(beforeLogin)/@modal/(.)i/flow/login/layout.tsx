import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "X에 로그인하기 / X",
};

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return <div>{children}</div>;
}
