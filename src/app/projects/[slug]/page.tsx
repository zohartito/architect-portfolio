'use client';

import { useEffect } from 'react';
import Image from 'next/image';
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
    slug: "education-campus",
    title: "Education Campus",
    description: "Innovative learning spaces with integrated technology and sustainable design principles",
    image: "/architecture7.jpg"
  },
  {
    slug: "wellness-center",
    title: "Wellness Center",
    description: "Biophilic design merging nature and architecture for holistic wellbeing",
    image: "/architecture8.jpg"
  }
];

export default function ProjectPage({ params }: Props) {
  const router = useRouter();
  const project = projects.find(p => p.slug === params.slug);

  useEffect(() => {
    if (!project) {
      router.push('/');
    }

    // Cleanup function
    return () => {
      // Ensure any animations or transitions are cleaned up
      const cleanup = () => {
        document.body.style.overflow = '';
      };
      cleanup();
    };
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
    </main>
  );
} 