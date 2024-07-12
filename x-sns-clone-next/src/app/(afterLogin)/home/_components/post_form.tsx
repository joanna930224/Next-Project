"use client";

import { ChangeEventHandler, useRef, useState, FormEvent } from "react";
import style from "./post_form.module.css";
import Image from "next/image";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Session } from "next-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/models/post";

type Props = {
  me: Session | null;
};

export default function PostForm({ me }: Props) {
  const imageRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);
  const queryClient = useQueryClient();

  // 요청 후 다시 렌더링하기 위해서 refetch가 필요한 상황이 생기기때문에
  // 공식문서에서는 post,put,delete의 경우 useMutation 사용을 권장함
  // const onSubmit: FormEventHandler = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("content", content);
  //   preview.forEach((p) => {
  //     p && formData.append("images", p.file);
  //   });
  //   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
  //     method: "post",
  //     credentials: "include",
  //     body: formData,
  //   });
  // };

  const mutation = useMutation({
    // 사용자가 폼을 제출해도 페이지가 새로고침 되지 않고,
    // 지정된 비동기 함수 mutationFn를 실행
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
      // 업로드 내용 초기화
      setContent("");
      setPreview([]);

      //추천 탭
      if (queryClient.getQueryData(["posts", "recommends"])) {
        // 캐시에 저장된 데이터를 업데이트
        queryClient.setQueryData(
          // 캐시된 데이터 참조
          ["posts", "recommends"],
          // 페이지네이션된 포스트 목록
          (prevData: { pages: Post[][] }) => {
            // prevData의 얕은복사
            const shallow = {
              ...prevData,
              pages: [...prevData.pages],
            };
            // 첫번째 페이지의 얕은 복사
            shallow.pages[0] = [...shallow.pages[0]];
            // 배열의 맨 앞에 추가
            shallow.pages[0].unshift(newPost);
            return shallow;
          }
        );
      }

      // 팔로잉 탭
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
  });

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

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

  return (
    <form className={style.postForm} onSubmit={mutation.mutate}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <Image
            src={me?.user?.image as string}
            width={40}
            height={40}
            alt={me?.user?.email as string}
          />
        </div>
      </div>
      <div className={style.postInputSection}>
        <textarea
          value={content}
          onChange={onChange}
          placeholder="What is happening?!"
        />
        <div style={{ display: "flex" }}>
          {preview.map(
            (v, index) =>
              v && (
                <div key={index} onClick={onRemoveImage(index)}>
                  <Image src={v.dataUrl} alt="preview" width={50} height={50} />
                </div>
              )
          )}
        </div>
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
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
            <button className={style.actionButton} disabled={!content}>
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
