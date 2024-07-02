import React from "react";
import style from "../messages.module.css";

const EmptyChat = () => {
  return (
    <>
      <div className={style.emptyMessage}>
        <h2>Welcome to your inbox!</h2>
        <div>
          Drop a line, share posts and more with private
          <br />
          conversations between you and others on X.
        </div>
      </div>
    </>
  );
};

export default EmptyChat;
