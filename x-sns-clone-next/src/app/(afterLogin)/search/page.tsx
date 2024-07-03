import BackButton from "../_components/back_button";
import Post from "../_components/post";
import SearchForm from "../_components/search_form";
import Tab from "../home/_components/tab";
import style from "./search.module.css";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function Page({ searchParams }: Props) {
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}
