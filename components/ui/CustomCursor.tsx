import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [cursorType, setCursorType] = useState('default');

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const text = textRef.current;
    if (!cursor || !cursorDot || !text) return;

    const shouldHideCursor = (element: Element | null): boolean => {
      if (!element) return false;
      const cursorAttr = element.getAttribute('data-cursor');
      return cursorAttr === 'contact' || cursorAttr === 'hide';
    };

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursor.style.transform = `translate3d(${clientX - cursor.clientWidth / 2}px, ${clientY - cursor.clientHeight / 2}px, 0)`;

      const element = document.elementFromPoint(clientX, clientY);
      const cursorElement = element?.closest('[data-cursor]') || null;
      const shouldHide = shouldHideCursor(cursorElement);
      cursor.style.opacity = shouldHide ? '0' : '1';

      // Check if hovering over projects grid
      const isProjectsGrid = cursorElement?.getAttribute('data-cursor') === 'projects';
      if (isProjectsGrid) {
        cursorDot.style.width = '80px';
        cursorDot.style.height = '80px';
        cursorDot.style.backgroundColor = '#000';
        text.style.opacity = '1';
        text.style.mixBlendMode = 'normal';
        text.style.fontSize = '16px';
        cursor.classList.remove('mix-blend-difference');
      } else {
        cursorDot.style.width = '15px';
        cursorDot.style.height = '15px';
        cursorDot.style.backgroundColor = '#fff';
        text.style.opacity = '0';
        text.style.mixBlendMode = 'difference';
        text.style.fontSize = '14px';
        cursor.classList.add('mix-blend-difference');
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorElement = target.closest('[data-cursor]');
      const shouldHide = shouldHideCursor(cursorElement);
      
      if (!shouldHide) {
        const hasCursor = target.hasAttribute('data-cursor');
        if (hasCursor && target.getAttribute('data-cursor') !== 'projects') {
          cursorDot.style.width = '15px';
          cursorDot.style.height = '15px';
          cursorDot.style.backgroundColor = '#fff';
          text.style.opacity = '0';
          text.style.mixBlendMode = 'difference';
          cursor.classList.add('mix-blend-difference');
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      setCursorType(cursorAttr || 'default');
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleCursorType);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleCursorType);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[50] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        ref={cursorDotRef}
        className={`relative rounded-full mix-blend-difference
          ${cursorType === 'light' ? 'bg-white' : 'bg-white'}
          ${cursorType === 'hide' ? 'opacity-0' : 'opacity-100'}
          ${cursorType === 'pointer' ? 'w-4 h-4' : 'w-6 h-6'}
          transition-all duration-200`}
      >
        <span
          ref={textRef}
          className="absolute text-white font-medium"
          style={{
            opacity: 0,
            transition: 'all 200ms ease',
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            whiteSpace: 'nowrap',
            mixBlendMode: 'difference',
            fontSize: '14px'
          }}
        >
          Explore
        </span>
      </div>
    </div>
  );
};

export default CustomCursor; 