import style from "./home.module.css";
import TabProvider from "./_components/tab_provider";
import Post from "../_components/post";
import Tab from "./_components/tab";
import PostForm from "./_components/post_form";

export default function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <PostForm />
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
