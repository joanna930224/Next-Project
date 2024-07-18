import style from "./profile.module.css";
import UserInfo from "./_components/user_info";
import { auth } from "@/auth";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import UserPosts from "./_components/user_posts";
import { getUserServer } from "./_lib/get_user_server";
import { getUserPosts } from "./_lib/get_user_posts";
import { getUser } from "./_lib/get_user";
import { User } from "@/models/user";

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  return {
    title: `${user.nickname} (${user.id}) / X`,
    description: `${user.nickname} (${user.id}) Profile`,
  };
}

type Props = {
  params: { username: string };
};

export default async function Profile({ params }: Props) {
  const { username } = params;
  const session = await auth();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "users", username] as [string, string, string],
    queryFn: getUserPosts,
    initialPageParam: 0,
  });

  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUser,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo session={session} username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
