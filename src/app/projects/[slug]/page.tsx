'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

const projects = [
  {
    slug: "urban-housing",
    title: "Urban Housing",
    description: "Sustainable living spaces in downtown area",
    image: "/architecture1.jpg"
  },
  {
    slug: "cultural-center",
    title: "Cultural Center",
    description: "Modern cultural hub with traditional elements",
    image: "/architecture2.jpg"
  },
  {
    slug: "eco-complex",
    title: "Eco Complex",
    description: "Green building with innovative energy solutions",
    image: "/architecture3.jpg"
  },
  {
    slug: "public-library",
    title: "Public Library",
    description: "Contemporary knowledge center",
    image: "/architecture4.jpg"
  },
  {
    slug: "residential-tower",
    title: "Residential Tower",
    description: "Luxury apartments with panoramic views",
    image: "/architecture5.jpg"
  },
  {
    slug: "sports-complex",
    title: "Sports Complex",
    description: "Multi-purpose athletic facility",
    image: "/architecture6.jpg"
  },
  {
    slug: "innovation-hub",
    title: "Innovation Hub",
    description: "Forward-thinking workspace design",
    image: "/architecture1.jpg"
  }
];

export default function ProjectPage({ params }: Props) {
  const router = useRouter();
  const project = projects.find(p => p.slug === params.slug);

  useEffect(() => {
    if (!project) {
      router.push('/');
    }
  }, [project, router]);

  if (!project) return null;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link 
              href="/" 
              className="text-xl font-bold tracking-tight text-gray-800 hover:text-black transition-colors"
            >
              ZT
            </Link>
            <div className="flex items-center">
              <Link 
                href="/projects" 
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Projects
              </Link>
              <Link 
                href="/gallery" 
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Gallery
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
} 