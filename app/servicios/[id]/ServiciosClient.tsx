"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import type { Especialista, Servicio } from "@/data/db";
import ReservaModal from "@/components/ReservaModal";

export default function ServiciosClient({ especialista }: { especialista: Especialista }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(null);

  return (
    <main className="min-h-screen bg-spa-burgundy relative flex flex-col items-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 opacity-10 bg-[radial-gradient(circle,var(--color-spa-gold)_0%,transparent_60%)] pointer-events-none"></div>
      <nav className="w-full max-w-5xl mx-auto px-6 py-6 relative z-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-spa-gold hover:text-spa-marble font-sans text-sm tracking-widest uppercase"><ArrowLeft size={16} /> Volver</Link>
        <Link href="/" className="text-spa-gold font-script text-3xl">Sensual Girl</Link>
      </nav>
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center mb-16">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-spa-gold relative mb-6 shadow-[0_0_30px_rgba(197,160,89,0.3)]">
            <Image src={especialista.imagen} alt={especialista.nombre} fill sizes="128px" className="object-cover" />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-spa-marble mb-3">{especialista.nombre}</h1>
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-spa-gold font-bold">{especialista.rol}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {especialista.servicios.map((servicio) => (
            <motion.div key={servicio.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#2E0711]/90 backdrop-blur-sm border border-spa-gold/20 p-6 flex flex-col justify-between group hover:border-spa-gold/60">
              <div>
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="font-serif text-xl text-spa-marble group-hover:text-spa-gold leading-tight">{servicio.nombre}</h3>
                  <span className="font-sans font-bold text-lg text-spa-gold shrink-0">{servicio.precio} CUP</span>
                </div>
                <p className="font-sans text-sm text-spa-marble/60 mb-4 font-light">{servicio.descripcion}</p>
              </div>
              <div className="flex justify-between items-center mt-4 border-t border-spa-marble/10 pt-4">
                <div className="flex items-center gap-2 text-spa-gold/80 text-xs tracking-wider uppercase"><Clock size={14} /> <span>{servicio.duracion} min</span></div>
                <button onClick={() => { setSelectedServicio(servicio); setModalOpen(true); }} className="flex items-center gap-2 font-sans text-xs font-bold text-spa-burgundy bg-spa-gold px-4 py-2 rounded-sm hover:bg-spa-marble"><Sparkles size={14} /> RESERVAR</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ReservaModal isOpen={modalOpen} onClose={() => setModalOpen(false)} servicio={selectedServicio} especialista={especialista} />
    </main>
  );
}
