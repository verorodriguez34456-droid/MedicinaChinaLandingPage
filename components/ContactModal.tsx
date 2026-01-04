
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string, url: string, icon: React.ReactNode }>;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, links }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-[#d4af37] font-cinzel text-xl hover:scale-110 transition-transform p-4"
          >
            [ CERRAR ]
          </button>

          <div className="flex flex-col items-center max-w-4xl w-full">
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-cinzel text-white mb-16 tracking-[0.2em] text-center"
            >
              CONECTA CON EL <span className="text-[#d4af37]">QI</span>
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-12 md:gap-24">
              {links.map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1, type: 'spring', stiffness: 100 }}
                  className="flex flex-col items-center"
                >
                  <MagneticButton url={link.url} variant="large">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl md:text-5xl mb-2">{link.icon}</span>
                      <span className="text-[10px] md:text-xs font-cinzel font-bold tracking-widest text-[#d4af37] uppercase">
                        {link.label}
                      </span>
                    </div>
                  </MagneticButton>
                </motion.div>
              ))}
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              className="mt-20 text-gray-400 font-cinzel text-[10px] tracking-[0.5em] uppercase text-center"
            >
              Selecciona una vía para iniciar tu camino ancestral
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
