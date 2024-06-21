import { genreateRandomHex } from "@/lib/utils";
import { PropsWithChildren } from "react";
import React from "react";

type GenreCardProps = {
  genre: string;
};

const GenreCard = ({ genre }: PropsWithChildren<GenreCardProps>) => {
  const hex = genreateRandomHex();
  return (
    <div className="flex flex-row h-[48px] cursor-pointer bg-neutral-800 rounded-lg ">
      <div
        className="h-[48px] w-2 rounded-l-lg absolute"
        style={{ backgroundColor: hex }}
      ></div>
      <div className="px-2 flex items-center">
        <div className="w-[160px] px-2 absolute">{genre}</div>
      </div>
    </div>
  );
};

export default GenreCard;
