/**
 * i18n/navigation.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Locale-aware navigation primitives. Import Link / redirect / etc.
 * from here instead of next/link / next/navigation so URLs get
 * prefixed with the active locale automatically.
 *
 * Example: <Link href="/pricing"> on the /fr route resolves to /fr/pricing.
 * No manual locale interpolation needed in components.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);
