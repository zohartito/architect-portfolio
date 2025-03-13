'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BetterPdfRendererProps {
  pdfUrl: string;
  className?: string;
}

export default function BetterPdfRenderer({ pdfUrl, className = '' }: BetterPdfRendererProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Create a direct link to the PDF for viewing/downloading
  const handleViewPdf = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div 
      className={`w-full ${className} relative`}
      style={{
        background: 'white',
        padding: 0,
        margin: 0,
        border: 'none',
        minHeight: '80vh',
        position: 'relative'
      }}
    >
      {/* Display the PDF as an image with a click handler to open the full PDF */}
      <div 
        className="w-full h-full cursor-pointer"
        onClick={handleViewPdf}
        style={{
          position: 'relative',
          height: '80vh'
        }}
      >
        {/* Show a loading spinner while the iframe loads */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        )}
        
        {/* Use an iframe but make it appear as a static image */}
        <iframe
          src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0&statusbar=0`}
          className="w-full h-full"
          style={{
            backgroundColor: 'white',
            padding: 0,
            margin: 0,
            border: 'none'
          }}
          frameBorder="0"
          scrolling="no"
          onLoad={() => setIsLoading(false)}
        />
        
        {/* Overlay to prevent PDF viewer interactions */}
        <div 
          className="absolute inset-0 bg-transparent"
          onClick={handleViewPdf}
          style={{ pointerEvents: 'none' }}
        />
      </div>
      
      {/* Small indicator that this is clickable */}
      <div className="absolute bottom-4 right-4 bg-white bg-opacity-70 px-3 py-1 rounded text-sm">
        Click to view full PDF
      </div>
    </div>
  );
} 