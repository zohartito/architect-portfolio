'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  image: string;
  slug: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Urban Housing",
    image: "/architecture1.jpg",
    slug: "urban-housing"
  },
  {
    id: 2,
    title: "Cultural Center",
    image: "/architecture2.jpg",
    slug: "cultural-center"
  },
  {
    id: 3,
    title: "Eco Complex",
    image: "/architecture3.jpg",
    slug: "eco-complex"
  },
  {
    id: 4,
    title: "Public Library",
    image: "/architecture4.jpg",
    slug: "public-library"
  },
  {
    id: 5,
    title: "Residential Tower",
    image: "/architecture5.jpg",
    slug: "residential-tower"
  },
  {
    id: 6,
    title: "Sports Complex",
    image: "/architecture6.jpg",
    slug: "sports-complex"
  },
  {
    id: 7,
    title: "Innovation Hub",
    image: "/architecture1.jpg",
    slug: "innovation-hub"
  }
];

export default function Home() {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, projects.length);

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
  }, []);

  return (
    <main className="relative bg-black">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-white text-xl font-bold tracking-tight">
              ZT
            </Link>
          </div>
        </div>
      </nav>

      {/* Projects Stack */}
      <div className="relative">
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className="block relative w-full h-[50vh] group cursor-pointer"
          >
            <div
              ref={el => projectRefs.current[index] = el}
              className="relative w-full h-full overflow-hidden"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transform transition-transform duration-700 scale-105 group-hover:scale-110"
                sizes="100vw"
                priority={index < 2} // Prioritize loading first two images
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
