
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const bankAccount = "TRIADA AC 012 345 6789";

  const handleCopy = () => {
    navigator.clipboard.writeText(bankAccount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative max-w-2xl w-full p-12 bg-[#2b1a0a] rounded-xl border-4 border-[#d4af37]/60 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Decorative corner patterns */}
        <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-[#d4af37]/40 pointer-events-none" />
        <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-[#d4af37]/40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-[#d4af37]/40 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-[#d4af37]/40 pointer-events-none" />

        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-cinzel font-bold text-[#d4af37] mb-6">Inscripción y Pagos</h2>
          <p className="text-gray-200 mb-8 italic text-lg font-cinzel">
            "Inscríbete hoy y asegura tu lugar en este camino ancestral"
          </p>
          
          <div className="bg-black/30 p-6 rounded-lg border border-[#d4af37]/30 mb-8">
            <p className="text-sm text-[#d4af37]/80 uppercase tracking-widest mb-2">Cuenta Bancaria (Ficticia)</p>
            <p className="text-2xl font-mono text-white tracking-widest">{bankAccount}</p>
          </div>

          <button
            onClick={handleCopy}
            className={`px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 ${
              copied 
                ? 'bg-green-600/20 text-green-400 border border-green-500/50' 
                : 'bg-[#d4af37] text-black hover:bg-[#c4a137] hover:scale-105 active:scale-95 shadow-lg shadow-[#d4af37]/20'
            }`}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  ¡Copiado!
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  Copiar Cuenta
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          
          <p className="mt-8 text-xs text-gray-400 font-cinzel">
            Una vez realizado el depósito, favor de enviar comprobante vía WhatsApp.
          </p>
        </div>
        
        {/* Bronze-like texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
      </motion.div>
    </section>
  );
};

export default PaymentSection;
