export async function getTrends() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hashtags/trends`,
    {
      // 1. 데이터 변경 추적 및 재검증
      // 2. 효율적인 캐싱
      // 3. 서버 상태 동기화
      next: {
        // 옵션을 지정하는 객체
        tags: ["trends"], // 요청과 관련된 태그를 배열형태로 지정
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
