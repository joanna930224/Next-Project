import React from "react";

const page = async () => {
  // throw new Error("my error");
  return (
    <div className="min-h-[600px]">
      HomePage
      <div className="h-[500px] w-[100vh] bg-purple-900">HomePage</div>
      <div className="h-[500px] w-[100vh] bg-purple-800">HomePage</div>
      <div className="h-[500px] w-[100vh] bg-purple-900">HomePage</div>
      <div className="h-[500px] w-[100vh] bg-purple-800">HomePage</div>
    </div>
  );
};

export default page;
