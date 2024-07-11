export { auth as middleware } from "@/auth";

export const config = {
  // 로그인 해야지만 볼 수 있는 페이지
  matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
};
