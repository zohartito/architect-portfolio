'use client';

import React from 'react';

interface PdfRendererProps {
  pdfUrl: string;
  className?: string;
}

export default function PdfRenderer({ pdfUrl, className = '' }: PdfRendererProps) {
  // Use a simple approach with an iframe and specific styling
  return (
    <div 
      className={`w-full ${className}`}
      style={{
        overflow: 'hidden',
        background: 'white',
        padding: 0,
        margin: 0,
        border: 'none'
      }}
    >
      <iframe
        src={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0&statusbar=0`}
        className="w-full h-full"
        style={{
          minHeight: '80vh',
          backgroundColor: 'white',
          padding: 0,
          margin: 0,
          border: 'none'
        }}
        frameBorder="0"
        scrolling="no"
      />
    </div>
  );
} 