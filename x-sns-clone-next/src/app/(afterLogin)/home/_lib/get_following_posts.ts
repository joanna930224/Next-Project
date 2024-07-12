type Props = { pageParam?: number };

export async function getFollowingPosts({ pageParam }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/followings?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "followings"],
      },
      // 로그인 상태 확인이 필요한 경우 (특정권한이 필요한 리소스에 접근할때 사용함)
      credentials: "include",
      // 요청된 리소스가 캐시되지 않도록 설정하여
      // followings posts를 가져올때 항상 서버로부터 최신 데이터를 가져오도록함
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
