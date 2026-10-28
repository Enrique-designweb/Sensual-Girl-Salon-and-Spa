"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const promos = [
  { src: "/promo1.webp", alt: "Antes y Después 1", tipo: "image" },
  { src: "/promo2.gif", alt: "Antes y Después 2", tipo: "image" },
  { src: "/promo-video.mp4", alt: "Video Tratamiento", tipo: "video" },
  { src: "/promo3.webp", alt: "Antes y Después 3", tipo: "image" },
  { src: "/promo4.webp", alt: "Antes y Después 4", tipo: "image" },
];

export default function PromoBanner() {
  return (
    <section className="w-full py-12 relative overflow-hidden bg-spa-burgundy">
      
      {/* Efecto de Cristal Esmerilado (Glassmorphism) */}
      <div className="absolute inset-0 bg-[#2E0711]/40 backdrop-blur-2xl border-y border-spa-gold/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 mb-8 text-center">
        <h2 className="font-serif text-3xl text-spa-gold mb-2">Resultados que hablan por sí solos</h2>
        <p className="font-sans text-spa-marble/60 text-sm">Descubre la magia de nuestros tratamientos.</p>
      </div>
      
      {/* Contenedor del carrusel infinito */}
      <div className="relative z-10 flex w-[200%]">
        {/* Primera copia del carrusel */}
        <motion.div 
          className="flex gap-6 w-1/2 pl-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {promos.map((promo, index) => (
            <div key={index} className="relative w-64 h-80 md:w-80 md:h-96 shrink-0 rounded-xl overflow-hidden border border-spa-gold/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              {promo.tipo === "video" ? (
                <video 
                  src={promo.src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image 
                  src={promo.src} 
                  alt={promo.alt} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              )}
              {/* Etiqueta de Antes/Después opcional */}
              <div className="absolute bottom-0 inset-x-0 bg-linear-to-trom-black/80 to-transparent p-4">
                <p className="font-sans text-xs text-spa-gold font-bold tracking-widest uppercase">Antes / Después</p>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Segunda copia del carrusel para el efecto infinito */}
        <motion.div 
          className="flex gap-6 w-1/2 pl-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {promos.map((promo, index) => (
            <div key={`dup-${index}`} className="relative w-64 h-80 md:w-80 md:h-96 shrink-0 rounded-xl overflow-hidden border border-spa-gold/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              {promo.tipo === "video" ? (
                <video 
                  src={promo.src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image 
                  src={promo.src} 
                  alt={promo.alt} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              )}
              <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/80 to-transparent p-4">
                <p className="font-sans text-xs text-spa-gold font-bold tracking-widest uppercase">Antes / Después</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
