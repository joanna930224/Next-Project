"use client";

import style from "@/app/(beforeLogin)/_components/sign_up.module.css";
import xLogo from "../../../../public/x_logo.svg";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useFormState, useFormStatus } from "react-dom";
import onSubmit from "../_lib/sing_up";
import BackButton from "@/app/(afterLogin)/_components/back_button";

function showMessage(message: string | null) {
  console.log("message", message);
  if (message === "no_id") {
    return "아이디를 입력하세요.";
  }
  if (message === "no_name") {
    return "닉네임을 입력하세요.";
  }
  if (message === "no_password") {
    return "비밀번호를 입력하세요.";
  }
  if (message === "no_image") {
    return "이미지를 업로드하세요.";
  }
  if (message === "user_exists") {
    return "이미 사용 중인 아이디입니다.";
  }
  return "";
}

export default function SignUpModal() {
  const [state, formAction] = useFormState(onSubmit, { message: null });
  const { pending } = useFormStatus();

  return (
    <div className={style.modalBackground}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <BackButton />
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
        <form action={formAction}>
          <div className={style.modalBody}>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="id">
                아이디
              </label>
              <input
                id="id"
                className={style.input}
                name="id"
                type="text"
                placeholder=""
                required
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="name">
                닉네임
              </label>
              <input
                id="name"
                className={style.input}
                name="name"
                type="text"
                placeholder=""
                required
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                id="password"
                className={style.input}
                name="password"
                type="password"
                placeholder=""
                required
              />
            </div>
            <div className={style.inputDiv}>
              <label className={style.inputLabel} htmlFor="image">
                프로필
              </label>
              <input
                id="image"
                name="image"
                className={style.inputFile}
                type="file"
                accept="image/*"
                required
              />
            </div>
          </div>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled={pending}>
              가입하기
            </button>
            <div className={style.error}>{showMessage(state?.message)}</div>
          </div>
        </form>
      </div>
    </div>
  );
}
