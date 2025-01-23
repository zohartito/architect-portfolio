'use client';

import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

function ParticleField() {
  const points = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  useFrame((state) => {
    points.current.rotation.x += 0.0005;
    points.current.rotation.y += 0.001;
  });

  const particleCount = 5000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <Points ref={points}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
    </Points>
  );
}

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      // Initial animation
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out"
      });

      // Exit animation after 3.5 seconds
      setTimeout(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => setIsLoading(false)
        });
      }, 3500);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black"
      style={{ perspective: "1000px" }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <ParticleField />
      </Canvas>
      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center text-white"
        style={{ mixBlendMode: "difference" }}
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 tracking-wider">ZOHAR TITO</h1>
          <p className="text-xl tracking-widest">ARCHITECTURE PORTFOLIO</p>
        </div>
      </div>
    </div>
  );
} 