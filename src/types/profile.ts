export type ProfileRole =
  | "freelancer"
  | "designer"
  | "developer"
  | "writer"
  | "creator"
  | "student";

export interface Web3Profile {
  id: string;
  userId: string;
  displayName: string;
  bio?: string;
  roles: ProfileRole[];
  skills: string[];
  completionScore: number;
}
