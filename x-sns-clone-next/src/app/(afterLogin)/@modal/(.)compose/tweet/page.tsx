"use client";

import { useRouter } from "next/navigation";
import style from "./modal.module.css";
import Image from "next/image";
import {
  useRef,
  useState,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
} from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { RiCloseFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Post } from "@/models/post";
import { useModalStore } from "@/store/modal";
import Link from "next/link";

const TweetModal = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [content, setContent] = useState("");
  const { data: me } = useSession();
  const [preview, setPreview] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);
  const queryClient = useQueryClient();
  const modalStore = useModalStore();

  const parent = modalStore.data;

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("content", content);
      preview.forEach((p) => {
        p && formData.append("images", p.file);
      });
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        method: "post",
        credentials: "include",
        body: formData,
      });
    },
    async onSuccess(response, variable) {
      const newPost = await response.json();
      setContent("");
      setPreview([]);

      if (queryClient.getQueryData(["posts", "recommends"])) {
        queryClient.setQueryData(
          ["posts", "recommends"],
          (prevData: { pages: Post[][] }) => {
            const shallow = {
              ...prevData,
              pages: [...prevData.pages],
            };
            shallow.pages[0] = [...shallow.pages[0]];
            shallow.pages[0].unshift(newPost);
            return shallow;
          }
        );
      }

      if (queryClient.getQueryData(["posts", "followings"])) {
        queryClient.setQueryData(
          ["posts", "followings"],
          (prevData: { pages: Post[][] }) => {
            const shallow = {
              ...prevData,
              pages: [...prevData.pages],
            };
            shallow.pages[0] = [...shallow.pages[0]];
            shallow.pages[0].unshift(newPost);
            return shallow;
          }
        );
      }
    },
    onError(error) {
      console.error(error);
      alert("업로드 중 에러가 발생했습니다.");
    },
    onSettled() {
      modalStore.reset();
      router.back();
    },
  });

  const comment = useMutation({
    mutationFn: (e: FormEvent) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("content", content);

      preview.forEach((p) => {
        p && formData.append("images", p.file);
      });
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${parent?.postId}/comments`,
        {
          method: "post",
          credentials: "include",
          body: formData,
        }
      );
    },
    async onSuccess(response, variable) {
      const newPost = await response.json();
      setContent("");
      setPreview([]);
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      console.log("queryKeys", queryKeys);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "posts") {
          console.log(queryKey[0]);
          const value: Post | InfiniteData<Post[]> | undefined =
            queryClient.getQueryData(queryKey);
          if (value && "pages" in value) {
            console.log("array", value);
            const obj = value.pages
              .flat()
              .find((v) => v.postId === parent?.postId);
            if (obj) {
              const pageIndex = value.pages.findIndex((page) =>
                page.includes(obj)
              );
              const index = value.pages[pageIndex].findIndex(
                (v) => v.postId === parent?.postId
              );
              console.log("found index", index);
              const shallow = { ...value };
              value.pages = { ...value.pages };
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Comments: [{ userId: me?.user?.email as string }],
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Comments: shallow.pages[pageIndex][index]._count.Comments + 1,
                },
              };
              shallow.pages[0].unshift(newPost);
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            if (value.postId === parent?.postId) {
              const shallow = {
                ...value,
                Comments: [{ userId: me?.user?.email as string }],
                _count: {
                  ...value._count,
                  Comments: value._count.Comments + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
      await queryClient.invalidateQueries({
        queryKey: ["trends"],
      });
    },
    onError(error) {
      console.error(error);
      alert("업로드 중 에러가 발생했습니다.");
    },
    onSettled() {
      modalStore.reset();
      router.back();
    },
  });

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.files) {
      Array.from(e.target.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview((prevPreview) => {
            const prev = [...prevPreview];
            prev[index] = {
              dataUrl: reader.result as string,
              file,
            };
            return prev;
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const onRemoveImage = (index: number) => () => {
    setPreview((prevPreview) => {
      const prev = [...prevPreview];
      prev[index] = null;
      return prev;
    });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    if (modalStore.mode === "comment") {
      comment.mutate(e);
    } else {
      mutation.mutate(e);
    }
  };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onClickClose = () => {
    router.back();
  };

  const onChangeContent: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className={style.background}>
      <div className={style.modal}>
        <button className={style.closeButton}>
          <RiCloseFill onClick={onClickClose} size={20} />
        </button>
        <form className={style.postForm} onSubmit={onSubmit}>
          {modalStore.mode === "comment" && parent && (
            <div className={style.modalOriginal}>
              <div className={style.postUserSection}>
                <div className={style.postUserImage}>
                  <Image
                    src={parent.User.image}
                    width={50}
                    height={50}
                    alt={parent.User.id}
                  />
                </div>
              </div>
              <div>
                {parent.content}
                <div className={style.reply}>
                  <div>Replying to</div>
                  <Link
                    href={`/${parent.User.id}`}
                    style={{ color: "rgb(29, 155, 240)" }}
                  >
                    @{parent.User.id}
                  </Link>{" "}
                </div>
              </div>
            </div>
          )}
          <div className={style.modalBody}>
            <div className={style.postUserSection}>
              <div className={style.postUserImage}>
                <Image
                  src={me?.user?.image as string}
                  width={40}
                  height={40}
                  alt={me?.user?.id as string}
                />
              </div>
            </div>
            <div className={style.postInputSection}>
              <textarea
                value={content}
                onChange={onChangeContent}
                placeholder={
                  modalStore.mode === "comment"
                    ? "Post your reply"
                    : "What is happening?!"
                }
              />
            </div>
          </div>
          <div className={style.postButtonSection}>
            <div className={style.footerButtons}>
              <div>
                <input
                  type="file"
                  name="imageFiles"
                  multiple
                  hidden
                  ref={imageRef}
                  onChange={onUpload}
                />
                <button
                  className={style.uploadButton}
                  type="button"
                  onClick={onClickButton}
                >
                  <HiOutlinePhotograph color={"#1d9bf0"} size={24} />
                </button>
              </div>
              <div className={style.preview}>
                {preview.map(
                  (v, index) =>
                    v && (
                      <div key={index} onClick={onRemoveImage(index)}>
                        <Image
                          src={v.dataUrl}
                          alt="preview"
                          width={50}
                          height={50}
                        />
                      </div>
                    )
                )}
              </div>
              <button className={style.actionButton} disabled={!content}>
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetModal;
