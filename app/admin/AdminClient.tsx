// app/admin/AdminClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importamos el router
import Link from "next/link";
import { Calendar as CalendarIcon, TrendingUp, Settings, ArrowLeft, Clock, CheckCircle, ChevronLeft, ChevronRight, LogOut } from "lucide-react";

interface Reserva {
  id: number;
  cliente_nombre: string;
  cliente_telefono: string;
  servicio_id: string;
  servicio_nombre: string;
  especialista_id: string;
  especialista_nombre: string;
  fecha_hora: string;
  duracion_minutos: number;
  precio: number;
  moneda: string;
}

export default function AdminClient({ userId, role }: { userId: string; role: string }) {
  const [activeTab, setActiveTab] = useState("calendario");
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const router = useRouter(); // Inicializamos el router
  
  const hoyStr = new Date().toISOString().split('T')[0];
  
  const [selectedDate, setSelectedDate] = useState(hoyStr);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const url = role === 'specialist' 
      ? `/api/admin/reservas?especialista_id=${userId}` 
      : '/api/admin/reservas';

    fetch(url)
      .then(res => res.json())
      .then(data => { if(data.success) setReservas(data.data); })
      .catch((error) => console.error("Error al obtener reservas:", error));
  }, [userId, role]);

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const reservasDelDia = reservas.filter(r => r.fecha_hora.startsWith(selectedDate));
  const esFechaPasada = selectedDate < hoyStr;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, () => null);
  const allDays = [...emptyDays, ...days];

  const nextMonth = () => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); } else setCurrentMonth(currentMonth + 1); };
  const prevMonth = () => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); } else setCurrentMonth(currentMonth - 1); };

  const notificarEspecialista = (reserva: Reserva) => {
    const telefono = reserva.especialista_id === 'legna' ? '5358504812' : '5358504812'; 
    const mensaje = `¡Hola ${reserva.especialista_nombre}! Tienes una nueva cita confirmada.\n\n👤 Cliente: ${reserva.cliente_nombre}\n📞 Teléfono: ${reserva.cliente_telefono}\n💆‍♀️ Servicio: ${reserva.servicio_nombre}\n📅 Fecha: ${new Date(reserva.fecha_hora).toLocaleString('es-ES')}\n⏱️ Duración: ${reserva.duracion_minutos} min.`;
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  const totalIngresos = reservas.reduce((sum, r) => sum + Number(r.precio), 0);
  const totalCitas = reservas.length;

  return (
    <main className="min-h-screen bg-[#1A0409] text-spa-marble flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-spa-burgundy border-r border-spa-gold/20 p-6 flex flex-col">
        <h1 className="font-script text-3xl text-spa-gold mb-2 text-center capitalize">
          Panel de {userId}
        </h1>
        <p className="text-center text-xs text-spa-marble/50 uppercase tracking-widest mb-10">
          {role === 'admin' ? 'Administrador' : 'Especialista'}
        </p>
        
        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab("calendario")} className={`w-full flex items-center gap-3 p-3 rounded-sm font-sans text-sm ${activeTab === 'calendario' ? 'bg-spa-gold text-spa-burgundy font-bold' : 'hover:bg-spa-gold/10'}`}><CalendarIcon size={18} /> Calendario</button>
          <button onClick={() => setActiveTab("ingresos")} className={`w-full flex items-center gap-3 p-3 rounded-sm font-sans text-sm ${activeTab === 'ingresos' ? 'bg-spa-gold text-spa-burgundy font-bold' : 'hover:bg-spa-gold/10'}`}><TrendingUp size={18} /> Ingresos</button>
          <button onClick={() => setActiveTab("configuracion")} className={`w-full flex items-center gap-3 p-3 rounded-sm font-sans text-sm ${activeTab === 'configuracion' ? 'bg-spa-gold text-spa-burgundy font-bold' : 'hover:bg-spa-gold/10'}`}><Settings size={18} /> Configuración</button>
        </nav>
        
        {/* BOTONES DE NAVEGACIÓN Y LOGOUT */}
        <div className="mt-10 space-y-4 pt-4 border-t border-spa-gold/20">
          <Link href="/" className="flex items-center gap-2 text-spa-marble/60 hover:text-spa-gold text-xs uppercase transition-colors">
            <ArrowLeft size={16} /> Volver a la Web
          </Link>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-red-400/80 hover:text-red-400 text-xs uppercase transition-colors w-full"
          >
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </aside>
      
      <section className="flex-1 p-6 md:p-10">
        {activeTab === "calendario" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-spa-burgundy/50 border border-spa-gold/20 rounded-md p-6">
              <div className="flex justify-between items-center mb-6">
                <button onClick={prevMonth}><ChevronLeft className="text-spa-gold" /></button>
                <h2 className="font-serif text-xl text-spa-marble">{monthNames[currentMonth]} {currentYear}</h2>
                <button onClick={nextMonth}><ChevronRight className="text-spa-gold" /></button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-spa-gold/60 mb-2">
                {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                {allDays.map((day, idx) => {
                  if (day === null) return <div key={`empty-${idx}`} />;
                  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isPast = dateStr < hoyStr;
                  const isSelected = dateStr === selectedDate;
                  const hasReservas = reservas.some(r => r.fecha_hora.startsWith(dateStr));

                  return (
                    <button key={day} onClick={() => setSelectedDate(dateStr)} className={`p-2 rounded-sm text-sm transition-all relative cursor-pointer ${isPast ? 'text-spa-marble/30 hover:bg-spa-gold/10' : 'text-spa-marble hover:bg-spa-gold/20'} ${isSelected ? 'bg-spa-gold text-spa-burgundy font-bold' : ''}`}>
                      {day}
                      {hasReservas && !isSelected && <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isPast ? 'bg-spa-marble/30' : 'bg-spa-gold'}`}></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl mb-6">Citas del {selectedDate.split('-').reverse().join('/')}</h2>
              {reservasDelDia.length === 0 ? (
                <div className="bg-spa-burgundy/50 border border-spa-gold/20 p-8 text-center text-spa-marble/50">No hay citas para este día.</div>
              ) : (
                <div className="space-y-4">
                  {reservasDelDia.map((reserva) => (
                    <div key={reserva.id} className="bg-[#2E0711] border border-spa-gold/20 p-5 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Clock size={16} className="text-spa-gold" />
                          <span className="font-bold text-spa-gold">{new Date(reserva.fecha_hora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                          <span className="text-xs text-spa-marble/50 ml-2">({reserva.duracion_minutos} min)</span>
                        </div>
                        <p className="font-serif text-xl text-spa-marble">{reserva.servicio_nombre}</p>
                        <p className="font-sans text-sm text-spa-marble/70">Cliente: {reserva.cliente_nombre} - {reserva.cliente_telefono}</p>
                        <p className="font-sans text-xs text-spa-gold uppercase tracking-wider mt-2">Especialista: {reserva.especialista_nombre}</p>
                      </div>
                      {!esFechaPasada && (
                        <button onClick={() => notificarEspecialista(reserva)} className="bg-[#25D366]/10 border border-[#25D366] text-[#25D366] px-4 py-2 rounded-sm text-xs font-bold flex items-center gap-2 hover:bg-[#25D366] hover:text-white transition-colors">
                          <CheckCircle size={16} /> NOTIFICAR
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "ingresos" && (
          <div>
            <h2 className="font-serif text-3xl mb-6">Resumen de Ingresos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-spa-burgundy/80 border border-spa-gold/20 p-6 rounded-md">
                <p className="font-sans text-xs uppercase tracking-widest text-spa-marble/60 mb-2">Citas Registradas</p>
                <p className="font-serif text-4xl text-spa-gold">{totalCitas}</p>
              </div>
              <div className="bg-spa-burgundy/80 border border-spa-gold/20 p-6 rounded-md">
                <p className="font-sans text-xs uppercase tracking-widest text-spa-marble/60 mb-2">Ingresos Totales</p>
                <p className="font-serif text-4xl text-spa-gold">{totalIngresos.toLocaleString()} CUP</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "configuracion" && (
          <div>
            <h2 className="font-serif text-3xl mb-6">Configuración</h2>
            <div className="bg-spa-burgundy/50 border border-spa-gold/20 p-8 text-center text-spa-marble/50">Módulo de configuración en construcción...</div>
          </div>
        )}
      </section>
    </main>
  );
}
