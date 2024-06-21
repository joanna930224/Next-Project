"use client";
import { getRandomElementFromArray } from "@/lib/utils";
import { PlayList } from "@/types";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdMoreVert } from "react-icons/md";
import { FiPlay } from "react-icons/fi";
import IconButton from "./elements/IconButton";

const PlayListCard: React.FC<{ playList: PlayList }> = ({ playList }) => {
  const { push } = useRouter();
  const { id, owner, playlistName, songList } = playList;

  const imageSrc = getRandomElementFromArray(songList).imageSrc;

  const onClickCard = () => {
    push(`/playlist?list=${id}`);
  };

  // TODO
  const onClickPlay = () => {};

  return (
    <article className="lg:h-[240px] h-[300px] cursor-pointer group">
      <section
        onClick={onClickCard}
        className="relative lg:h-[136px] h-[240px]"
      >
        <Image src={imageSrc} fill={true} alt="thumbnail" />
        <div className="hidden relative group-hover:block bg-gradient-to-b from-[rgba(0,0,0,0.7)] top-0 w-full lg:h-[136px] h-[240px]">
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
      <section>
        <div>{playlistName}</div>
        <div className="text-neutral-500">{`${owner} - 트랙 ${songList.length}개`}</div>
      </section>
    </article>
  );
};

export default PlayListCard;
