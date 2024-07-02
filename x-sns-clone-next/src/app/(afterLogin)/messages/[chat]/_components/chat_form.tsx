"use client";

import React, { ChangeEventHandler, useState } from "react";
import style from "./chat_form.module.css";
import { VscSend } from "react-icons/vsc";
import TextareaAutosize from "react-textarea-autosize";

const ChatForm = () => {
  const [message, setMessage] = useState("");

  const onChangeMessage: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form className={style.chat}>
      <TextareaAutosize
        placeholder="Start a new message"
        value={message}
        onChange={onChangeMessage}
      />
      <button disabled={!message}>
        <VscSend size={20} />
      </button>
    </form>
  );
};

export default ChatForm;
