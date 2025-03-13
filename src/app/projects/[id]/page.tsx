'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { projects } from '../../data/projects';

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Set mounted to true when component mounts (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!mounted) return;
    
    // Get the ID from the URL
    const idParam = params.id;
    console.log("ID from URL:", idParam);
    
    // Try to find the project
    let foundProject;
    
    // First try to parse as integer
    if (idParam) {
      try {
        const numericId = parseInt(idParam as string);
        console.log("Parsed numeric ID:", numericId);
        foundProject = projects.find(p => p.id === numericId);
      } catch (e) {
        console.error("Error parsing ID:", e);
      }
    }
    
    // If not found, try to match as string (fallback)
    if (!foundProject && idParam) {
      foundProject = projects.find(p => p.id.toString() === idParam);
      console.log("Tried string matching:", foundProject);
    }
    
    // Log all projects for debugging
    console.log("All projects:", projects);
    
    setProject(foundProject);
    setLoading(false);
  }, [params.id, mounted]);
  
  // Only render content on the client side
  if (!mounted) {
    return null; // Return nothing during SSR
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <p className="mb-4">ID: {params.id}</p>
          <a href="/" className="text-blue-500 hover:underline">
            ← Back to home
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 bg-white">
        {/* Back button */}
        <a href="/" className="inline-block mb-8 text-gray-600 hover:text-black">
          ← Back to projects
        </a>
        
        {/* Project images */}
        <div className="space-y-8 bg-white">
          {/* First detail image */}
          <div className="w-full flex justify-center">
            <img
              src={project.detailImage}
              alt={project.title}
              className="max-w-full max-h-[80vh] object-contain"
              style={{ 
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
          
          {/* Second detail image (if available) */}
          {project.hasSecondImage && project.detailImage2 && (
            <div className="w-full flex justify-center">
              <img
                src={project.detailImage2}
                alt={`${project.title} - additional view`}
                className="max-w-full max-h-[80vh] object-contain"
                style={{ 
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
          )}
          
          {/* Third detail image (if available) */}
          {project.hasThirdImage && project.detailImage3 && (
            <div className="w-full flex justify-center">
              <img
                src={project.detailImage3}
                alt={`${project.title} - third view`}
                className="max-w-full max-h-[80vh] object-contain"
                style={{ 
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 