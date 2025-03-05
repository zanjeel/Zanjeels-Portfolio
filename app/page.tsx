"use client";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

import { Hero2 } from "@/components/Hero2";
import Grid from "@/components/Grid";
// import Approach from "@/components/Approach";
import Experience2 from "@/components/Experience2";
import Stats from "@/components/Stats";
import { Header } from "@/components/Header";
import { LogoTicker } from "@/components/LogoTicker";
import { Testimonials } from "@/components/Testimonials";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer2 from "@/components/Footer2";
import CustomCursor from "@/components/ui/CustomCursor";
import RotatingButton2 from "@/components/ui/RotatingButton2";
import Footer from "@/components/Footer";

// Dynamic import of MetallicPaintRender
const MetallicPaintRender = dynamic(() => import("@/components/MetallicPaintRender"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />
});

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
    animation: riseUp 10s ease-out forwards;
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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Preload the image
    const img = new Image();
    img.src = '/zeej3.svg';
    img.onload = () => {
      console.log('Image preloaded successfully');
      setIsImageLoading(false);
    };
    img.onerror = (e) => {
      console.error('Error preloading image:', e);
      setIsImageLoading(false);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prev => {
        const newValue = isBirdflyLoaded
          ? Math.min(prev + 20, 100)
          : Math.min(prev + 0.4, 100);
        
        // When counter reaches 100, hide preloader and enable scrolling
        if (newValue === 100) {
          setIsLoading(false);
          document.body.style.overflow = "";
          clearInterval(timer);
        }
        
        return newValue;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [isBirdflyLoaded, setIsLoading]);

  // Listen for a custom event from Birdfly component
  useEffect(() => {
    const handleBirdflyLoaded = () => {
      setIsBirdflyLoaded(true);
    };

    window.addEventListener('birdflyLoaded', handleBirdflyLoaded);
    return () => window.removeEventListener('birdflyLoaded', handleBirdflyLoaded);
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div className="z-52 animate-rise-up transform translate-y-0 transition-transform duration-1000 ease-out">
        {!isImageLoading && <MetallicPaintRender />}
      </div>
      <div className="fixed bottom-8 left-8 text-gray-300 font-mono z-51 flex items-center gap-2">
        <span className="text-7xl font-bold text-gray-400 tracking-tighter">{Math.floor(counter)}%</span>
      </div>
    </div>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [isLgScreen, setIsLgScreen] = useState(false);

  useEffect(() => {
    // Remove cursor hiding during loading
    if (!isLoading) {
      document.body.style.cursor = 'none';
    }
  }, [isLoading]);

  useEffect(() => {
    //for custom cursor only on lg screens and above
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsLgScreen(true);
      } else {
        setIsLgScreen(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener to update state on window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Disable scroll during preloader
  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };
    
    disableScroll();

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Pre-render content while preloader is showing
  useEffect(() => {
    const preRenderContent = () => {
      const mainContent = (
        <main className={`${isLoading ? 'hidden' : 'block'} cursor-none`}>
          <Header />
          <Hero2 />
          <div className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5" data-theme="dark" data-cursor="pointer">
            <LogoTicker />
            <Grid />
            <Experience2 />
          </div>
          <div className="bg-color-100 overflow-hidden" data-theme="dark" data-cursor="hide">
            <Stats />
          </div>
          <div className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5" data-cursor="view">
            <Testimonials />
            <Projects />
          </div>
          <div className="relative overflow-hidden" data-theme="dark" data-cursor="contact">
            <Contact />
          </div>
          <Footer2/>
        </main>
      );
      setContent(mainContent);
    };

    // Start pre-rendering immediately
    preRenderContent();
  }, [isLoading]);

  return (
    <div className={!isLoading ? 'cursor-none' : ''}>
      {isLgScreen && !isLoading && <CustomCursor />}
      {isLoading && <Preloader setIsLoading={setIsLoading} />}
      <main className={`${isLoading ? 'hidden' : 'block'} ${!isLoading ? 'cursor-none' : ''}`}>
        <Header />
        <Hero2 />
        <div className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5" data-theme="dark" data-cursor="pointer">
          <LogoTicker />
          <Grid />
          <Experience2 />
        </div>
        <div className="bg-black-100 overflow-hidden" data-theme="dark" data-cursor="hide">
          <Stats />
        </div>
        <div className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5" data-cursor="view">
          <Testimonials />
          <Projects />
        </div>
        <div className="relative overflow-hidden" data-theme="dark" data-cursor="contact">
          <Contact />
        </div>
        <Footer2/>
        <Footer/>
        
        {/* Fixed Rotating Button */}
        <div className="fixed bottom-8 right-8 z-50 hidden md:block">
          <RotatingButton2 />
        </div>
      </main>
    </div>
  );
};

export default Home;
