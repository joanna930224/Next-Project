import { cookies } from "next/headers";
import { Room } from "@/models/room";

export async function getRooms({ queryKey }: { queryKey: [string, string] }) {
  const [_, id] = queryKey;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}/rooms`,
    {
      next: {
        tags: ["rooms", id],
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<Room[]>;
}
