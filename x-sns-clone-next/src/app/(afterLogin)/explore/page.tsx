import style from "./explore.module.css";
import SearchForm from "../_components/search_form";
import TrendSection from "./_components/trend_section";

export default function Page() {
  return (
    <main className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>South Korea trends</h3>
        <TrendSection />
      </div>
    </main>
  );
}
