export type PlatformKey = "x" | "discord" | "github" | "linkedin";

export interface ConnectionsState {
  x: boolean;
  discord: boolean;
  github: boolean;
  linkedin: boolean;
}

export const emptyConnectionsState: ConnectionsState = {
  x: false,
  discord: false,
  github: false,
  linkedin: false,
};
