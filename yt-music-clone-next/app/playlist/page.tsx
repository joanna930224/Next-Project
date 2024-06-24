import HeaderBgChanger from "@/components/HeaderBgChanger";
import PagePadding from "@/components/PagePadding";
import { getPlaylistById } from "@/lib/dummyData";
import { getRandomElementFromArray } from "@/lib/utils";
import { permanentRedirect } from "next/navigation";
import PlayListHead from "@/components/PlayListHead";
import React from "react";
import SongCardRowExpand from "@/components/SongCardRowExpand";

type PlayListProps = {
  searchParams: {
    list: string;
  };
};

const page = async (props: PlayListProps) => {
  const playlist = await getPlaylistById(Number(props.searchParams.list));

  // 플레이 리스트 없을 때 홈으로 이동
  if (!playlist) permanentRedirect("/");

  const imageSrc = getRandomElementFromArray(playlist.songList)?.imageSrc;

  return (
    <PagePadding>
      <HeaderBgChanger imageSrc={imageSrc} />
      <div className="mt-12"></div>
      <PlayListHead playlist={playlist} />
      <div className="mt-12"></div>
      <section className="flex flex-col gap-2">
        {playlist.songList.map((song, idx) => {
          return <SongCardRowExpand song={song} key={idx} />;
        })}
      </section>
    </PagePadding>
  );
};

export default page;
