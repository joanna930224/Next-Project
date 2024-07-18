"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../_lib/get_rooms";
import RoomItem from "./room_item";

export default function Rooms({ id }: { id: string }) {
  const { data: rooms, isPending } = useQuery({
    queryKey: ["rooms", id],
    queryFn: getRooms,
  });
  if (isPending) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        Loading...
      </div>
    );
  }
  if (!rooms?.length) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        {"You can send a message from someone else's profile."}
      </div>
    );
  }
  return rooms.map((room) => <RoomItem key={room.room} room={room} />);
}
