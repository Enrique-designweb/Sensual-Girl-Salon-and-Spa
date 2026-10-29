"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Solo los dos videos más ligeros
const promos = [
  { src: "/videos/promo-1.mp4", titulo: "Alta Cosmética Profesional", poster: "/galeria1.webp" },
  { src: "/videos/promo-4.mp4", titulo: "Labios de Ensueño", poster: "/galeria4.webp" },
];

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout;
    let showTimer: NodeJS.Timeout;

    const startCycle = () => {
      setIsVisible(true);
      
      // Después de 20 segundos (tiempo suficiente para ver los videos), se oculta
      hideTimer = setTimeout(() => {
        setIsVisible(false);

        // Después de 30 segundos oculto, vuelve a aparecer
        showTimer = setTimeout(() => {
          startCycle();
        }, 30000);

      }, 20000); // Puedes ajustar los 20s si quieres que dure más tiempo visible
    };

    startCycle();

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
    };
  }, []);

  return (
    <section className="w-full py-12 relative overflow-hidden bg-spa-burgundy min-h-112.5">
      
      {/* Efecto de Cristal Esmerilado (siempre visible) */}
      <div className="absolute inset-0 bg-[#2E0711]/40 backdrop-blur-2xl border-y border-spa-gold/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-8 text-center">
        <h2 className="font-serif text-3xl text-spa-gold mb-2">Resultados que hablan por sí solos</h2>
        <p className="font-sans text-spa-marble/60 text-sm">Descubre la magia de nuestros tratamientos.</p>
      </div>
      
      {/* El carrusel solo se renderiza si isVisible es true */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }} // Transición suave de 1 segundo
            className="relative z-10 flex w-max"
          >
            {/* Primera copia del carrusel */}
            <motion.div 
              className="flex gap-6 pr-6"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }} // 25s para que los videos pasen con calma
            >
              {promos.map((promo, index) => (
                <div 
                  key={index} 
                  className="relative w-64 md:w-80 aspect-9/16hrink-0 rounded-xl overflow-hidden border border-spa-gold/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#1A0409]"
                >
                  <video 
                    src={promo.src} 
                    poster={promo.poster}
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="auto"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 pt-12">
                    <p className="font-sans text-xs text-spa-gold font-bold tracking-widest uppercase leading-tight">{promo.titulo}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            
            {/* Segunda copia (duplicada) para efecto infinito */}
            <motion.div 
              className="flex gap-6 pr-6"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            >
              {promos.map((promo, index) => (
                <div 
                  key={`dup-${index}`} 
                  className="relative w-64 md:w-80 aspect-9/16 shrink-0 rounded-xl overflow-hidden border border-spa-gold/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-[#1A0409]"
                >
                  <video 
                    src={promo.src} 
                    poster={promo.poster}
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    preload="metadata"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 pt-12">
                    <p className="font-sans text-xs text-spa-gold font-bold tracking-widest uppercase leading-tight">{promo.titulo}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
