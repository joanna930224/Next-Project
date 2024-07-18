"use client";

import { useEffect } from "react";
import useSocket from "../[room]/_lib/use_socket";
import { useQueryClient } from "@tanstack/react-query";
import { Room } from "@/models/room";

export default function WebSocketComponent({ id }: { id: string }) {
  const [socket] = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("webSocketComponent");

    socket?.on("receiveMessage", (data) => {
      console.log("data", data);

      const exRooms = queryClient.getQueryData(["rooms", id]) as Room[];
      const index = exRooms.findIndex((room) => room.room === data.room);
      const newRooms = [...exRooms];

      if (index > -1) {
        newRooms[index] = {
          ...newRooms[index],
          createdAt: data.createdAt,
          content: data.content,
        };
      } else {
        newRooms.push(data);
      }
      queryClient.setQueryData(["rooms", id], newRooms);
    });

    return () => {
      socket?.off("receiveMessage");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return null;
}
