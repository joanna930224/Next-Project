import { PlayList } from "@/types";
import React from "react";
import PlayListCard from "@/components/PlayListCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type PlayListCarouselProps = {
  title: string;
  subTitle?: string;
  Thumbnail?: React.ReactNode;
  playListArray?: PlayList[];
};

const PlayListCarousel = ({
  title,
  subTitle,
  Thumbnail,
  playListArray,
}: PlayListCarouselProps) => {
  return (
    <div className="w-full">
      <Carousel>
        <div className="flex flex-row justify-between items-end my-2">
          <article className="flex flex-row gap-3">
            {Thumbnail}
            <div className="flex flex-col justify-center">
              <div>
                {subTitle && (
                  <div className=" text-neutral-500">{subTitle}</div>
                )}
              </div>
              <div className="text-[34px] font-bold leading-[34px] ">
                {title}
              </div>
            </div>
          </article>
          <div className="relative left-[-45px]">
            <div className="absolute bottom-[20px]">
              <CarouselPrevious className="right-2" />
              <CarouselNext className="left-2" />
            </div>
          </div>
        </div>
        <CarouselContent className="mt-4">
          {playListArray?.map((playList, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
            >
              <PlayListCard playList={playList} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PlayListCarousel;
