import React from "react";
import style from "./photo_modal.module.css";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import ActionButtons from "@/app/(afterLogin)/_components/action_buttons";
import Post from "@/app/(afterLogin)/_components/post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_components/comment_form";
import PhotoModalCloseButton from "./_components/photo_modal_close_button";

const page = () => {
  const photo = {
    imageId: 1,
    link: faker.image.urlLoremFlickr(),
    Post: {
      content: faker.lorem.text(),
    },
  };
  return (
    <div className={style.container}>
      <PhotoModalCloseButton />
      <div className={style.imageZone}>
        <Image
          src={photo.link}
          width={1300}
          height={1300}
          alt={photo.Post?.content}
        />
        <div
          className={style.image}
          style={{ backgroundImage: `url(${photo.link})` }}
        />
        <div className={style.buttonZone}>
          <div className={style.buttonInner}>
            <ActionButtons white />
          </div>
        </div>
      </div>
      <div className={style.commentZone}>
        <Post noImage />
        <CommentForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default page;
