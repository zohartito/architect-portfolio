'use client';

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <body className="font-sans">
      <Navigation />
      <main className={!isHomePage ? 'pt-20' : ''}>
        {children}
      </main>
    </body>
  );
} 