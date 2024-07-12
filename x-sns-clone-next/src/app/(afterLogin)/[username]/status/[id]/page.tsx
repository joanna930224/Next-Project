import BackButton from "@/app/(afterLogin)/_components/back_button";
import style from "./post_detail.module.css";
import CommentForm from "./_components/comment_form";
import Comments from "./_components/comments";
import DetailPost from "./_components/detail_post";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getDetailPostServer } from "./_lib/get_detail_post_server";
import { User } from "@/models/user";
import { Post } from "@/models/post";
import { getUserServer } from "../../_lib/get_user_server";

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  const post: Post = await getDetailPostServer({
    queryKey: ["posts", params.id],
  });
  return {
    title: `X에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
    openGraph: {
      title: `X에서 ${user.nickname} 님 : ${post.content}`,
      description: post.content,
      images:
        post.Images?.length > 0
          ? post.Images?.map((v) => ({
              url: `https://z.nodebird.com${v.link}`,
              width: 600,
              height: 400,
            }))
          : [
              {
                url: `https://z.nodebird.com${user.image}`,
                width: 400,
                height: 400,
              },
            ],
    },
  };
}

type Props = {
  params: {
    id: string;
    username: string;
  };
};

export default async function Page({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  // 서버측에서 쿼리 미리 가져옴
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getDetailPostServer,
  });

  // queryClient 상태 직렬화
  const dehydratedState = dehydrate(queryClient);

  // HydrationBoundary 직렬화된 상태를 복원하고
  // 서버에서 가져온 데이터를 클라이언트에서 사용할 수 있게 함
  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3>Post</h3>
        </div>
        <DetailPost id={id} />
        <CommentForm id={id} />
        <Comments id={id} />
      </HydrationBoundary>
    </div>
  );
}
