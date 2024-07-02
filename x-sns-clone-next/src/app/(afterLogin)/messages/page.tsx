import Chat from "./_components/chat";
import EmptyChat from "./_components/empty_chat";
import style from "./messages.module.css";

export default function Home() {
  const isEmptyChat = false;

  {
    /* 아무 메시지 없을때 */
  }
  if (isEmptyChat) {
    return <EmptyChat />;
  }

  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>Messages</h3>
      </div>
      <Chat />
      <Chat />
      <Chat />
      <Chat />
    </main>
  );
}
