'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: number;
  software: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Urban Housing Complex",
    category: "Residential",
    description: "A sustainable housing development featuring innovative use of natural light and eco-friendly materials.",
    image: "/projects/housing-complex.jpg",
    year: 2023,
    software: ["Revit", "3ds Max", "V-Ray"]
  },
  {
    id: 2,
    title: "Cultural Arts Center",
    category: "Cultural",
    description: "A dynamic space that celebrates artistic expression through architectural form.",
    image: "/projects/arts-center.jpg",
    year: 2023,
    software: ["Rhino", "Grasshopper", "Lumion"]
  },
  {
    id: 3,
    title: "Sustainable Office Tower",
    category: "Commercial",
    description: "LEED Platinum certified office building with innovative energy solutions.",
    image: "/projects/office-tower.jpg",
    year: 2022,
    software: ["AutoCAD", "Revit", "Enscape"]
  },
  // Add more projects as needed
];

const categories = ["All", "Residential", "Commercial", "Cultural", "Educational"];

const ImageWithFallback = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) => {
  const [error, setError] = useState(false);

  return error ? (
    <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="text-gray-400 text-center p-4">
        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p>{alt}</p>
      </div>
    </div>
  ) : (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={() => setError(true)}
    />
  );
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = projects.filter(project => 
    selectedCategory === "All" || project.category === selectedCategory
  );

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Project Gallery</h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Explore my architectural portfolio showcasing innovative designs, sustainable solutions, and creative approaches to spatial challenges.
        </p>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-90"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg overflow-hidden max-w-4xl w-full"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <ImageWithFallback
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
                <p className="text-gray-600 mb-6">{selectedProject.description}</p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Year</h3>
                    <p className="text-gray-600">{selectedProject.year}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Software Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.software.map((sw) => (
                        <span
                          key={sw}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}