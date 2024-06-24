import React from "react";

type ChannelPageProps = {
  params: {
    id: string;
  };
};

// props : params - id(string)
const page = (props: ChannelPageProps) => {
  return <div>channel {props.params.id}</div>;
};

export default page;
