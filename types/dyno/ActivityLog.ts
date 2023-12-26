import { User } from "./User";

export type ActivityLog = {
  entries: ActivityLogEntry[];
};

export type ActivityLogEntry = {
  createdAt: Date;
  user: User;
  action: string;
};
