type Props = {
  pageParam?: number;
  queryKey: [
    _1: string,
    _2: string,
    searchParams: { q: string; pf?: string; f?: string }
  ];
};
export const getSearchResult = async ({ queryKey, pageParam }: Props) => {
  const [_1, _2, searchParams] = queryKey;
  const urlSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/posts?${urlSearchParams.toString()}&cursor=${pageParam}`,
    {
      next: {
        tags: ["posts", "search", searchParams.q],
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
