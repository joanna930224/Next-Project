import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "X. 무슨 일이 일어나고 있나요?",
};

type Props = { children: ReactNode; modal: ReactNode };

export default function Layout({ children, modal }: Props) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

// 주소가 localhost:3001일 때는 children->page.tsx, modal->@modal/default.tsx
// 주소가 localhost:3001/i/flow/login 때는 children->i/flow/login/page.tsx, modal->@modal/i/flow/login/page.tsx
