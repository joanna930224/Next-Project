import Image from "next/image";
import BackButton from "../_components/back_button";
import style from "./profile.module.css";
import { FiMail } from "react-icons/fi";
import FollowButton from "../_components/follow_button";
import Post from "../_components/post";

export default function Profile() {
  //더미 데이터
  const user = {
    id: "kun_0426",
    nickname: "KUN",
    image: "/kun.jpeg",
    bg_image: "/kun_bg.jpg",
  };

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userBgImage}>
        <Image src={user.bg_image} width={3024} height={4032} alt="img" />
      </div>
      <div className={style.userImage}>
        <Image src={user.image} width={512} height={512} alt="img" />
      </div>
      <div className={style.buttons}>
        <div className={style.moreButton}>
          <FiMail />
        </div>
        <div>
          <FollowButton />
        </div>
      </div>
      <div className={style.info}>
        <h3>{user.nickname}</h3>
        <div>@{user.id}</div>
        <div>
          <span>122</span>
          <div>Following</div>
          <span>260.2K</span>
          <div>Followers</div>
        </div>
      </div>
      <div>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}
