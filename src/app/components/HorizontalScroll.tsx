import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

interface Props {
  children: React.ReactNode;
}

export default function HorizontalScroll({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current || !progressRef.current) return;

    const container = containerRef.current;
    const scrollContainer = scrollRef.current;
    const progressBar = progressRef.current;

    if (isDesktop) {
      // Set up horizontal scroll
      const sections = gsap.utils.toArray<HTMLElement>(container.children);
      const totalWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0);
      
      scrollContainer.style.width = `${totalWidth}px`;
      
      const tween = gsap.to(scrollContainer, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainer,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true
        }
      });

      // Progress bar animation
      gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainer,
          scrub: 0.1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true
        }
      });

      // Keyboard navigation
      const handleKeydown = (e: KeyboardEvent) => {
        const scrollAmount = window.innerWidth;
        if (e.key === 'ArrowRight') {
          window.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
          window.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      };

      window.addEventListener('keydown', handleKeydown);

      return () => {
        tween.kill();
        window.removeEventListener('keydown', handleKeydown);
      };
    } else {
      // Mobile/Tablet vertical scroll
      const handleScroll = () => {
        const st = window.scrollY;
        setIsNavigationVisible(st < lastScrollTop || st < 100);
        lastScrollTop = st;

        // Update progress bar
        const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        gsap.to(progressBar, {
          scaleX: progress,
          duration: 0.1
        });
      };

      window.addEventListener('scroll', handleScroll);

      // Keyboard navigation for vertical scroll
      const handleKeydown = (e: KeyboardEvent) => {
        const scrollAmount = window.innerHeight;
        if (e.key === 'ArrowDown') {
          window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp') {
          window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        }
      };

      window.addEventListener('keydown', handleKeydown);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [isDesktop]);

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 w-full h-0.5 bg-gray-200 z-50"
        style={{ transformOrigin: '0% 50%' }}
      >
        <div 
          ref={progressRef}
          className="h-full bg-black"
          style={{ transform: 'scaleX(0)', transformOrigin: '0% 50%' }}
        />
      </div>

      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 w-full z-40 transition-transform duration-300 ${
          isNavigationVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="bg-white/90 backdrop-blur-sm shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="text-xl font-bold">ZT</a>
              <div className="hidden md:flex space-x-8">
                <a href="#projects" className="text-gray-600 hover:text-black transition">Projects</a>
                <a href="#about" className="text-gray-600 hover:text-black transition">About</a>
                <a href="#contact" className="text-gray-600 hover:text-black transition">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Container */}
      <div ref={containerRef} className={isDesktop ? 'h-screen overflow-hidden' : ''}>
        <div 
          ref={scrollRef}
          className={`${
            isDesktop 
              ? 'flex flex-nowrap' 
              : 'flex flex-col'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
} 