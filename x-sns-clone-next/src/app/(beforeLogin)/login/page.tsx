"use client";
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";
import Main from "../_components/main";

export default function Login() {
  const router = useRouter();
  router.replace("/i/flow/login");

  return <Main />;
}
