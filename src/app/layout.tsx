import './globals.css'
import type { Metadata } from 'next'
import ClientLayout from './components/ClientLayout'
import RootLayoutClient from './components/RootLayoutClient'

export const metadata: Metadata = {
  title: 'Zohar Tito | Architecture Portfolio',
  description: 'Portfolio showcasing architectural work and designs by Zohar Tito',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
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
      <body>
        <RootLayoutClient>
          <ClientLayout>
            {children}
          </ClientLayout>
        </RootLayoutClient>
      </body>
    </html>
  )
}
