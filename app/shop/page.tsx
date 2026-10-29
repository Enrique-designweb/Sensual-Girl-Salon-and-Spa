"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Lock, ShoppingBag, Plus, Minus, MessageCircle, Trash2, X, Eye, EyeOff } from "lucide-react";
import { productosPro } from "@/data/productos";

// Ojo animado para la tienda
const AnimatedEye = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button type="button" onClick={onClick} className="absolute right-3 top-3 text-spa-gold/70 hover:text-spa-gold transition-colors">
    <motion.div animate={{ scaleY: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1], repeatDelay: 3 }}>
      {isOpen ? <Eye size={18} /> : <EyeOff size={18} />}
    </motion.div>
  </button>
);

export default function TiendaPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [carrito, setCarrito] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "shop2026") { setIsAuthenticated(true); setError(false); } else { setError(true); }
  };

  const agregarAlCarrito = (id: string) => setCarrito((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const quitarDelCarrito = (id: string) => setCarrito((prev) => { const n = { ...prev }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  const eliminarDelCarrito = (id: string) => setCarrito((prev) => { const n = { ...prev }; delete n[id]; return n; });
  const calcularTotal = () => Object.entries(carrito).reduce((total, [id, cantidad]) => { const prod = productosPro.find((p) => p.id === id); return total + (prod ? prod.precio * cantidad : 0); }, 0);

  const enviarPedidoWhatsApp = () => {
    if (Object.keys(carrito).length === 0) return;
    let mensaje = "¡Hola! Vengo de la web de Sensual Girl Shop. Pedido:\n\n";
    Object.entries(carrito).forEach(([id, cantidad]) => { const prod = productosPro.find((p) => p.id === id); if (prod) mensaje += `▪️ ${cantidad}x ${prod.nombre} ($${prod.precio * cantidad})\n`; });
    mensaje += `\n*TOTAL: $${calcularTotal()}*`;
    window.open(`https://wa.me/5358504812?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-spa-burgundy relative flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,var(--color-spa-gold)_0%,transparent_70%)] pointer-events-none"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-sm bg-[#2E0711]/90 backdrop-blur-md border border-spa-gold/30 p-8 rounded-sm text-center shadow-2xl">
          <Lock className="mx-auto text-spa-gold mb-4" size={32} />
          <h1 className="font-serif text-3xl text-spa-marble mb-2">Tienda Exclusiva</h1>
          <p className="text-xs text-spa-marble/50 uppercase tracking-widest mb-6">Acceso Privado</p>
          <form onSubmit={handleLogin} className="space-y-4 relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-spa-burgundy border border-spa-gold/30 rounded-sm p-4 pr-10 text-spa-marble text-center outline-none focus:border-spa-gold font-sans" 
            />
            <AnimatedEye isOpen={showPassword} onClick={() => setShowPassword(!showPassword)} />
            {error && <p className="text-red-400 text-xs">Contraseña incorrecta (Usa: shop2026)</p>}
            <button type="submit" className="w-full bg-spa-gold text-spa-burgundy font-bold py-4 rounded-sm hover:bg-spa-marble transition-colors">INGRESAR</button>
          </form>
          <Link href="/" className="inline-block mt-6 text-spa-gold/60 hover:text-spa-gold text-xs font-sans uppercase transition-colors">Volver al inicio</Link>
        </motion.div>
      </main>
    );
  }

  const totalItems = Object.values(carrito).reduce((a, b) => a + b, 0);
  
  return (
    <main className="min-h-screen bg-spa-burgundy relative pb-32">
      <nav className="w-full max-w-5xl mx-auto px-6 py-6 flex justify-between items-center border-b border-spa-gold/20">
        <Link href="/" className="flex items-center gap-2 text-spa-gold font-sans text-sm tracking-widest uppercase hover:text-spa-marble transition-colors"><ArrowLeft size={16} /> Salir</Link>
        <div className="text-spa-gold font-script text-3xl">Sensual Girl Boutique</div>
      </nav>
      
      <div className="w-full max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-serif text-4xl text-spa-marble mb-2">Nuestra Tienda</h1>
        <p className="font-sans text-sm text-spa-marble/60 mb-10">Productos exclusivos para profesionales y amantes del cuidado premium.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosPro.map((prod) => (
            <div key={prod.id} className="bg-[#2E0711]/80 border border-spa-gold/20 rounded-sm flex flex-col justify-between group hover:border-spa-gold/50 transition-colors">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] text-spa-gold bg-spa-gold/10 px-2 py-1 rounded-sm uppercase tracking-wider">{prod.categoria}</span>
                  <span className="font-bold text-lg text-spa-gold">${prod.precio}</span>
                </div>
                <h3 className="font-serif text-xl text-spa-marble mt-3 mb-2 group-hover:text-spa-gold transition-colors">{prod.nombre}</h3>
                <p className="font-sans text-xs text-spa-marble/60 leading-relaxed">{prod.descripcion}</p>
              </div>
              <div className="p-4 bg-[#1A0409]/50 border-t border-spa-gold/10 flex justify-between items-center">
                <span className="font-sans text-xs text-spa-marble/50">Añadir:</span>
                <div className="flex items-center gap-3 bg-spa-burgundy border border-spa-gold/30 rounded-sm p-1">
                  {carrito[prod.id] && (
                    <>
                      <button onClick={() => quitarDelCarrito(prod.id)} className="p-1 text-spa-marble hover:text-spa-gold"><Minus size={16}/></button>
                      <span className="font-bold text-spa-gold w-4 text-center">{carrito[prod.id]}</span>
                    </>
                  )}
                  <button onClick={() => agregarAlCarrito(prod.id)} className="p-1 text-spa-gold hover:text-white"><Plus size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barra flotante del carrito */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} onClick={() => setIsCartOpen(true)} className="fixed bottom-0 left-0 right-0 bg-[#1A0409] border-t border-spa-gold/30 p-4 cursor-pointer z-40 hover:bg-[#2E0711] transition-colors">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-spa-gold" size={28} />
                <div>
                  <p className="font-sans text-xs text-spa-marble/60 uppercase tracking-widest">Ver Carrito</p>
                  <p className="font-serif text-2xl text-spa-gold">${calcularTotal()}</p>
                </div>
              </div>
              <div className="bg-[#25D366] text-white font-bold px-6 py-3 rounded-sm flex items-center gap-2"><MessageCircle size={18} /> PAGAR</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal del Carrito */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="bg-[#1A0409] border border-spa-gold/30 w-full max-w-md rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden max-h-[90vh]">
              <div className="flex justify-between items-center p-6 border-b border-spa-gold/20 bg-[#2E0711]">
                <h3 className="font-serif text-2xl text-spa-gold">Tu Carrito</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-spa-marble/50 hover:text-spa-marble"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {Object.entries(carrito).map(([id, cantidad]) => {
                  const prod = productosPro.find((p) => p.id === id); if (!prod) return null;
                  return (
                    <div key={id} className="flex justify-between bg-[#2E0711]/50 p-4 rounded-sm border border-spa-gold/10">
                      <div className="flex-1 pr-4">
                        <h4 className="font-serif text-lg text-spa-marble leading-tight mb-1">{prod.nombre}</h4>
                        <p className="text-sm text-spa-gold">${prod.precio} c/u</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-3 bg-spa-burgundy border border-spa-gold/30 rounded-sm p-1">
                          <button onClick={() => quitarDelCarrito(id)} className="p-1 text-spa-marble hover:text-spa-gold"><Minus size={14}/></button>
                          <span className="font-bold text-spa-gold w-4 text-center text-sm">{cantidad}</span>
                          <button onClick={() => agregarAlCarrito(id)} className="p-1 text-spa-gold hover:text-white"><Plus size={14}/></button>
                        </div>
                        <button onClick={() => eliminarDelCarrito(id)} className="text-red-400/70 hover:text-red-400 text-xs flex items-center gap-1 transition-colors"><Trash2 size={12}/> Eliminar</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-6 border-t border-spa-gold/20 bg-[#2E0711]">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-spa-marble/70 uppercase tracking-widest text-sm">Total a Pagar</span>
                  <span className="font-serif text-3xl text-spa-gold">${calcularTotal()}</span>
                </div>
                <button onClick={enviarPedidoWhatsApp} className="w-full bg-[#25D366] text-white font-bold py-4 rounded-sm flex items-center justify-center gap-2 hover:bg-[#20b858] transition-colors">
                  <MessageCircle size={20} /> CONFIRMAR PEDIDO
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
