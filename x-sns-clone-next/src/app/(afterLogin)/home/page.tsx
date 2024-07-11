import style from "./home.module.css";
import TabProvider from "./_components/tab_provider";
import Post from "../_components/post";
import Tab from "./_components/tab";
import PostForm from "./_components/post_form";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className={style.main}>
      <TabProvider>
        <PostForm me={session} />
        <Tab />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </TabProvider>
    </main>
  );
}
