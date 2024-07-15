"use client";

import { useRouter } from "next/navigation";
import style from "./right_search_zone.module.css";
import { FiSearch } from "react-icons/fi";
import { FormEventHandler } from "react";

type Props = { q?: string };
export default function SearchForm({ q }: Props) {
  const router = useRouter();
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    router.push(`/search?q=${event.currentTarget.search.value}`);
  };

  return (
    <form className={style.search} onSubmit={onSubmit}>
      <FiSearch size={24} />
      <input name="search" type="search" />
    </form>
  );
}
