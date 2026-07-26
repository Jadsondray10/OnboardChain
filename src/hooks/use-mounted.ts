"use client";

import { useEffect, useState } from "react";

/**
 * Guards against hydration mismatches for client-only UI (e.g. theme toggles).
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
