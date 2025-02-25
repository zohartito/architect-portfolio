'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface Props {
  onComplete?: () => void;
}

export default function SplashScreen({ onComplete }: Props) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Get all letters
    const zoharLetters = Array.from(document.querySelectorAll('.zohar-letter'));
    const titoLetters = Array.from(document.querySelectorAll('.tito-letter'));

    // Initial state
    gsap.set([...zoharLetters, ...titoLetters], {
      y: () => gsap.utils.random(-500, 500),
      opacity: 0
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        if (onComplete) onComplete();
        // Dispatch event for navigation
        window.dispatchEvent(new Event('splashComplete'));
        // Store in localStorage after animation completes
        localStorage.setItem('hasSeenSplash', 'true');
      }
    });

    // Animate letters in
    tl.to([...zoharLetters, ...titoLetters], {
      duration: 1.5,
      y: 0,
      opacity: 1,
      stagger: {
        amount: 0.5,
        from: "random"
      },
      ease: "power3.out"
    });

    // Move Z and T to final position
    tl.to([zoharLetters[0], titoLetters[0]], {
      y: 32,
      x: (index) => index === 0 ? 16 : 36,
      scale: 1,
      fontSize: "text-xl",
      duration: 0.8,
      ease: "power2.inOut"
    });

    // Fade out other letters
    tl.to([...zoharLetters.slice(1), ...titoLetters.slice(1)], {
      opacity: 0,
      y: -20,
      scale: 0,
      duration: 0.5,
      stagger: {
        amount: 0.2,
        from: "random"
      },
      ease: "power2.in"
    }, "-=0.4");
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ${
      !isAnimating ? 'pointer-events-none opacity-0' : 'opacity-100'
    }`}>
      <div className="text-white text-7xl font-bold tracking-tight flex gap-4">
        <div className="flex">
          {'ZOHAR'.split('').map((letter, i) => (
            <span key={i} className="zohar-letter transform-gpu">{letter}</span>
          ))}
        </div>
        <div className="flex">
          {'TITO'.split('').map((letter, i) => (
            <span key={i} className="tito-letter transform-gpu">{letter}</span>
          ))}
        </div>
      </div>
    </div>
  );
} 