'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { projects } from '../../data/projects';

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState(projects.find(p => p.slug === slug));
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <a href="/" className="text-blue-500 hover:underline">
            ← Back to home
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        {/* Back button */}
        <a href="/" className="inline-block mb-8 text-gray-600 hover:text-black">
          ← Back to projects
        </a>
        
        <div className="max-w-3xl mx-auto mb-12">
          {/* Project title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          
          {/* Project subtitle */}
          {project.subtitle && (
            <h2 className="text-2xl md:text-3xl font-medium mb-8">{project.subtitle}</h2>
          )}
          
          {/* Project description */}
          <p className="text-xl leading-relaxed mb-12">
            {project.description}
          </p>
        </div>
        
        {/* Project image - now after the description */}
        <div className="relative w-full aspect-square">
          <Image
            src={`${project.detailImage}?v=${Date.now()}`}
            alt={project.title}
            fill
            className="object-contain"
            priority
            unoptimized={true}
          />
        </div>
      </div>
    </main>
  );
} 