import style from "./profile.module.css";
import Post from "../_components/post";
import UserInfo from "./_components/user_info";

export default function Profile() {
  return (
    <main className={style.main}>
      <UserInfo />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </main>
  );
}
