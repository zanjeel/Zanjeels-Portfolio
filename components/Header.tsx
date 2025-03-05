"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import zeejlogo from "@/public/zeejlogo.png";
import MenuIconSvg from "@/public/menu.svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Disable scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

   //hide header when scrolling down (isVisible = false)
  return (
   
    <header 
      className={`fixed w-full top-0 bg-slate-950/95 backdrop-blur-sm border-b border-white/10 z-[60] transition-all duration-300 transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ cursor: 'auto' }}
    >
      <div className="container cursor-default">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Image src={zeejlogo} alt="Zeej Logo" height={120} width={120} priority className="hover:scale-105 transition-transform mt-3 cursor-pointer"  onClick={() => handleNavClick('hero')} />

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none z-50 cursor-pointer"
          >
            <MenuIconSvg className={`h-8 w-8 text-white/90 hover:text-white transition-colors`} />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            <button 
              onClick={() => handleNavClick('about')}
              className="text-white/90 hover:text-white transition-colors text-lg cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('projects')}
              className="text-white/90 hover:text-white transition-colors text-lg cursor-pointer"
            >
              Projects
            </button>
            <button 
              onClick={() => handleNavClick('testimonials')}
              className="text-white/90 hover:text-white transition-colors text-lg cursor-pointer"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleNavClick('work')}
              className="text-white/90 hover:text-white transition-colors text-lg cursor-pointer"
            >
              Work
            </button>
           <button 
              onClick={() => handleNavClick('contact')}
              className="text-white/90 hover:text-white transition-colors text-lg cursor-pointer"
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="fixed inset-0 left-0 top-0 h-screen w-screen bg-slate-950/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 text-white md:hidden -mt-16 z-[70]">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-20 right-7 w-12 h-12 flex items-center justify-center rounded-full bg-white hover:bg-white/90 transition-colors duration-200 z-[80]"
              aria-label="Close Menu"
            >
              <svg
                className="w-6 h-6 text-slate-950"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-8">
              <button 
                onClick={() => handleNavClick('about')}
                className="text-2xl font-light text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('projects')}
                className="text-2xl font-light text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Projects
              </button>
              <button 
                onClick={() => handleNavClick('testimonials')}
                className="text-2xl font-light text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Testimonials
              </button>
              <button 
                onClick={() => handleNavClick('work')}
                className="text-2xl font-light text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Work
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="text-2xl font-light text-white/90 hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
