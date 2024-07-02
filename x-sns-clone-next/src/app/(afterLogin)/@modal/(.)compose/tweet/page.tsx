"use client";

import { useRouter } from "next/navigation";
import style from "./modal.module.css";
import Image from "next/image";
import { useRef, useState, ChangeEventHandler } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";

const TweetModal = () => {
  const [content, setContent] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const onSubmit = () => {};
  const onClickButton = () => {};

  const onClickClose = () => {
    router.back();
  };

  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  const me = {
    id: "kun_0426",
    image: "/kun.jpeg",
  };

  return (
    <div className={style.background}>
      <div className={style.modal}>
        <button className={style.closeButton}>
          <RiCloseFill onClick={onClickClose} size={20} />
        </button>
        <form className={style.postForm} onSubmit={onSubmit}>
          <div className={style.postUserSection}>
            <div className={style.postUserImage}>
              <Image src={me.image} width={40} height={40} alt={me.id} />
            </div>
          </div>
          <div className={style.postInputSection}>
            <textarea
              value={content}
              onChange={onChangeContent}
              placeholder="What is happening?!"
            />
          </div>
        </form>
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
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetModal;
