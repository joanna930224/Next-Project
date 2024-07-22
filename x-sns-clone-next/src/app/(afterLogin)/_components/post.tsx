import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "./action_buttons";
import PostArticle from "./post_article";
import PostImages from "./post_images";
import Image from "next/image";
import { Post as PostModel } from "@/models/post";
import { MouseEventHandler } from "react";
import PostMoreButton from "./post_more_button";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
  post: PostModel;
};

export default function Post({ noImage, post }: Props) {
  let target = post;

  if (post.Original) {
    target = post.Original;
  }

  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <PostArticle post={target}>
      {post.Original && (
        <div className={style.postReported}>
          <svg
            viewBox="0 0 24 24"
            width={16}
            aria-hidden="true"
            className="r-14j79pv r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
          >
            <g>
              <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
            </g>
          </svg>
          {post.User.nickname} reposted
        </div>
      )}
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link
            href={`/${target.User.id}`}
            className={style.postUserImage}
            onClick={stopPropagation}
          >
            <Image
              src={target.User.image}
              width={40}
              height={40}
              alt={target.User.nickname}
            />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.topInfo}>
            <div className={style.postMeta}>
              <Link href={`/${target.User.id}`} onClick={stopPropagation}>
                <span className={style.postUserName}>
                  {target.User.nickname}
                </span>
                &nbsp;
                <span className={style.postUserId}>@{target.User.id}</span>
                &nbsp; · &nbsp;
              </Link>
              <span className={style.postDate}>
                {dayjs(target.createdAt).fromNow(true)}
              </span>
            </div>
            <div className={style.moreButton}>
              <PostMoreButton post={post} />
            </div>
          </div>
          {target.Parent && (
            <div className={style.reply}>
              <div>Replying to</div>
              <Link
                href={`/${target.Parent.User.id}`}
                style={{ color: "rgb(29, 155, 240)" }}
                onClick={stopPropagation}
              >
                @{target.Parent.User.id}
              </Link>
            </div>
          )}
          <div>{target.content}</div>
          {!noImage && (
            <div>
              <PostImages post={target} />
            </div>
          )}
          <ActionButtons post={target} />
        </div>
      </div>
    </PostArticle>
  );
}
