type Props = {
  queryKey: [_1: string, _2: string, string];
  pageParam?: number;
};
export const getUserPosts = async ({ queryKey, pageParam }: Props) => {
  const [_1, _2, username] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}/posts?cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "users", username],
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
