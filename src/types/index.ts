export * from "./wallet";
export * from "./profile";
export * from "./opportunity";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
}
