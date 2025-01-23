import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import SplashScreen from './components/SplashScreen'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zohar Tito | Architecture Portfolio',
  description: 'Innovative architectural designs and projects by Zohar Tito - USC Architecture Candidate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SplashScreen />
        <nav className="fixed w-full z-40 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-xl font-bold text-gray-900">
                ZT
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition">Home</Link>
                <Link href="/projects" className="text-gray-600 hover:text-gray-900 transition">Projects</Link>
                <Link href="/gallery" className="text-gray-600 hover:text-gray-900 transition">Gallery</Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition">About</Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition">Contact</Link>
              </div>
              <button className="md:hidden">
                <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
        <main className="pt-16">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Zohar Tito</h3>
                <p className="text-gray-400">Aspiring Architect | USC Candidate</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <p className="text-gray-400">Email: zohar.tito@example.com</p>
                <p className="text-gray-400">Based in California</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Follow</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition">LinkedIn</a>
                  <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
                  <a href="#" className="text-gray-400 hover:text-white transition">Behance</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} Zohar Tito. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
