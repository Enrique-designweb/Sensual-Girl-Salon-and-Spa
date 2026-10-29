"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronDown, Sparkles, MapPin, Phone, ArrowDown, ArrowRight } from "lucide-react";
import PromoBanner from "@/components/PromoBanner";

export default function Home() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowWhatsApp(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs = [
    { q: "¿Cuáles son los métodos de pago aceptados?", a: "Aceptamos efectivo, transferencia (Transfermóvil) y USD para tratamientos seleccionados." },
    { q: "¿Cómo aseguro mi turno?", a: "Solicitamos un depósito del 20% por adelantado. El resto se abona el día de la cita." },
    { q: "¿Con cuánta anticipación debo llegar?", a: "Recomendamos llegar 10 minutos antes para relajarte." },
    { q: "¿Puedo cancelar?", a: "Sí, sin costo hasta 24 horas antes. Si es menos tiempo, el depósito no es reembolsable pero puedes usarlo en 15 días." }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center overflow-hidden bg-spa-burgundy">
      
      {/* HERO LIMPIO */}
      <section className="w-full min-h-dvh relative flex flex-col items-center justify-center text-center px-4 pt-10">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,var(--color-spa-gold)_0%,transparent_65%)] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-40 h-40 md:w-56 md:h-56 relative mb-0">
            <Image src="/logo-face.png" alt="Logo" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain drop-shadow-[0_0_30px_rgba(197,160,89,0.4)]" priority />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="font-script text-6xl md:text-8xl lg:text-9xl text-spa-gold drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] -mt-4 mb-2">Sensual Girl</motion.h1>
          <div className="flex items-center justify-center gap-4 mb-4 w-full">
            <div className="h-px w-12 md:w-24 bg-spa-gold/70"></div>
            <h2 className="font-serif text-xs md:text-base tracking-[0.3em] uppercase text-spa-marble">Salón & Spa</h2>
            <div className="h-px w-12 md:w-24 bg-spa-gold/70"></div>
          </div>
          <p className="font-sans text-base md:text-xl text-spa-marble/80 mb-12 font-light">Tu bienestar, mi prioridad ♡</p>
          
          <Link href="#sobre-nosotras" className="bg-spa-gold text-spa-burgundy font-bold text-xs md:text-sm tracking-widest px-10 py-4 shadow-[0_0_20px_rgba(197,160,89,0.5)] flex items-center gap-2 hover:bg-spa-marble transition-colors">
            CONÓCENOS <ArrowDown size={16} />
          </Link>
        </div>
      </section>

      {/* DIVISOR DORADO */}
      <div className="relative w-full h-16 bg-spa-burgundy flex items-center justify-center -mt-8 z-20">
        <div className="absolute w-full h-px bg-spa-gold/50"></div>
        <div className="relative bg-spa-burgundy px-6 py-2"><div className="w-8 h-8 border border-spa-gold rotate-45 flex items-center justify-center bg-spa-burgundy"><div className="w-3 h-3 bg-spa-gold"></div></div></div>
      </div>

      {/* BANNER PROMOCIONAL (VIDEOS / GIFS CON GLASSMORPHISM) */}
      <PromoBanner />

      {/* SECCIÓN SOBRE NOSOTRAS - TARJETAS GLASSMORPHISM */}
      <section id="sobre-nosotras" className="w-full py-24 px-6 relative">
        <div className="text-center mb-16">
          <Sparkles className="mx-auto text-spa-gold mb-4" size={32} />
          <h2 className="font-serif text-4xl md:text-5xl text-spa-marble mb-4">Sobre Nosotras</h2>
          <p className="font-sans text-spa-marble/70 max-w-xl mx-auto text-sm md:text-base font-light">Toca las tarjetas para conocer a nuestras especialistas.</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Tarjeta Legna */}
          <motion.div 
            onClick={() => setActiveCard(activeCard === 'legna' ? null : 'legna')}
            className="relative w-full h-125nded-2xl overflow-hidden border border-spa-gold/30 cursor-pointer shadow-xl group"
          >
            <Image src="/legna.webp" alt="Legna" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" priority />
            <div className="absolute inset-0 bg-linear-to-t from-spa-burgundy via-transparent to-transparent opacity-90"></div>
            
            <div className="absolute bottom-6 left-6 z-10 right-6 flex justify-between items-end">
              <div>
                <h3 className="font-serif text-4xl text-spa-marble">Legna</h3>
                <p className="font-sans text-xs tracking-widest uppercase text-spa-gold mb-2">Especialista en Masajes</p>
                {/* TEXTO UX PARA INDICAR CLIC */}
                <span className="text-xs font-sans text-spa-marble/90 flex items-center gap-1 bg-spa-burgundy/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-spa-gold/30">
                  Toca para conocer más <ArrowRight size={12} />
                </span>
              </div>
            </div>

            <AnimatePresence>
              {activeCard === 'legna' && (
                <motion.div 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 bg-spa-burgundy/85 backdrop-blur-xl p-8 flex flex-col justify-center"
                >
                  <Sparkles className="text-spa-gold mb-4" size={32} />
                  <p className="font-sans text-sm md:text-base text-spa-marble leading-relaxed mb-6">
                    Con años de experiencia en terapias corporales, Legna se especializa en liberar tensiones profundas, mejorar la circulación y brindar una relajación absoluta.
                  </p>
                  <Link href="/servicios/legna" className="inline-flex items-center gap-2 text-spa-gold font-sans text-sm font-bold tracking-wider hover:text-spa-marble transition-colors">
                    VER TRATAMIENTOS <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Tarjeta Kleyan */}
          <motion.div 
            onClick={() => setActiveCard(activeCard === 'kleyan' ? null : 'kleyan')}
            className="relative w-full h-125 rounded-2xl overflow-hidden border border-spa-gold/30 cursor-pointer shadow-xl group"
          >
            <Image src="/kleyan.webp" alt="Kleyan" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" priority />
            <div className="absolute inset-0 bg-linear-to-t from-spa-burgundy via-transparent to-transparent opacity-90"></div>
            
            <div className="absolute bottom-6 left-6 z-10 right-6 flex justify-between items-end">
              <div>
                <h3 className="font-serif text-4xl text-spa-marble">Kleyan</h3>
                <p className="font-sans text-xs tracking-widest uppercase text-spa-gold mb-2">Especialista Facial</p>
                <span className="text-xs font-sans text-spa-marble/90 flex items-center gap-1 bg-spa-burgundy/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-spa-gold/30">
                  Toca para conocer más <ArrowRight size={12} />
                </span>
              </div>
            </div>

            <AnimatePresence>
              {activeCard === 'kleyan' && (
                <motion.div 
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 bg-spa-burgundy/85 backdrop-blur-xl p-8 flex flex-col justify-center"
                >
                  <Sparkles className="text-spa-gold mb-4" size={32} />
                  <p className="font-sans text-sm md:text-base text-spa-marble leading-relaxed mb-6">
                    Apasionada por la estética avanzada, Kleyan combina técnicas de vanguardia como microneedling, exosomas y armonización facial para rejuvenecer tu piel.
                  </p>
                  <Link href="/servicios/kleyan" className="inline-flex items-center gap-2 text-spa-gold font-sans text-sm font-bold tracking-wider hover:text-spa-marble transition-colors">
                    VER TRATAMIENTOS <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* GALERÍA */}
      <section className="w-full py-24 px-6 bg-spa-burgundy">
        <div className="text-center mb-12"><h2 className="font-serif text-4xl text-spa-marble mb-4">Nuestro Trabajo</h2><p className="font-sans text-spa-marble/70 text-sm">Resultados reales, belleza natural.</p></div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5].map((num) => (
            <motion.div key={num} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: num * 0.1 }} className="relative h-64 md:h-80 w-full bg-spa-marble/5 border border-spa-gold/20 overflow-hidden group cursor-pointer">
              <Image src={`/galeria${num}.webp`} alt={`Resultado ${num}`} fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-24 px-6 bg-[#2E0711]/30 border-t border-spa-gold/10">
        <div className="text-center mb-12"><h2 className="font-serif text-4xl text-spa-marble">Preguntas Frecuentes</h2></div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-spa-gold/20">
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex justify-between p-5 bg-[#2E0711] text-left"><span className="font-serif text-lg text-spa-marble">{faq.q}</span><ChevronDown className={`text-spa-gold transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>
              <AnimatePresence>{openFaq === index && <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-[#1A0409]"><p className="p-5 font-sans text-sm text-spa-marble/70">{faq.a}</p></motion.div>}</AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full pt-16 pb-8 px-6 bg-[#1A0409] border-t border-spa-gold/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="text-center md:text-left"><h3 className="font-script text-4xl text-spa-gold mb-4">Sensual Girl</h3><p className="font-sans text-xs text-spa-marble/50">Tu bienestar, mi prioridad.</p></div>
          <div className="text-center md:text-left"><h4 className="font-serif text-xl text-spa-marble mb-4">Enlaces</h4><ul className="space-y-2 font-sans text-sm text-spa-marble/60"><li><Link href="#sobre-nosotras" className="hover:text-spa-gold">Sobre Nosotras</Link></li><li><Link href="/shop" className="hover:text-spa-gold">Tienda Shop</Link></li></ul></div>
          <div className="text-center md:text-left"><h4 className="font-serif text-xl text-spa-marble mb-4">Contacto</h4><ul className="space-y-3 font-sans text-sm text-spa-marble/60"><li className="flex items-center gap-2 justify-center md:justify-start"><MapPin size={16} className="text-spa-gold" /> Santa Clara, Cuba</li><li className="flex items-center gap-2 justify-center md:justify-start"><Phone size={16} className="text-spa-gold" /> +53 58504812</li></ul></div>
        </div>
        <div className="text-center border-t border-spa-gold/10 pt-6"><p className="font-sans text-[10px] text-spa-marble/40">© {new Date().getFullYear()} Sensual Girl.</p></div>
      </footer>

      {/* WHATSAPP FLOTANTE */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.a initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} href="https://wa.me/5358504812?text=Hola,%20vengo%20de%20la%20web%20de%20Sensual%20Girl." target="_blank" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-3 rounded-full shadow-lg z-50">
            <MessageCircle size={28} />
          </motion.a>
        )}
      </AnimatePresence>
    </main>
  );
}
