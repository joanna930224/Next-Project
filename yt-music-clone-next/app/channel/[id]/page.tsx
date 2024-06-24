import React from "react";
import { getChannelById } from "@/lib/dummyData";
import { permanentRedirect } from "next/navigation";
import PagePadding from "@/components/PagePadding";
import HeaderBgChanger from "@/components/HeaderBgChanger";
import { getRandomElementFromArray } from "@/lib/utils";
import ChannelHead from "../components/ChannelHead";
import SongCardRowExpand from "@/components/SongCardRowExpand";
import PlayListCarousel from "@/components/PlayListCarousel";

type ChannelPageProps = {
  params: {
    id: string;
  };
};

const page = async (props: ChannelPageProps) => {
  const channel = await getChannelById(Number(props.params.id));

  console.log(props.params.id);

  // if (!channel) permanentRedirect("/");

  const imageSrc = getRandomElementFromArray(channel.songList)?.imageSrc;

  return (
    <PagePadding>
      <HeaderBgChanger imageSrc={imageSrc} />
      <div className="mt-12"></div>
      <ChannelHead channel={channel} />
      <div className="mt-12"></div>
      <section className="mt-[80px]">
        <div className="font-bold text-[34px] ">노래</div>
        <div className="mt-[20px]">
          <ul className="flex flex-col gap-2">
            {channel.songList.map((song, idx) => {
              return <SongCardRowExpand song={song} key={idx} />;
            })}
          </ul>
        </div>
      </section>
      <section className="mt-[80px]">
        <PlayListCarousel title="앨범" playListArray={channel.playlistArray} />
      </section>
    </PagePadding>
  );
};

export default page;
