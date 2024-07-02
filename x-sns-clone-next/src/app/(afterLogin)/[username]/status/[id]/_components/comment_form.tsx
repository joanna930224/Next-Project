"use client";

import React from "react";
import style from "./comment_form.module.css";
import Image from "next/image";
import { ChangeEventHandler, FormEventHandler, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";

const CommentForm = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const me = {
    id: "kun_0426",
    image: "/kun.jpeg",
  };

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  return (
    <form className={style.postForm} onSubmit={onSubmit}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <Image src={me.image} width={40} height={40} alt={me.id} />
        </div>
      </div>
      <div className={style.postInputSection}>
        <textarea
          value={content}
          onChange={onChange}
          placeholder="Post your reply"
        />
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input
                type="file"
                name="imageFiles"
                multiple
                hidden
                ref={imageRef}
              />
              <button
                className={style.uploadButton}
                type="button"
                onClick={onClickButton}
              >
                <HiOutlinePhotograph color={"#1d9bf0"} size={24} />
              </button>
            </div>
            <button className={style.actionButton} disabled={!content}>
              Reply
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
