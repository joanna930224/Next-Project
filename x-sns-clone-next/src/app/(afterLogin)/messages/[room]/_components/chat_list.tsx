"use client";

import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import style from "../room.module.css";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useMessageStore } from "@/store/message";
import {
  DefaultError,
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Message } from "@/models/message";
import { getMessages } from "../_lib/get_messages";
import { useInView } from "react-intersection-observer";
import useSocket from "../_lib/use_socket";

type Props = {
  id: string;
};

const ChatList = ({ id }: Props) => {
  const { data: session } = useSession();
  const shouldGoDown = useMessageStore().shouldGoDown;
  const setGoDown = useMessageStore().setGoDown;
  const listRef = useRef<HTMLDivElement>(null);
  const [pageRendered, setPageRendered] = useState(false);
  const [adjustingScroll, setAdjustingScroll] = useState(false);

  const {
    data: messages,
    isFetching,
    hasPreviousPage,
    fetchPreviousPage,
  } = useInfiniteQuery<
    Message[],
    DefaultError,
    InfiniteData<Message[]>,
    [
      string,
      {
        senderId: string;
        receiverId: string;
      },
      string
    ],
    number
  >({
    queryKey: [
      "rooms",
      { senderId: session?.user?.email!, receiverId: id },
      "messages",
    ],
    queryFn: getMessages,
    initialPageParam: 0,
    // 리버스 인피니트 스크롤링
    getPreviousPageParam: (firstPage) =>
      firstPage.length < 10 ? undefined : firstPage.at(0)?.messageId,
    // 필수로 기입해야해서 적긴하지만 실제로 사용하진 않음
    getNextPageParam: (lastPage) =>
      lastPage.length < 10 ? undefined : lastPage.at(-1)?.messageId,
    enabled: !!(session?.user?.email && id),
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.resetQueries({
      queryKey: [
        "rooms",
        { senderId: session?.user?.email!, receiverId: id },
        "messages",
      ],
    });
  }, [queryClient, session?.user?.email, id]);

  // 리버스 인피니트 스크롤
  useEffect(() => {
    if (inView) {
      if (!isFetching && hasPreviousPage && !adjustingScroll) {
        // 새로 불러왔을때 스크롤 유지
        const prevHeight = listRef.current?.scrollHeight || 0;
        fetchPreviousPage().then(() => {
          // 스크롤 조정중일때는 더 안불러오도록
          setAdjustingScroll(true);
          setTimeout(() => {
            console.log(
              "prevHeight",
              prevHeight,
              listRef.current?.scrollHeight
            );
            if (listRef.current) {
              listRef.current.scrollTop =
                listRef.current?.scrollHeight - prevHeight;
            }
            setAdjustingScroll(false);
          }, 0);
        });
      }
    }
  }, [inView, isFetching, hasPreviousPage, adjustingScroll, fetchPreviousPage]);

  let hasMessages = !!messages;
  // 새로고침했을때 스크롤 아래로 붙어있어야함
  // 스크롤을 올렸을때 다음 데이터 불러오도록!
  useEffect(() => {
    if (hasMessages) {
      console.log(listRef.current);
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current?.scrollHeight;
        }
      }, 100);
      setPageRendered(true);
    }
  }, [hasMessages]);

  // TODO : 메시지 전송했을때 스크롤 아래로
  useEffect(() => {
    if (shouldGoDown) {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current?.scrollHeight;
        setGoDown(false);
      }
    }
  }, [shouldGoDown, setGoDown]);

  // TODO : 새 데이터 맨 마지막에 추가
  const [socket] = useSocket();
  useEffect(() => {
    console.log("메시지 도착");

    socket?.on("receiveMessage", (data) => {
      console.log("data", data);
      // TODO : socket - 리액트 쿼리에 데이터 추가
      const exMessages = queryClient.getQueryData([
        "rooms",
        { senderId: session?.user?.email, receiverId: id },
        "messages",
      ]) as InfiniteData<Message[]>;

      if (exMessages && typeof exMessages === "object") {
        const newMessages = {
          ...exMessages,
          pages: [...exMessages.pages],
        };

        const lastPage = newMessages.pages.at(-1);
        const newLastPage = lastPage ? [...lastPage] : [];
        newLastPage.push(data);
        newMessages.pages[newMessages.pages.length - 1] = newLastPage;
        queryClient.setQueryData(
          [
            "rooms",
            { senderId: session?.user?.email, receiverId: id },
            "messages",
          ],
          newMessages
        );
        setGoDown(true);
      }
    });
    return () => {
      socket?.off("receiveMessage");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className={style.list} ref={listRef}>
      {!adjustingScroll && pageRendered && (
        <div ref={ref} style={{ height: 1 }} />
      )}
      {messages?.pages.map((page) =>
        page.map((m) => {
          // 내가 보낸 메세지
          if (m.senderId === session?.user?.email) {
            return (
              <div
                key={m.messageId}
                className={cx(style.message, style.myMessage)}
              >
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>
                  {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
                </div>
              </div>
            );
          }

          // 받은 메시지
          return (
            <div
              key={m.messageId}
              className={cx(style.message, style.yourMessage)}
            >
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatList;
