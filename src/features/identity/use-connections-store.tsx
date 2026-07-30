"use client";

import * as React from "react";
import { emptyConnectionsState, type ConnectionsState, type PlatformKey } from "./types";

const STORAGE_KEY = "onboardchain-connections";
const MOCK_CONNECT_DELAY_MS = 700;

interface ConnectionsStore {
  connections: ConnectionsState;
  connectingPlatform: PlatformKey | null;
  hydrated: boolean;
  connectedCount: number;
  connect: (platform: PlatformKey) => Promise<void>;
}

const ConnectionsContext = React.createContext<ConnectionsStore | null>(null);

export function ConnectionsProvider({ children }: { children: React.ReactNode }) {
  const [connections, setConnections] = React.useState<ConnectionsState>(emptyConnectionsState);
  const [connectingPlatform, setConnectingPlatform] = React.useState<PlatformKey | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setConnections(JSON.parse(stored));
    } catch {
      // localStorage unavailable — start fresh, in-memory only
    } finally {
      setHydrated(true);
    }
  }, []);

  const connect = React.useCallback(async (platform: PlatformKey) => {
    setConnectingPlatform(platform);

    // No OAuth backend yet — this simulates the round trip so the UI
    // (loading state → connected state) is real and testable today,
    // and becomes a genuine OAuth call later without changing callers.
    await new Promise((resolve) => setTimeout(resolve, MOCK_CONNECT_DELAY_MS));

    setConnections((prev) => {
      const next = { ...prev, [platform]: true };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore write failures
      }
      return next;
    });
    setConnectingPlatform(null);
  }, []);

  const connectedCount = Object.values(connections).filter(Boolean).length;

  const value = React.useMemo(
    () => ({ connections, connectingPlatform, hydrated, connectedCount, connect }),
    [connections, connectingPlatform, hydrated, connectedCount, connect]
  );

  return <ConnectionsContext.Provider value={value}>{children}</ConnectionsContext.Provider>;
}

export function useConnectionsStore() {
  const ctx = React.useContext(ConnectionsContext);
  if (!ctx) throw new Error("useConnectionsStore must be used within ConnectionsProvider");
  return ctx;
}
