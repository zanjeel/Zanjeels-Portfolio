"use client";
import { LogoTicker } from "@/components/LogoTicker";
import Grid from "@/components/Grid";
import Experience2 from "@/components/Experience2";
import { useEffect, useState } from "react";

const ExperienceSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure proper mounting
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5" data-theme="dark" data-cursor="pointer">
      {isMounted && <LogoTicker />}
      <Grid />
      <Experience2 />
    </div>
  );
};

export default ExperienceSection; 