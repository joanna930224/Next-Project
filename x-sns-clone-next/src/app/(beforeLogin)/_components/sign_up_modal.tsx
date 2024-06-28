"use client";

import style from "@/app/(beforeLogin)/_components/sign_up.module.css";
import { useState, ChangeEventHandler } from "react";
import xLogo from "../../../../public/x_logo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function SignUpModal() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File>();

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNickname(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.target.files && setImageFile(e.target.files[0]);
  };

  const onSubmit = () => {};

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <button className={style.closeButton} onClick={onClickClose}>
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div className={style.modalLogo}>
            <Image src={xLogo} width={40} height={40} alt="logo" />
          </div>
        </div>
        <div className={style.modalTitle}>
          <div>계정을 생성하세요</div>
        </div>
        <div className={style.snsButtonGroup}>
          <button className={style.snsButton}>
            <div>
              <FcGoogle size={20} />
            </div>
            <div>Google 계정으로 가입하기</div>
          </button>
          <button className={style.snsButton}>
            <div>
              <FaApple size={20} />
            </div>
            <div>Apple에서 가입하기</div>
          </button>
        </div>
        <div className={style.divider}>또는</div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                className={style.input}
                value={id}
                onChange={onChangeId}
                type="text"
                placeholder=""
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="nickname">
                닉네임
              </label>
              <input
                id="nickname"
                className={style.input}
                value={nickname}
                onChange={onChangeNickname}
                type="nickname"
                placeholder=""
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className={style.input}
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder=""
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="image">
                프로필
              </label>
              <input
                id="image"
                className={style.inputFile}
                type="file"
                accept="image/*"
                onChange={onChangeImageFile}
              />
            </div>
          </div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled>
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
