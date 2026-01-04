
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QiBackground from './components/QiBackground';
import MagneticButton from './components/MagneticButton';
import GlassCard from './components/GlassCard';
import PaymentSection from './components/PaymentSection';
import ContactModal from './components/ContactModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modules = [
    { title: "Acupuntura y su filosofía", description: "Descubre los meridianos energéticos y la sabiduría milenaria de los canales del cuerpo." },
    { title: "Ejercicios energéticos", description: "Técnicas dinámicas para activar el flujo del Qi y restaurar la vitalidad celular." },
    { title: "Meditación y respiración", description: "Prácticas profundas para aquietar la mente y sincronizar el espíritu con la naturaleza." },
    { title: "Herbalismo y suplementación", description: "Uso terapéutico de hierbas y nutrición específica para el equilibrio de cada órgano." },
  ];

  const contactLinks = [
    { 
      label: "Facebook", 
      url: "https://www.facebook.com/VERORODRIGUEZTRIADA", 
      icon: <span className="text-[#d4af37]">f</span> 
    },
    { 
      label: "Instagram", 
      url: "https://www.instagram.com/verorodriguezpsicologa/", 
      icon: <span className="text-[#d4af37]">ig</span> 
    },
    { 
      label: "WhatsApp", 
      url: "https://wa.me/523312619202?text=Hola,%20vi%20el%20anuncio%20y%20quería%20saber%20más%20información%20del%20curso%20de%20Medicina%20Tradicional%20China", 
      icon: <span className="text-[#d4af37]">wa</span> 
    },
  ];

  return (
    <div className="relative min-h-screen">
      <QiBackground />
      
      {/* Desktop Sticky Header Nav (Contact) */}
      <header className="fixed top-0 left-0 w-full z-50 p-6 hidden md:flex justify-center space-x-12">
        {contactLinks.map((link) => (
          <MagneticButton key={link.label} url={link.url}>
            <span className="text-xs font-cinzel font-bold text-[#d4af37] tracking-[0.2em]">
              {link.label}
            </span>
          </MagneticButton>
        ))}
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-32 pb-40 md:pt-48">
        
        {/* Hero Section */}
        <section className="container mx-auto px-6 text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-cinzel font-bold text-white mb-6 tracking-tighter">
              Sanación <span className="text-[#d4af37]">Integral</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#d4af37]/80 font-cinzel mb-8 tracking-widest uppercase">
              Curso de Medicina Tradicional China
            </p>
            
            <div className="max-w-3xl mx-auto border-t border-b border-[#d4af37]/20 py-10 px-4 bg-black/20 backdrop-blur-sm mb-12">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic mb-4">
                Impartido por la <span className="text-white font-bold underline decoration-[#d4af37]/40 underline-offset-8">Dr. Yolanda Guerrero Calderón</span>
              </p>
              <p className="text-3xl font-cinzel text-[#d4af37] tracking-[0.3em] mb-8">
                31 de Enero de 2026
              </p>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative px-12 py-4 overflow-hidden border border-[#d4af37] text-[#d4af37] font-cinzel font-bold tracking-[0.2em] hover:text-black transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">CONTÁCTANOS</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* Modules Section */}
        <section className="container mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-cinzel text-white mb-4 tracking-wider">Módulos de Aprendizaje</h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto opacity-50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module, idx) => (
              <GlassCard 
                key={idx} 
                title={module.title} 
                description={module.description} 
                index={idx}
              />
            ))}
          </div>
        </section>

        {/* Payment Section */}
        <PaymentSection />

      </main>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        links={contactLinks} 
      />

      {/* Footer Branding */}
      <footer className="relative z-10 py-12 text-center text-gray-500 text-xs font-cinzel uppercase tracking-[0.5em] opacity-40">
        Triada ancestral • 2026 • Medicina tradicional china
      </footer>

      {/* Mobile Sticky Bottom Bar (Contact Buttons) */}
      <div className="fixed bottom-0 left-0 w-full z-50 p-4 flex md:hidden justify-center bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-[2px]">
        <div className="flex space-x-6 items-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-16 h-16 rounded-full border-2 border-[#d4af37] bg-black text-[#d4af37] font-cinzel font-bold text-[8px] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-pulse"
          >
            CONTACTO
          </button>
          <div className="w-px h-8 bg-[#d4af37]/30" />
          {contactLinks.map((link) => (
            <a 
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4af37] text-sm font-bold font-cinzel opacity-80"
            >
              {link.label.substring(0, 2)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
