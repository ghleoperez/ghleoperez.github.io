'use client';

import { useEffect } from 'react';
import { recordVisit } from '@/lib/analytics';

export default function AnalyticsTracker() {
  useEffect(() => {
    // Small delay to ensure page load
    const timeoutId = setTimeout(() => {
      recordVisit();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
