"use client";
import { TopSong } from "@/types";
import React from "react";
import Image from "next/image";
import { FiPlay } from "react-icons/fi";
import { FiThumbsDown } from "react-icons/fi";
import { FiThumbsUp } from "react-icons/fi";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
import { FaCircle } from "react-icons/fa";
import IconButton from "./elements/IconButton";

type SongCardProps = {
  song: TopSong;
};

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  // TODO
  const onClickPlay = () => {};

  return (
    <article className="flex flex-row w-full h-[48px] gap-4 items-center relative group">
      <div className="w-[48px] h-[48px] relative">
        <Image src={song.imageSrc} fill alt="img" className="object-cover" />
        <section className="hidden group-hover:flex absolute top-0 w-[48px] h-[48px] items-center justify-center bg-black cursor-pointer">
          <FiPlay size={20} color="red" />
        </section>
      </div>
      <div className="flex flex-row items-center gap-4 absolute left-16">
        <div>
          {song.rank === song.prevRank ? (
            <FaCircle size={10} />
          ) : song.rank > song.prevRank ? (
            <AiOutlineCaretUp size={10} color="#3CA63F" />
          ) : (
            <AiOutlineCaretDown size={10} color="#FF0000" />
          )}
        </div>
        <div>{song.rank + 1}</div>
        <div>{song.name}</div>
      </div>
      <section className="hidden group-hover:flex absolute top-0 right-0 flex-row justify-end items-center h-[48px] w-1/2 bg-[rgba(0,0,0,0.7)]">
        <IconButton icon={<FiThumbsDown />} />
        <IconButton icon={<FiThumbsUp />} />
        <IconButton icon={<FiMoreVertical />} />
      </section>
    </article>
  );
};

export default SongCard;
