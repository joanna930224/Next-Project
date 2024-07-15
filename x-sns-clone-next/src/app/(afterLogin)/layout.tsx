import { ReactNode } from "react";
import style from "./layout.module.css";
import Link from "next/link";
import Image from "next/image";
import xLogo from "../../../public/x_logo.svg";
import NavMenu from "@/app/(afterLogin)/_components/nav_menu";
import LogoutButton from "./_components/logout_button";
import TrendSection from "./_components/trend_section";
import FollowRecommend from "./_components/follow_recommend";
import RightSearchZone from "./_components/right_search_zone";
import RQProvider from "./_components/rq_provider";
import { auth } from "@/auth";
import FollowRecommendSection from "./_components/follow_recommend_section";
import PostButton from "./_components/post_button";

type Props = { children: ReactNode; modal: ReactNode };
export default async function AfterLoginLayout({ children, modal }: Props) {
  const session = await auth();

  console.log("session :" + session);

  return (
    <div className={style.container}>
      <RQProvider>
        <header className={style.leftSectionWrapper}>
          <section className={style.leftSection}>
            <div className={style.leftSectionFixed}>
              <Link className={style.logo} href="/home">
                <div className={style.logoPill}>
                  <Image src={xLogo} alt="logo" width={40} height={40} />
                </div>
              </Link>
              {session?.user && (
                <>
                  <nav>
                    <ul>
                      <NavMenu />
                    </ul>
                    <PostButton />
                  </nav>
                  <LogoutButton me={session} />
                </>
              )}
            </div>
          </section>
        </header>
        <div className={style.rightSectionWrapper}>
          <div className={style.rightSectionInner}>
            <main className={style.main}>{children}</main>
            <section className={style.rightSection}>
              <RightSearchZone />
              <TrendSection />
              <div className={style.followRecommend}>
                <h3>Who to follow</h3>
                <FollowRecommendSection />
              </div>
            </section>
          </div>
        </div>
        {modal}
      </RQProvider>
    </div>
  );
}
