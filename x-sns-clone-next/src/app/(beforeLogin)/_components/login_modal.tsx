"use client";

import style from "@/app/(beforeLogin)/_components/login.module.css";
import { useState, ChangeEventHandler, FormEventHandler } from "react";
import xLogo from "../../../../public/x_logo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const { replace, back } = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onClickClose = () => {
    back();
  };

  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await signIn("credentials", {
        username: id,
        password,
        redirect: false,
      });
      // 이렇게 진행시 무조건적으로 200코드가 날라와서 제대로 동작하지 않음
      // 정확한 원인을 파악하지 못해서 임시로 response?.error로 사용
      // if (!response?.ok) {
      if (response?.error) {
        setMessage("아이디와 비밀번호가 일치하지 않습니다.");
      } else {
        replace("/home");
      }
    } catch (err) {
      console.error(err);
      setMessage("아이디와 비밀번호가 일치하지 않습니다.");
    }
  };

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
          <div>X 로그인하기</div>
        </div>
        <div className={style.snsButtonGroup}>
          <button className={style.snsButton}>
            <div>
              <FcGoogle size={20} />
            </div>
            <div>Google 계정으로 로그인</div>
          </button>
          <button className={style.snsButton}>
            <div>
              <FaApple size={20} />
            </div>
            <div>Apple로 로그인하기</div>
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
            <div className={style.message}>{message}</div>
          </div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled={!id && !password}>
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
