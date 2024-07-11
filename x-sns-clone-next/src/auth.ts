import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import cookie from "cookie";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    // 미리 만들어둔 페이지를 등록
    signIn: "i/flow/login",
    newUser: "i/flow/signup",
  },
  callbacks: {
    jwt({ token }) {
      console.log("auth.ts jwt", token);
      return token;
    },
    session({ session, newSession, user }) {
      console.log("auth.ts session", session, newSession, user);
      return session;
    },
  },
  events: {
    signOut(data) {
      console.log(
        "auth.ts events signout",
        "session" in data && data.session,
        "token" in data && data.token
      );
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
    },
    session(data) {
      console.log(
        "auth.ts events session",
        "session" in data && data.session,
        "token" in data && data.token
      );
    },
  },
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          }
        );
        let setCookie = authResponse.headers.get("Set-Cookie");
        console.log("set-cookie : ", setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          // 브라우저에 쿠키를 심어주는 것
          cookies().set("connect.sid", parsed["connect.sid"], parsed);
        }
        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        console.log("user", user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
