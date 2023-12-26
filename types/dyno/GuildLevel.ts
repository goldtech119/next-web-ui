import { User } from "./User";

export type GuildLevel = {
  guildId: string;
  userId: string;
  user?: User;
  points: number;
  lastNotifiedLevel: number;
  lastGrantedXp: Date;
  xpForLastLevel: number;
  xpToNextLevel: number;
  level: number;
  totalMessages: number;
};
