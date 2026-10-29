"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

// Componente del Ojo Animado
const AnimatedEye = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <button type="button" onClick={onClick} className="absolute right-3 top-3 text-spa-gold/70 hover:text-spa-gold transition-colors">
      <motion.div
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ repeat: Infinity, duration: 4, times: [0, 0.05, 0.1], repeatDelay: 3 }}
      >
        {isOpen ? <Eye size={18} /> : <EyeOff size={18} />}
      </motion.div>
    </button>
  );
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Ocurrió un error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-spa-burgundy flex items-center justify-center px-4">
      <div className="bg-[#2E0711] p-8 rounded-lg border border-spa-gold/30 w-full max-w-md shadow-2xl">
        <h1 className="font-script text-5xl text-spa-gold text-center mb-2">Acceso Staff</h1>
        <p className="text-center text-xs text-spa-marble/50 uppercase tracking-widest mb-8">Sensual Girl Spa</p>
        
        {error && <p className="text-red-400 text-sm text-center mb-4 bg-red-900/20 p-3 rounded border border-red-500/30">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs text-spa-gold uppercase tracking-widest mb-2 block font-bold">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-spa-gold/50" size={18} />
              <input 
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-spa-burgundy border border-spa-gold/30 rounded-sm p-3 pl-10 text-spa-marble outline-none focus:border-spa-gold transition-colors" 
                placeholder="legna@sensualgirl.com" required
              />
            </div>
          </div>
          
          <div>
            <label className="text-xs text-spa-gold uppercase tracking-widest mb-2 block font-bold">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-spa-gold/50" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-spa-burgundy border border-spa-gold/30 rounded-sm p-3 pl-10 pr-10 text-spa-marble outline-none focus:border-spa-gold transition-colors" 
                placeholder="••••••••" required
              />
              <AnimatedEye isOpen={showPassword} onClick={() => setShowPassword(!showPassword)} />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-spa-gold text-spa-burgundy font-bold py-3 rounded-sm hover:bg-spa-marble transition-colors disabled:opacity-50 mt-2">
            {isLoading ? "VERIFICANDO..." : "INGRESAR"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-px w-full bg-spa-gold/20"></div>
          <span className="text-xs text-spa-marble/50 uppercase">O</span>
          <div className="h-px w-full bg-spa-gold/20"></div>
        </div>

        <div className="mt-6">
          <button type="button" onClick={() => signIn('google', { callbackUrl: '/admin' })} className="w-full bg-white text-gray-800 font-bold py-3 rounded-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuar con Google
          </button>
        </div>
      </div>
    </main>
  );
}
