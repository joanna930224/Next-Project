import React from "react";
import style from "./photo_modal.module.css";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_components/comment_form";
import PhotoModalCloseButton from "./_components/photo_modal_close_button";
import DetailPost from "@/app/(afterLogin)/[username]/status/[id]/_components/detail_post";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getDetailPostServer } from "@/app/(afterLogin)/[username]/status/[id]/_lib/get_detail_post_server";
import ImageZone from "./_components/image_zone";

type Props = {
  params: {
    id: string;
  };
};

export default async function PhotoModal({ params }: Props) {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getDetailPostServer,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={style.commentZone}>
          <DetailPost id={id} noImage />
          <CommentForm id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
