import BackButton from "../../_components/back_button";
import style from "./chat.module.css";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import cx from "classnames";
import ChatProfile from "./_components/chat_profile";
import ChatForm from "./_components/chat_form";

export default function Home() {
  //더미 데이터
  const user = {
    id: "lol_champion_korea",
    nickname: "LCK",
    image: "/lck.jpeg",
  };

  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: "lol_champion_korea",
      content: "안녕하세요.",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 123,
      id: "jo_kun",
      content: "안녕히가세요.",
      createdAt: new Date(),
    },
  ];

  return (
    <main className={style.main}>
      <div className={style.header}>
        <BackButton />
        <h3>{user.nickname}</h3>
      </div>
      <div>
        <ChatProfile />
      </div>
      <div className={style.list}>
        {messages.map((m) => {
          if (m.id === "jo_kun") {
            return (
              <div
                key={m.messageId}
                className={cx(style.message, style.myMessage)}
              >
                <div className={style.content}>{m.content}</div>
                <div className={style.date}>
                  {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
                </div>
              </div>
            );
          }
          return (
            <div
              key={m.messageId}
              className={cx(style.message, style.yourMessage)}
            >
              <div className={style.content}>{m.content}</div>
              <div className={style.date}>
                {dayjs(m.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <ChatForm />
      </div>
    </main>
  );
}
