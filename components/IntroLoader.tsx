"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-spa-burgundy"
          >
            <div className="relative z-10 flex flex-col items-center w-full px-4">
              <motion.svg viewBox="0 0 500 150" className="w-full max-w-112.5 overflow-visible">
                <motion.text
                  x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                  className="font-script text-6xl md:text-8xl"
                  style={{ stroke: '#C5A059', fill: 'transparent' }}
                  strokeWidth="1.5"
                  initial={{ strokeDasharray: 3000, strokeDashoffset: 3000 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 3.5, ease: "easeInOut" }}
                >
                  Sensual Girl
                </motion.text>
                <motion.text
                  x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                  className="font-script text-6xl md:text-8xl" fill="#C5A059"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1 }}
                >
                  Sensual Girl
                </motion.text>
              </motion.svg>
              <motion.div 
                initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "60%" }} transition={{ duration: 1, delay: 4 }}
                className="h-px bg-spa-gold/50 mt-2 mb-4"
              />
              <motion.p 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 4.5 }}
                className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-spa-marble/90 text-center"
              >
                Tu bienestar, mi prioridad
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {children}
        </motion.div>
      )}
    </>
  );
}
