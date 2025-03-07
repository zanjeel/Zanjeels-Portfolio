"use client";
import { useState, useEffect, Suspense } from "react";
import dynamic from 'next/dynamic';
import { Loader } from '@react-three/drei';

import { Hero2 } from "@/components/Hero2";
import { Header } from "@/components/Header";
import CustomCursor from "@/components/ui/CustomCursor";
import RotatingButton2 from "@/components/ui/RotatingButton2";
import ExperienceSection from "./sections/ExperienceSection";

// Load MetallicPaintRender with custom loading strategy
const MetallicPaintRender = dynamic(() => import("@/components/MetallicPaintRender"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />,
});

// Other non-critical components with loading states
const Stats = dynamic(() => import("@/components/Stats"), {
  loading: () => <div className="w-full h-96 bg-black-100" />,
  ssr: false
});

const ContentSection = dynamic(() => 
  import("./sections/ContentSection").then(mod => {
    // Preload content components
    const preloadComponents = async () => {
      await Promise.all([
        import("@/components/Testimonials"),
        import("@/components/Projects")
      ]);
    };
    preloadComponents();
    return mod;
  }), {
  loading: () => <div className="w-full h-96 bg-white" />
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="w-full h-96 bg-black" />,
  ssr: false
});

const FooterSection = dynamic(() => 
  Promise.all([
    import("@/components/Footer2"),
    import("@/components/Footer")
  ]).then(([Footer2, Footer]) => {
    const CombinedFooter = () => (
      <>
        <Footer2.default />
        <Footer.default />
      </>
    );
    return CombinedFooter;
  }), {
  loading: () => <div className="h-32 bg-black" />
});

// Preload critical assets
const preloadAssets = () => {
  if (typeof window !== 'undefined') {
    // Preload critical images
    const imagesToPreload = ['/zeej3.svg'];
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
};

const fadeInUpKeyframes = `
  @keyframes riseUp {
    0% {
      transform: translateY(100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .animate-rise-up {
    animation: riseUp 3s ease-out forwards;
  }

  .cursor-none * {
    cursor: none !important;
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = fadeInUpKeyframes;
  document.head.appendChild(style);
}

interface PreloaderProps {
  setIsLoading: (loading: boolean) => void;
}

const Preloader = ({ setIsLoading }: PreloaderProps) => {
  const [counter, setCounter] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isBirdflyLoaded, setIsBirdflyLoaded] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load MetallicPaintRender immediately
    setIsImageLoading(false); // Show MetallicPaintRender right away

    // Load other assets after MetallicPaintRender is shown
    const img = new Image();
    img.src = '/zeej3.svg';
    img.onload = () => {
      // Other assets loaded
    };
    img.onerror = () => {
      // Handle error silently
    };

    // Set minimum loading time separately
    setTimeout(() => {
      setIsBirdflyLoaded(true);
    }, 3300); // Increased to 4 seconds for smoother loading
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prev => {
        const elapsedTime = Date.now() - startTime;
        const minTimeReached = elapsedTime > 3300;
        
        let increment;
        if (!isBirdflyLoaded) {
          // Very slow initial loading (0-20%) to ensure MetallicPaintRender is visible
          increment = Math.min(prev + 0.6, 20);
        } else if (prev < 20) {
          // If still under 20%, slowly progress
          increment = Math.min(prev + 0.6, 20);
        } else if (!minTimeReached) {
          // Medium speed until minimum time reached (20-60%)
          increment = Math.min(prev + 0.7, 60);
        } else {
          // Final phase (60-100%)
          increment = Math.min(prev + 1.5, 100);
        }
        
        if (increment === 100 && minTimeReached) {
          setIsLoading(false);
          document.body.style.overflow = "";
          clearInterval(timer);
        }
        
        return increment;
      });
    }, 40); // Even slower updates for smoother progression

    return () => clearInterval(timer);
  }, [isBirdflyLoaded, setIsLoading, startTime]);

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div className="z-52 animate-rise-up transform translate-y-0 transition-transform duration-3000 ease-out">
        {!isImageLoading && <MetallicPaintRender />}
      </div>
      <div className="fixed bottom-8 left-8 text-gray-300 font-mono z-51 flex items-center gap-2">
        <span className="text-7xl font-bold text-gray-400 tracking-tighter">{Math.floor(counter)}%</span>
      </div>
    </div>
  );
};

const LoadingFallback = () => (
  <div className="w-full h-96 animate-pulse bg-gray-200" />
);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLgScreen, setIsLgScreen] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    // Preload assets when component mounts
    preloadAssets();
    setAssetsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      document.body.style.cursor = 'none';
    }
  }, [isLoading]);

  useEffect(() => {
    const handleResize = () => {
      setIsLgScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!assetsLoaded) {
    return <div className="w-full h-screen bg-black" />;
  }

  return (
    <div className={!isLoading ? 'cursor-none' : ''}>
      {isLgScreen && !isLoading && <CustomCursor />}
      {isLoading && <Preloader setIsLoading={setIsLoading} />}
      
      <main className={`${isLoading ? 'hidden' : 'block'} ${!isLoading ? 'cursor-none' : ''}`}>
        <Header />
        <Hero2 />
        
        <ExperienceSection />

        <Suspense fallback={<LoadingFallback />}>
          <Stats />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <ContentSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>

        <Suspense fallback={<div className="h-32" />}>
          <FooterSection />
        </Suspense>

        <div className="fixed bottom-8 right-8 z-50 hidden md:block">
          <RotatingButton2 />
        </div>
      </main>
    </div>
  );
};

export default Home;
