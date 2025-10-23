'use client';

// Development-only probe to inspect hydration-time mutations on <body>.
// It logs body attributes shortly after mount to detect browser extensions (e.g. Grammarly)
// that inject data-* attributes and cause React hydration mismatches.

import { useEffect } from 'react';

function snapshotBodyAttributes(): Record<string, string> {
  const out: Record<string, string> = {};
  const body = document.body;
  for (const attr of Array.from(body.attributes)) {
    out[attr.name] = attr.value;
  }
  return out;
}

function hasGrammarlyMarkers(attrs: Record<string, string>): boolean {
  return (
    'data-new-gr-c-s-check-loaded' in attrs ||
    'data-gr-ext-installed' in attrs
  );
}

export default function HydrationProbe() {
  useEffect(() => {
    const log = (label: string) => {
      const attrs = snapshotBodyAttributes();
      const dataAttrs = Object.fromEntries(
        Object.entries(attrs).filter(([k]) => k.startsWith('data-'))
      );
      const grammarly = hasGrammarlyMarkers(attrs);
      // Grouped logs to keep console tidy
      // eslint-disable-next-line no-console
      console.groupCollapsed(
        `%c[HydrationProbe]%c ${label}`,
        'color:#0891b2;font-weight:600',
        'color:inherit'
      );
      // eslint-disable-next-line no-console
      console.log('NODE_ENV:', process.env.NODE_ENV);
      // eslint-disable-next-line no-console
      console.log('window type:', typeof window);
      // eslint-disable-next-line no-console
      console.log('body.className:', document.body.className);
      // eslint-disable-next-line no-console
      console.log('body data-* attrs:', dataAttrs);
      if (grammarly) {
        // eslint-disable-next-line no-console
        console.warn(
          'Detected Grammarly attributes on <body>. These can cause React hydration mismatches.'
        );
      }
      // eslint-disable-next-line no-console
      console.groupEnd();
    };

   // Log at mount and after small delays in case extensions inject late.
    log('on-mount');
    const t1 = setTimeout(() => log('after-100ms'), 100);
    const t2 = setTimeout(() => log('after-1000ms'), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  return null;
}