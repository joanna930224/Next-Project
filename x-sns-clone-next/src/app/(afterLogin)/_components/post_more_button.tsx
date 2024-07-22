"use client";

import { Post as PostModel } from "@/models/post";
import { useSession } from "next-auth/react";
import React, { MouseEventHandler, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import style from "./post_more_button.module.css";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type Props = {
  post: PostModel;
};

const PostMoreButton = ({ post }: Props) => {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const queryClient = useQueryClient();

  const onMoreButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    setShowMenu(!showMenu);
    console.log(showMenu);
  };

  const deletePost = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}`,
        {
          method: "delete",
          credentials: "include",
        }
      );
    },
    async onSuccess(response) {
      if (!response.ok) {
        return;
      }
      setShowMenu(false);
      //추천 탭
      if (queryClient.getQueryData(["posts", "recommends"])) {
        queryClient.setQueryData(
          ["posts", "recommends"],
          (prevData: { pages: PostModel[][] }) => {
            if (!prevData) return prevData;

            const shallow = {
              ...prevData,
              pages: [...prevData.pages],
            };

            shallow.pages = shallow.pages.map((page) =>
              page.filter((page) => page.postId !== post.postId)
            );

            return shallow;
          }
        );
      }

      // 팔로잉 탭
      if (queryClient.getQueryData(["posts", "followings"])) {
        queryClient.setQueryData(
          ["posts", "followings"],
          (prevData: { pages: PostModel[][] }) => {
            if (!prevData) return prevData;

            const shallow = {
              ...prevData,
              pages: [...prevData.pages],
            };

            shallow.pages = shallow.pages.map((page) =>
              page.filter((page) => page.postId !== post.postId)
            );

            return shallow;
          }
        );
      }
    },
  });

  const onClickDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (post.User.id === session?.user?.email) {
      //게시글 삭제 요청
      deletePost.mutate();
      setShowMenu(!showMenu);
    } else {
      setShowMenu(!showMenu);
      alert("게시글 삭제는 본인만 가능합니다.");
    }
  };

  return (
    <div>
      <button onClick={onMoreButtonClick}>
        <FiMoreHorizontal />
      </button>
      {showMenu && (
        <div className={style.dropDownMenu}>
          <button onClick={onClickDelete}>DELETE</button>
        </div>
      )}
    </div>
  );
};

export default PostMoreButton;
