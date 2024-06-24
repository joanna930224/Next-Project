import React from "react";
import PagePadding from "@/components/PagePadding";
import Category from "./components/category";
import PlayListCard from "@/components/PlayListCard";
import { getRandomElementFromArray } from "@/lib/utils";
import { dummyPlaylistArray } from "@/lib/dummyData";

const page = () => {
  const playListCardArr = Array.from({ length: 15 }, (_, index) => (
    <PlayListCard
      key={index}
      playList={getRandomElementFromArray(dummyPlaylistArray)}
    />
  ));

  return (
    <PagePadding>
      <div className="mt-9"></div>
      <Category />
      <div className="mt-12"></div>
      <section className="grid grid-cols-3 gap-6 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {playListCardArr}
      </section>
    </PagePadding>
  );
};

export default page;
