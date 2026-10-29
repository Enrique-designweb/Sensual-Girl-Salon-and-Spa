"use client";

import { motion } from "framer-motion";

const promos = [
  { src: "/videos/promo-1.mp4", titulo: "Alta Cosmética Profesional" },
  { src: "/videos/promo-2.mp4", titulo: "Experiencia Exclusiva" },
  { src: "/videos/promo-3.mp4", titulo: "Bienestar en Pareja" },
  { src: "/videos/promo-4.mp4", titulo: "Labios de Ensueño" },
];

export default function PromoBanner() {
  return (
    <section className="w-full py-12 relative overflow-hidden bg-spa-burgundy">
      
      {/* Efecto de Cristal Esmerilado */}
      <div className="absolute inset-0 bg-[#2E0711]/40 backdrop-blur-2xl border-y border-spa-gold/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-8 text-center">
        <h2 className="font-serif text-3xl text-spa-gold mb-2">Resultados que hablan por sí solos</h2>
        <p className="font-sans text-spa-marble/60 text-sm">Descubre la magia de nuestros tratamientos.</p>
      </div>
      
      {/* Carrusel */}
      <div className="relative z-10 flex w-[200%]">
        {/* Primera copia */}
        <motion.div 
          className="flex gap-4 w-1/2 pl-4"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {promos.map((promo, index) => (
            <div 
              key={index} 
              className="relative w-64 md:w-72 aspect-9/16 shrink-0 rounded-xl overflow-hidden border border-spa-gold/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-spa-dark"
            >
              <video 
                src={promo.src} 
                autoPlay 
                loop 
                muted 
                playsInline 
                // El primer video carga en auto, el resto solo metadata
                preload={index === 0 ? "auto" : "metadata"}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 pt-12">
                <p className="font-sans text-xs text-spa-gold font-bold tracking-widest uppercase leading-tight">{promo.titulo}</p>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Segunda copia */}
        <motion.div 
          className="flex gap-4 w-1/2 pl-4"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {promos.map((promo, index) => (
            <div 
              key={`dup-${index}`} 
              className="relative w-64 md:w-72 aspect-9/16 shrink-0 rounded-xl overflow-hidden border border-spa-gold/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-spa-dark"
            >
              <video 
                src={promo.src} 
                autoPlay 
                loop 
                muted 
                playsInline 
                preload={index === 0 ? "auto" : "metadata"}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 pt-12">
                <p className="font-sans text-xs text-spa-gold font-bold tracking-widest uppercase leading-tight">{promo.titulo}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
