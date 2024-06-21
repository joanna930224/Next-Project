import React from "react";
import PagePadding from "@/components/PagePadding";
import PlayListCarousel from "@/components/PlayListCarousel";
import {
  getAllPlaylist,
  getSongListTop10,
  dymmyGenreList,
} from "@/lib/dummyData";
import Category from "./components/category";
import SongListCarousel from "@/components/SongListCarousel";
import GenreListCarousel from "@/components/GenreListCarousel";

const page = async () => {
  const [playlistArray, songListTop10] = await Promise.all([
    getAllPlaylist(),
    getSongListTop10(),
  ]);

  return (
    <PagePadding>
      <div className="mt-9"></div>
      <Category />
      <div className="mt-20"></div>
      <PlayListCarousel playListArray={playlistArray} title="새 앨범 및 싱글" />
      <div className="mt-20"></div>
      <SongListCarousel songListTop10={songListTop10} title="인기곡" />
      <div className="mt-20"></div>
      <GenreListCarousel genreList={dymmyGenreList} title="분위기 및 장르" />
      <div className="mt-40"></div>
    </PagePadding>
  );
};

export default page;
