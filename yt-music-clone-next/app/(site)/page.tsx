import React from "react";
import Category from "./components/category";
import PagePadding from "@/components/PagePadding";

const page = async () => {
  // throw new Error("my error");
  return (
    <PagePadding>
      <div className="min-h-[600px] mt-10">
        <Category />
      </div>
    </PagePadding>
  );
};

export default page;
