"use client";

import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import style from "./chat_form.module.css";
import { VscSend } from "react-icons/vsc";
import TextareaAutosize from "react-textarea-autosize";
import { useMessageStore } from "@/store/message";
import useSocket from "../_lib/use_socket";
import { useSession } from "next-auth/react";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { Message } from "@/models/message";

type Props = {
  id: string;
};

const ChatForm = ({ id }: Props) => {
  const [content, setContent] = useState("");
  const setGoDown = useMessageStore().setGoDown;
  const [socket] = useSocket();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const onSubmit = () => {
    if (!session?.user?.email) {
      return;
    }
    const ids = [session?.user?.email, id];
    ids.sort();

    // 서버로 데이터 보냄
    socket?.emit("sendMessage", {
      senderId: session?.user?.email,
      receiverId: id,
      content,
    });

    // 리액트 쿼리에 데이터 추가
    // (메시지 등록시 메시지 리스트중 가장 마지막에 등록되도록)
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
      let lastMessageId = lastPage?.at(-1)?.messageId;
      newLastPage.push({
        senderId: session.user.email,
        receiverId: id,
        content,
        room: ids.join("-"),
        messageId: lastMessageId ? lastMessageId + 1 : 1,
        createdAt: new Date(),
      });
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
    setContent("");
  };

  const onEnter: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    console.log("e.key", e.key);
    if (e.key === "Enter") {
      console.log("onEnter");
      console.log(content);
      // console.log(e.key === "Enter", e);
      if (e.shiftKey) {
        return;
      }

      e.preventDefault();
      if (!content?.trim()) {
        return;
      }

      // 한글은 자음과 모음이 하나의 글자로 이루어져있기때문에
      // 한글입력시 아직 조합중인지 끝났는지 판단할 수 없는경우에
      // 마지막 글자가 하나 더 써지는 경우가 발생할 수 있음

      // 조합중일때는 이벤트 전파를 막고,
      // 끝난후에만 의도한 이벤를 한 번 실행시킨다.
      if (e.nativeEvent.isComposing) {
        onSubmit();
      }
      setContent("");
    }
  };

  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  return (
    <form
      className={style.chat}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <TextareaAutosize
        placeholder="Start a new message"
        value={content}
        onKeyDown={onEnter}
        onChange={onChangeContent}
      />
      <button type="submit" disabled={!content}>
        <VscSend size={20} />
      </button>
    </form>
  );
};

export default ChatForm;
