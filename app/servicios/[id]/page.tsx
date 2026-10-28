import { Suspense } from "react";
import { especialistas } from "@/data/db";
import Link from "next/link";
import ServiciosClient from "./ServiciosClient"; 

export default function ServiciosEspecialistaPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-spa-burgundy flex items-center justify-center text-spa-gold font-sans tracking-widest uppercase">Cargando...</div>}>
      <EspecialistaContent params={params} />
    </Suspense>
  );
}

async function EspecialistaContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const especialista = especialistas.find((e) => e.id === id);

  if (!especialista) {
    return (
      <main className="min-h-screen bg-spa-burgundy flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-serif text-4xl text-spa-marble mb-4">Especialista no encontrada</h1>
        <Link href="/" className="bg-spa-gold text-spa-burgundy font-bold px-8 py-3 rounded-sm mt-4 hover:bg-spa-marble">Volver al Inicio</Link>
      </main>
    );
  }
  return <ServiciosClient especialista={especialista} />;
}
