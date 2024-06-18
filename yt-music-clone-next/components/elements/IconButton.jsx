import React from "react";

const IconButton = ({ icon, onClickIcon = () => {} }) => {
  return (
    <div
      onClick={onClickIcon}
      className="flex justify-center items-center cursor-pointer w-[36px] h-[36px] hover:bg-[rgba(144,144,144,0.45)] rounded-full"
    >
      {icon}
    </div>
  );
};

export default IconButton;
