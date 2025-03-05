import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
}

const RiseOnScroll = ({ children, delay = 0 }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <motion.div
        variants={{
          hidden: { 
            opacity: 0, 
            y: 75, 
            scale: typeof window !== 'undefined' && window.innerWidth >= 640 ? 0.9 : 1 
          },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1 
          }
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.1, 0.4, 0.3, 1]
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RiseOnScroll;