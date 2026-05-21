'use client';

import { useEffect, useState } from 'react';

/**
 * SSR-safe `prefers-reduced-motion: reduce` watcher.
 * Returns `true` only after mount, so the server renders the
 * full-motion variant and the client downgrades if requested.
 * Updates live if the user changes the OS-level setting.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
