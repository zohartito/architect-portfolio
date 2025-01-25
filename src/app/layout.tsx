import './globals.css'
import type { Metadata } from 'next'
import ClientLayout from './components/ClientLayout'

export const metadata: Metadata = {
  title: 'Zohar Tito | Architecture Portfolio',
  description: 'Portfolio showcasing architectural work and designs by Zohar Tito',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  themeColor: '#1a1f2e',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Zohar Tito',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClientLayout>
        {children}
      </ClientLayout>
    </html>
  )
}
