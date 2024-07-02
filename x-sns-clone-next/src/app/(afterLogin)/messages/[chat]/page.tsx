import BackButton from "../../_components/back_button";
import style from "./chat.module.css";

export default function Home() {
  //더미 데이터
  const user = {
    id: "lol_champion_korea",
    nickname: "LCK",
    image: "/lck.jpeg",
  };

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3>{user.nickname}</h3>
      </div>
    </main>
  );
}
