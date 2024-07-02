import BackButton from "@/app/(afterLogin)/_components/back_button";
import style from "./post_detail.module.css";
import Post from "@/app/(afterLogin)/_components/post";
import CommentForm from "./_components/comment_form";
import Comments from "./_components/comments";

export default function Page() {
  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3>Post</h3>
      </div>
      <Post />
      <CommentForm />
      <Comments />
    </main>
  );
}
