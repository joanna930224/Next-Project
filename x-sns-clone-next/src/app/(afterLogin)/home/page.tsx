import style from "./home.module.css";
import TabProvider from "./_components/tab_provider";
import Tab from "./_components/tab";
import PostForm from "./_components/post_form";
import { auth } from "@/auth";
import TabDecider from "./_components/tab_decider";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { getPostRecommends } from "./_lib/get_post_recommends";

export default async function Home() {
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm me={session} />
          <TabDecider />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
