
import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  url: string;
  className?: string;
  variant?: 'small' | 'large';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, url, className = "", variant = 'small' }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
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
    
    // Magnetic pull strength based on variant
    const strength = variant === 'large' ? 0.5 : 0.35;
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sizeClasses = variant === 'large' 
    ? "w-32 h-32 md:w-48 md:h-48 text-2xl" 
    : "p-4 text-xs";

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
      <div className={`absolute inset-0 rounded-full bg-[#d4af37]/20 blur-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 ${variant === 'large' ? 'animate-pulse' : ''}`} />
      <div className={`relative z-10 flex flex-col items-center justify-center border border-[#d4af37]/50 rounded-full bg-black/60 backdrop-blur-md shadow-[inset_0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 ${sizeClasses}`}>
        {children}
      </div>
    </motion.a>
  );
};

export default MagneticButton;
