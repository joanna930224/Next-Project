"use client";
import { getRandomElementFromArray } from "@/lib/utils";
import { PlayList } from "@/types";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdMoreVert } from "react-icons/md";
import { FiPlay } from "react-icons/fi";
import IconButton from "./elements/IconButton";
import usePlayerState from "@/hooks/usePlayerState";

const PlayListCard: React.FC<{ playList: PlayList }> = ({ playList }) => {
  const { addSongList } = usePlayerState();
  const { push } = useRouter();
  const { id, owner, playlistName, songList } = playList;

  const imageSrc = getRandomElementFromArray(songList).imageSrc;

  const onClickCard = () => {
    push(`/playlist?list=${id}`);
  };

  const onClickPlay = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    addSongList(songList);
  };

  return (
    <article className="h-[240px] 2xl:h-[260px] cursor-pointer group">
      <section
        onClick={onClickCard}
        className="relative h-[136px] 2xl:h-[200px]"
      >
        <Image
          src={imageSrc}
          fill={true}
          alt="thumbnail"
          className="object-cover rounded-md"
        />
        <div className="hidden relative group-hover:block bg-gradient-to-b from-[rgba(0,0,0,0.7)] top-0 w-full h-[136px] 2xl:h-[200px]">
          <div className="absolute top-2 right-2">
            <IconButton icon={<MdMoreVert size={20} />} />
          </div>
          <div
            onClick={onClickPlay}
            className="absolute bottom-4 right-4 flex items-center justify-center transform-gpu transition-transform hover:scale-110 bg-[rgba(0,0,0,0.7)] w-[45px] h-[45px] rounded-full hover:bg-[rgba(0,0,0,0.9)] pl-[2px]"
          >
            <FiPlay size={22} color="red" />
          </div>
        </div>
      </section>
      <section className="mt-2">
        <div>{playlistName}</div>
        <div className="text-neutral-500">{`${owner} - 트랙 ${songList.length}개`}</div>
      </section>
    </article>
  );
};

export default PlayListCard;
