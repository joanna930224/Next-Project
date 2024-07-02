import { FiSearch } from "react-icons/fi";
import ChatItem from "./_components/chat_item";
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
      <div>
        <form className={style.search}>
          <FiSearch size={24} />
          <input type="search" placeholder="Search Direct Messages" />
        </form>
      </div>
      <ChatItem />
      <ChatItem />
      <ChatItem />
      <ChatItem />
    </main>
  );
}
