
import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  url: string;
  className?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, url, className = "" }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Magnetic pull strength
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center justify-center transition-shadow duration-300 ${className}`}
      whileHover={{ scale: 1.1 }}
    >
      <div className="absolute inset-0 rounded-full bg-[#d4af37]/10 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500 animate-pulse" />
      <div className="relative z-10 p-4 border border-[#d4af37]/50 rounded-full bg-black/40 backdrop-blur-md shadow-[inset_0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300">
        {children}
      </div>
    </motion.a>
  );
};

export default MagneticButton;
