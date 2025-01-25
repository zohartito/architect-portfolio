'use client';

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <body className="font-sans">
      {children}
      {!isHomePage && <Footer />}
    </body>
  );
} 