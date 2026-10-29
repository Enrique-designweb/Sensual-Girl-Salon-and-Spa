"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3800); // Un poco más para leer la bienvenida
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div key="loader" exit={{ opacity: 0, transition: { duration: 1 } }} className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-spa-burgundy">
            <div className="relative z-10 flex flex-col items-center w-full px-4">
              <motion.svg viewBox="0 0 500 150" className="w-full max-w-112.5 overflow-visible">
                <motion.text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="font-script text-6xl md:text-8xl" style={{ stroke: '#C5A059', fill: 'transparent' }} strokeWidth="1.5" initial={{ strokeDasharray: 3000, strokeDashoffset: 3000 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 3, ease: "easeInOut" }}>Sensual Girl</motion.text>
                <motion.text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="font-script text-6xl md:text-8xl" fill="#C5A059" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1 }}>Sensual Girl</motion.text>
              </motion.svg>
              
              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "60%" }} transition={{ duration: 1, delay: 3.5 }} className="h-px bg-spa-gold/50 mt-2 mb-4" />
              
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 3.8 }} className="font-sans text-xs tracking-[0.4em] uppercase text-spa-marble/90 text-center mb-2">
                Tu bienestar, mi prioridad
              </motion.p>
              
              {/* Mensaje de Bienvenida */}
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 4.2 }} className="font-serif text-lg text-spa-gold/80 italic text-center">
                Bienvenida a tu refugio de belleza...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>{children}</motion.div>}
    </>
  );
}
