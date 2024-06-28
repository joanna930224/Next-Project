import style from "./right_search_zone.module.css";
import { FiSearch } from "react-icons/fi";

type Props = { q?: string };
export default function SearchForm({ q }: Props) {
  return (
    <form className={style.search}>
      <FiSearch size={24} />
      <input type="search" />
    </form>
  );
}
