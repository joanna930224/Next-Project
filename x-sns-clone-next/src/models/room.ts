import { User } from "@/models/user";

export interface Room {
  room: string;
  Receiver: User;
  Sender: User;
  content: string;
  createdAt: Date;
}
