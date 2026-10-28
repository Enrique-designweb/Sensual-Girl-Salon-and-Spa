"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Phone, User, MessageCircle, Download } from "lucide-react";
import type { Servicio, Especialista } from "@/data/db";

interface ReservaModalProps {
  isOpen: boolean;
  onClose: () => void;
  servicio: Servicio | null;
  especialista: Especialista;
}

export default function ReservaModal({ isOpen, onClose, servicio, especialista }: ReservaModalProps) {
  const [fechaHora, setFechaHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isProcessing = useRef(false); 

  let horaFin = "";
  if (fechaHora && servicio) {
    const inicio = new Date(fechaHora);
    const fin = new Date(inicio.getTime() + servicio.duracion * 60000);
    horaFin = fin.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  if (!isOpen || !servicio) return null;

  const descargarICS = () => {
    if (!fechaHora) return;
    const inicio = new Date(fechaHora);
    const fin = new Date(inicio.getTime() + servicio.duracion * 60000);
    const formatUTC = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Sensual Girl//Spa//ES\nBEGIN:VEVENT\nUID:${Date.now()}@sensualgirl.com\nDTSTAMP:${formatUTC(new Date())}\nDTSTART:${formatUTC(inicio)}\nDTEND:${formatUTC(fin)}\nSUMMARY:${servicio.nombre} en Sensual Girl\nDESCRIPTION:Tu cita con ${especialista.nombre}. Duración: ${servicio.duracion} minutos.\nLOCATION:Sensual Girl\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `cita-sensual-girl.ics`;
    link.click();
  };

  const enviarWhatsApp = async () => {
    if (isProcessing.current) return;
    if (!fechaHora || !nombre || !telefono) return alert("Por favor, llena todos los campos.");
    
    isProcessing.current = true;
    setIsLoading(true);

    const opcionesFecha: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaStr = new Date(fechaHora).toLocaleDateString('es-ES', opcionesFecha);
    const horaStr = new Date(fechaHora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });

    try {
      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_nombre: nombre,
          cliente_telefono: telefono,
          servicio_id: servicio.id,
          servicio_nombre: servicio.nombre,
          especialista_id: especialista.id,
          especialista_nombre: especialista.nombre,
          fecha_hora: new Date(fechaHora).toISOString(),
          duracion_minutos: servicio.duracion,
          precio: servicio.precio,
          moneda: servicio.moneda,
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
         isProcessing.current = false;
         setIsLoading(false);
         alert(data.error || "Este horario ya está ocupado.");
         return;
      }

      const telefonoSpa = "5358504812"; 
      const mensaje = `¡Hola ${especialista.nombre}! Soy ${nombre}. Acabo de reservar *${servicio.nombre}* para el día *${fechaStr}* a las *${horaStr}*. Mi número es ${telefono}.`;
      window.open(`https://wa.me/${telefonoSpa}?text=${encodeURIComponent(mensaje)}`, '_blank');
      
      setIsLoading(false);
      onClose();
      
    } catch (error) {
      console.error(error);
      isProcessing.current = false;
      setIsLoading(false);
      alert("Hubo un problema de conexión, pero puedes continuar por WhatsApp.");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} className="bg-spa-burgundy border border-spa-gold/30 w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-spa-marble/50 hover:text-spa-marble" type="button"><X size={24} /></button>
          <h3 className="font-serif text-3xl text-spa-gold mb-2">Reservar Cita</h3>
          <p className="font-sans text-sm text-spa-marble/80 mb-6 border-b border-spa-marble/10 pb-4">{servicio.nombre} con <span className="font-bold text-spa-gold">{especialista.nombre}</span></p>
          <div className="space-y-4">
            <div>
              <label className="text-xs tracking-widest text-spa-gold uppercase mb-2 block font-bold items-center gap-2"><Calendar size={14} /> Fecha y Hora</label>
              <input type="datetime-local" value={fechaHora} onChange={(e) => setFechaHora(e.target.value)} className="w-full bg-[#2E0711] border border-spa-gold/30 rounded-sm p-3 text-spa-marble outline-none focus:border-spa-gold font-sans" />
            </div>
            {horaFin && (
              <div className="bg-spa-gold/10 border border-spa-gold/30 p-3 rounded-sm flex items-center gap-3 text-sm text-spa-marble font-sans">
                <Clock size={16} className="text-spa-gold shrink-0" />
                <p>Dura <strong className="text-spa-gold">{servicio.duracion} min</strong>. Finaliza a las <strong className="text-spa-gold">{horaFin}</strong>.</p>
              </div>
            )}
            <div>
              <label className="text-xs tracking-widest text-spa-gold uppercase mb-2 block font-bold items-center gap-2"><User size={14} /> Tu Nombre</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Ana Pérez" className="w-full bg-[#2E0711] border border-spa-gold/30 rounded-sm p-3 text-spa-marble outline-none focus:border-spa-gold font-sans placeholder-spa-marble/20" />
            </div>
            <div>
              <label className="text-xs tracking-widest text-spa-gold uppercase mb-2 block font-bold items-center gap-2"><Phone size={14} /> Tu Teléfono</label>
              <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ej. +53 555 5555" className="w-full bg-[#2E0711] border border-spa-gold/30 rounded-sm p-3 text-spa-marble outline-none focus:border-spa-gold font-sans placeholder-spa-marble/20" />
            </div>
            <div className="pt-4 flex flex-col gap-3">
              <button onClick={enviarWhatsApp} disabled={isLoading} type="button" className="w-full bg-[#25D366] text-white font-sans font-bold py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-[#20b858] disabled:opacity-50">
                <MessageCircle size={20} /> {isLoading ? "GUARDANDO..." : "CONFIRMAR POR WHATSAPP"}
              </button>
              <button onClick={descargarICS} disabled={!fechaHora} type="button" className="w-full bg-transparent border border-spa-gold text-spa-gold font-sans font-bold py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-spa-gold hover:text-spa-burgundy disabled:opacity-50">
                <Download size={20} /> AÑADIR AL CALENDARIO
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
