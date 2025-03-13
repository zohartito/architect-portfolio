'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    setIsVisible(!!hasSeenSplash);

    // Listen for splash screen completion
    const handleSplashComplete = () => setIsVisible(true);
    window.addEventListener('splashComplete', handleSplashComplete);
    return () => window.removeEventListener('splashComplete', handleSplashComplete);
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    if (href === '#contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: contactSection, autoKill: false },
          ease: "power4.inOut"
        });
      }
    } else if (href === '/') {
      // Force a clean reload for homepage navigation
      window.location.href = href;
    } else {
      router.push(href);
    }
  };

  const menuItems = [
    { href: '/', label: 'PROJECTS' },
    { href: '/about', label: 'ABOUT' },
    { href: '#contact', label: 'CONTACT' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-opacity duration-500 ${!isVisible ? 'opacity-0 pointer-events-none' : ''}`}>
      <div className="w-full bg-white/80 backdrop-blur-md h-14">
        <div className="container mx-auto h-full px-4">
          <div className="flex justify-between items-center h-full">
            <div className="relative">
              {/* Logo/Hamburger Container */}
              <button
                className="text-xl font-bold hover:opacity-70 transition-all duration-300 text-black h-14 px-2 flex items-center"
                onMouseEnter={() => setIsOpen(true)}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? (
                  <div className="space-y-1">
                    <div className="w-5 h-0.5 bg-black"></div>
                    <div className="w-5 h-0.5 bg-black"></div>
                    <div className="w-5 h-0.5 bg-black"></div>
                  </div>
                ) : (
                  "ZT"
                )}
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 top-14 py-2 bg-white shadow-lg transition-all duration-300 ease-in-out ${
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
                onMouseLeave={() => setIsOpen(false)}
              >
                {menuItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`block w-full text-left px-8 py-2 text-sm hover:bg-gray-100 whitespace-nowrap transition-colors ${
                      pathname === item.href ? 'text-black font-medium' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 