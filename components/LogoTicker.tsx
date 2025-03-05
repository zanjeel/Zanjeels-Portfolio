"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import acmeLogo from "@/public/logo-acme.png";
import quantumLogo from "@/public/logo-quantum.png";
import echoLogo from "@/public/logo-echo.png";
import celestialLogo from "@/public/logo-celestial.png";
import pulseLogo from "@/public/logo-pulse.png";
import apexLogo from "@/public/logo-apex.png";

const logos = [
  { src: '/python-logo.svg', width: 52, height: 52, name:'Python' },
  { src: '/css3-logo.svg', width: 48, height: 48, name:'CSS' },
  { src: '/html5-logo.svg', width: 48, height: 48, name:'HTML' },
  { src: '/javascript-logo.svg', width: 48, height: 48, name:'JavaScript' },
  { src: '/node-logo.svg', width: 48, height: 48, name:'Node' },
  { src: '/react-logo.svg', width: 48, height: 48, name:'React' },
  { src: '/ruby-logo.svg', width: 48, height: 48, name:'Ruby' },
  { src: '/tailwind-logo.svg', width: 48, height: 48, name:'Tailwind' },
  { src: '/mysql.svg', width: 48, height: 48, name:'MySQL' },
  { src: '/git.svg', width: 48, height: 48, name:'Git' },
];

export const LogoTicker = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  return (
    <div className="py-8 md:py-12 mt-8 bg-black-100">
      <div className="container">
        {/* <div className="flex overflow-hidden [mask-image:linear-gradient(to_right, rgba(0,0,0,0)_0%, rgba(0,0,0,1)_20%, rgba(0,0,0,1)_80%, rgba(0,0,0,0)_100%)]"> */}
        <div className="text-white flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 md:gap-20 flex-none pr-14"
            animate={shouldAnimate ? { translateX: "-50%" } : { translateX: "0%" }}
            initial={{ translateX: "0%" }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex items-center gap-4">
                <Image 
                  src={logo.src} 
                  alt={`${logo.name} Logo`}
                  width={logo.width}
                  height={logo.height}
                  className="logo-ticker-image grayscale brightness-0 invert opacity-70 hover:grayscale-0 hover:brightness-100 hover:invert-0 hover:opacity-100 transition-all duration-300"
                />
                <span className="text-xl font-medium text-gray-300 whitespace-nowrap">{logo.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};