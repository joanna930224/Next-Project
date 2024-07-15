"use client";

import { ReactNode } from "react";
import style from "./post.module.css";
import { useRouter } from "next/navigation";
import { Post } from "@/models/post";

type Props = {
  children: ReactNode;
  post: Post;
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  let target = post;

  if (post.Original) {
    target = post.Original;
  }

  const onClick = () => {
    router.push(`/${target.User.id}/status/${target.postId}`);
  };

  return (
    // onClickCapture 일때는 stopPropagation가 작동하지 않음 (버블링단계에서만 작동하기때문)
    <article onClick={onClick} className={style.post}>
      {children}
    </article>
  );
}
