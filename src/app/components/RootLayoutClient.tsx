'use client';

import { useEffect } from 'react';
import Navigation from './Navigation';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  // Clear navigation state on mount
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (!hasSeenSplash) {
      localStorage.removeItem('hasSeenSplash');
    }
  }, []);

  return (
    <>
      <Navigation />
      {children}
    </>
  );
} 