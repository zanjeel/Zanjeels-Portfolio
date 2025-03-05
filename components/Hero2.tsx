"use client";
import ArrowIcon from "@/public/arrow-right.svg";
import cloudImage from "@/public/cloud-main.png";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  type TargetAndTransition,
} from "framer-motion";
import GradientText from './GradientText'
  

import { useRef, useState, useEffect } from "react";
import RiseOnScroll from "./ui/RiseOnScroll";
import { Character } from "./Character";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Birdfly } from "./Birdfly";
import { useControls } from 'leva';
import { Suspense } from "react";

// Add type for props
type BirdflyProps = {
  [key: string]: any;
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      if (displayedText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, 100);
      } else {
        setTimeout(() => setIsTyping(false), 1000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length - 1));
        }, 50);
      } else {
        setTimeout(() => setIsTyping(true), 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, text]);

  return (
    <motion.div 
      className="inline-block"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {displayedText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        |
      </motion.span>
    </motion.div>
  );
};

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

// Add new component for responsive scaling
const ResponsiveBirdfly = (props: BirdflyProps) => {
  const [scale, setScale] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) { // sm
        setScale(8.5);
      } else if (width <= 768) { // md
        setScale(5.7);
      } else if (width <= 1024) { // lg
        setScale(6.2);
      } else { // xl
        setScale(7);
      }
    };

    // Set initial scale
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Birdfly
      {...props}
      position={[-0.1, -0.8, 0]}
      rotation={[0, 0.1, 0]}
      scale={scale}
    />
  );
};

export const Hero2 = () => {
  const heroRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const floatingAnimationCloud1: TargetAndTransition = {
    y: [-15, 15],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  const floatingAnimationCloud2: TargetAndTransition = {
    y: [-20, 20],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  // const birdControls = useControls('Birdfly', {
  //   positionX: { value: 0, min: -10, max: 10, step: 0.1 },
  //   positionY: { value: -1, min: -10, max: 10, step: 0.1 },
  //   positionZ: { value: 0, min: -10, max: 10, step: 0.1 },
  //   rotationX: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
  //   rotationY: { value: 1, min: 0, max: Math.PI * 2, step: 0.1 },
  //   rotationZ: { value: 6.5, min: 0, max: Math.PI * 2, step: 0.1 },
  //   scale: { value: 4, min: 0, max: 10, step: 0.1 }
  // });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // Enable touch scrolling on the document
    document.documentElement.style.touchAction = 'auto';
    document.body.style.touchAction = 'auto';
    
    return () => {
      document.documentElement.style.touchAction = '';
      document.body.style.touchAction = '';
    };
  }, [isClient]);

  const handleNavigation = (id: string) => {
    if (!isClient) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <section
        id="hero"
        ref={heroRef}
        className="pt-24 pb-20 md:pt-28 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] relative w-full overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center md:flex-row md:items-center relative">
            <div className="w-full md:w-[478px]">
              <RiseOnScroll delay={0.1}>
                <div className="tag text-black">Dear Stranger </div>
              </RiseOnScroll>
              
              <RiseOnScroll delay={0.3}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
                  <TypewriterText text="Hi, I am Zanjeel" />
                </h1>
                {/* <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="custom-class"
            >
              Add a splash of color!
            </GradientText> */}
              </RiseOnScroll>
              
              <RiseOnScroll delay={0.5}>
                <p className="text-xl text-[#010D3E] tracking-tight mt-6">
                  A software Developer with a background in Web Development, Data Science and Artificial Intelligence. I love to code stuff that makes a difference. 
                </p>
              </RiseOnScroll>
              
              <RiseOnScroll delay={0.7}>
                <div className="flex gap-1 items-center mt-[30px]">
                  <button 
                    onClick={() => handleNavigation('contact')}
                    className="btn btn-primary hover:scale-105 transition-transform"
                  >
                    Contact Me
                  </button>
                  <button 
                    onClick={() => handleNavigation('grid')}
                    className="btn btn-text gap-1 hover:scale-105 transition-transform group"
                  >
                    <span>Explore My Work</span>
                    <ArrowIcon className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </RiseOnScroll>
            </div>
            
            <div className="w-full flex justify-center mt-20 md:mt-8 lg:-mt-12 xl:mt-8 md:flex-1 relative">
              <motion.img
                src={cloudImage.src}
                width={220}
                height={220}
                alt="Cloud 1"
                className="absolute z-20 left-0 -top-20 md:-left-10 md:-top-14 pointer-events-none max-w-[180px] md:max-w-[220px]"
                animate={floatingAnimationCloud1}
                style={{
                  translateY: translateY,
                }}
              />
              <motion.img
                src={cloudImage.src}
                width={220}
                alt="Cloud 2"
                className="absolute z-0 right-0 top-72 md:-right-10 md:top-96 pointer-events-none max-w-[180px] md:max-w-[220px]"
                animate={floatingAnimationCloud2}
                style={{
                  rotate: 5,
                  translateY: translateY,
                }}
              />
              <div className="w-[360px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[300px] md:h-[500px] lg:w-[450px] lg:h-[648px] xl:w-[600px] xl:h-[648px] relative z-10">
                {isClient ? (
                  <Canvas
                    camera={{ position: [0, 0, 6], fov: 45 }}
                    style={{ background: 'transparent' }}
                    eventPrefix="page"
                    eventSource={document.documentElement}
                    gl={{ 
                      antialias: true,
                      alpha: true,
                      preserveDrawingBuffer: true,
                      powerPreference: "high-performance"
                    }}
                    dpr={[1, 2]}
                    performance={{ min: 0.5 }}
                    frameloop="always"
                    onCreated={({ gl, events }) => {
                      if (gl.domElement) {
                        gl.domElement.style.touchAction = 'auto';
                      }
                      if (events) {
                        events.enabled = false;
                      }
                      // Enable depth buffer and optimize rendering
                      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                      gl.setClearColor(0x000000, 0);
                    }}
                  >
                    <Suspense fallback={null}>
                      <ambientLight intensity={1} />
                      <directionalLight position={[5, 5, 5]} intensity={2} />
                      <ResponsiveBirdfly />
                    </Suspense>
                  </Canvas>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
