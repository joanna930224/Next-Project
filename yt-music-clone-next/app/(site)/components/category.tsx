"use client";
import React from "react";
import useUIState from "@/hooks/useUiState";
import { homeCategoryList } from "@/lib/dummyData";
import { cn } from "@/lib/utils";

type Category = {
  label: string;
  src: string;
};

const Category = () => {
  const { homeCategory, setHomeCategory, setHomeImageSrc } = useUIState();

  const onClickCategory = (item: Category) => {
    if (homeCategory === item.label) {
      return;
    }

    setHomeCategory(item.label);
    setHomeImageSrc(item.src);
  };

  return (
    <ul className="flex flex-row gap-4 max-w-full overflow-x-auto">
      {homeCategoryList.map((item) => (
        <li
          onClick={() => onClickCategory(item)}
          className={cn(
            "flex justify-center items-center border border-transparent min-w-fit bg-[rgba(144,144,144,0.2)] hover:bg-[rgba(144,144,144,0.45)] text-white px-3 py-2 rounded-md cursor-pointer",
            item.label === homeCategory && "bg-white text-black hover:bg-white"
          )}
          key={item.label}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default Category;
