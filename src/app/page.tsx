'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplashScreen from './components/SplashScreen';
import { projects } from './data/projects';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

console.log("Projects being rendered:", projects);

export default function Home() {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [splashComplete, setSplashComplete] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
      setSplashComplete(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setSplashComplete(true);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip during SSR
    
    projectRefs.current = projectRefs.current.slice(0, projects.length);

    if (splashComplete) {
      // Create animations for each project
      projectRefs.current.forEach((project, index) => {
        if (!project) return;

        // Fade in and scale animation when project enters viewport
        gsap.fromTo(project,
          {
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top bottom-=20%",
              end: "top center",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Parallax effect on project images
        const image = project.querySelector('img');
        if (image) {
          gsap.to(image, {
            y: "15%",
            ease: "none",
            scrollTrigger: {
              trigger: project,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        }
      });
    }
  }, [splashComplete]);

  return (
    <main className="relative bg-black">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {/* Projects Stack */}
      <div className={`relative transition-opacity duration-500 ${
        splashComplete ? 'opacity-100' : 'opacity-0'
      }`}>
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block relative w-full h-[50vh] group cursor-pointer"
          >
            <div
              ref={(el: HTMLDivElement | null) => {
                if (el) projectRefs.current[index] = el;
              }}
              className="relative w-full h-full overflow-hidden"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transform transition-transform duration-700 scale-105 group-hover:scale-110"
                sizes="100vw"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
              
              {/* Project Title */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="px-4 transform transition-all duration-500 group-hover:scale-110">
                  <h2 className="text-white text-3xl md:text-4xl font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Project Number */}
              <div className="absolute bottom-0 right-0 p-8">
                <span className="text-white/50 text-xl font-light">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Contact Section */}
      <section id="contact" className="relative bg-white py-24 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Email</h3>
                <a 
                  href="mailto:zohartito96@gmail.com" 
                  className="text-gray-600 hover:text-gray-900 transition inline-block text-lg"
                >
                  zohartito96@gmail.com
                </a>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Phone</h3>
                <a 
                  href="tel:+18185188596" 
                  className="text-gray-600 hover:text-gray-900 transition inline-block text-lg"
                >
                  (818) 518-8596
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Touch Device Styles */}
      <style jsx global>{`
        @media (hover: none) {
          .group:hover .group-hover\\:opacity-100 {
            opacity: 1;
          }
          .group:hover .group-hover\\:scale-110 {
            transform: scale(1.1);
          }
        }
      `}</style>
    </main>
  );
}
