
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  title: string;
  description: string;
  index: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="group p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#d4af37]/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center h-full"
    >
      <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent flex items-center justify-center border border-[#d4af37]/30 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
        <span className="text-2xl text-[#d4af37] font-cinzel">{index + 1}</span>
      </div>
      <h3 className="text-xl font-cinzel font-bold text-[#d4af37] mb-4 tracking-wider group-hover:translate-y-[-2px] transition-transform duration-300">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
};

export default GlassCard;
