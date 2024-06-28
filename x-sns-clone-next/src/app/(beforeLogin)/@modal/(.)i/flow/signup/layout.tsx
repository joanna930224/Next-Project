import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "X 가입하기",
};

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return <div>{children}</div>;
}
