'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const zoharLetters = Array.from(containerRef.current.querySelectorAll('.zohar-letter'));
      const titoLetters = Array.from(containerRef.current.querySelectorAll('.tito-letter'));
      const allLetters = [...zoharLetters, ...titoLetters];
      
      // Start transition after 1 second
      setTimeout(() => {
        // First move all letters up and fade out non-Z-T letters
        gsap.to(allLetters, {
          y: (index) => {
            const isZ = index === 0;
            const isFirstT = index === 5;
            if (isZ || isFirstT) return 0;
            return -100;
          },
          x: (index) => {
            const isZ = index === 0;
            const isFirstT = index === 5;
            if (isZ) return 0;
            if (isFirstT) return 40;
            return index < 5 ? -200 : 200;
          },
          opacity: (index) => {
            const isZ = index === 0;
            const isFirstT = index === 5;
            return isZ || isFirstT ? 1 : 0;
          },
          position: (index) => {
            const isZ = index === 0;
            const isFirstT = index === 5;
            return isZ || isFirstT ? 'fixed' : 'relative';
          },
          top: (index) => {
            const isZ = index === 0;
            const isFirstT = index === 5;
            return isZ || isFirstT ? '1rem' : 'auto';
          },
          left: (index) => {
            const isZ = index === 0;
            const isFirstT = index === 5;
            if (isZ) return '1rem';
            if (isFirstT) return '2.5rem';
            return 'auto';
          },
          scale: 1,
          duration: 0.6,
          stagger: 0.02,
          ease: "power2.inOut",
          onComplete: () => setIsLoading(false)
        });
      }, 1000);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      <div className="flex items-center justify-center text-white gap-4">
        <div className="flex">
          {["Z", "O", "H", "A", "R"].map((char, index) => (
            <span
              key={index}
              className="text-xl font-bold inline-block transform-gpu zohar-letter"
              style={{ 
                transformOrigin: "top left",
                letterSpacing: "-0.02em"
              }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="flex">
          {["T", "I", "T", "O"].map((char, index) => (
            <span
              key={`t-${index}`}
              className="text-xl font-bold inline-block transform-gpu tito-letter"
              style={{ 
                transformOrigin: "top left",
                letterSpacing: "-0.02em"
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 