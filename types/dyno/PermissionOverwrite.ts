export type PermissionOverwrite = {
  id: string;
  createdAt: number;
  allow: string;
  deny: string;
  type: number; // enum?
};
