"use client";
import usePlayerState from "@/hooks/usePlayerState";
import React from "react";
import { IoPlayCircle } from "react-icons/io5";

const PlaylistItem = ({ playList }) => {
  const { addSongList } = usePlayerState();
  const { owner, playlistName, songList } = playList;

  const onClickPlay = () => {
    addSongList(songList);
  };

  return (
    <li className="flex flex-row justify-between items-center mx-3 px-4 py-2 hover:bg-neutral-700 rounded-lg group">
      <div>
        <div className="text-[15px] font-[300]">{playlistName}</div>
        <div className="text-[12px] text-neutral-500">{owner}</div>
      </div>
      <div
        onClick={onClickPlay}
        className="hidden group-hover:block cursor-pointer"
      >
        <IoPlayCircle size={30} />
      </div>
    </li>
  );
};

export default PlaylistItem;
