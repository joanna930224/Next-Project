import React from "react";
import Category from "./components/category";
import PagePadding from "@/components/PagePadding";
import PlayListCarousel from "@/components/PlayListCarousel";
import { dummyPlaylistArray, getPlaylistById } from "@/lib/dummyData";
import UserIcon from "@/components/UserIcon";

const page = async () => {
  const dummyPlaylistArray1 = [...dummyPlaylistArray];
  const dummyPlaylistArray2 = [await getPlaylistById(1)];
  const dummyPlaylistArray3 = [await getPlaylistById(2)];
  const dummyPlaylistArray4 = [await getPlaylistById(3)];

  // throw new Error("my error");
  return (
    <PagePadding>
      <div className="min-h-[600px] ">
        <div className="mt-9"></div>
        <Category />
        <div className="mt-12"></div>
        <PlayListCarousel
          playListArray={[...dummyPlaylistArray1]}
          Thumbnail={
            <div className="w-[56px] h-[56px]">
              <UserIcon size={"lg"} />
            </div>
          }
          title="다시 듣기"
          subTitle="KUN"
        />
        <div className="mt-20"></div>
        <PlayListCarousel
          playListArray={[...dummyPlaylistArray2]}
          title="RUCY - Flare"
          subTitle="새로운 앨범"
        />
        <div className="mt-20"></div>

        <PlayListCarousel
          playListArray={[...dummyPlaylistArray3]}
          title="커뮤니티 제공"
        />
        <div className="mt-20"></div>
        <PlayListCarousel
          playListArray={[...dummyPlaylistArray4]}
          title="커버 및 리믹스"
        />
      </div>
    </PagePadding>
  );
};

export default page;
