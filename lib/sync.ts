import { obtenerReservasPendientes, eliminarReservaOffline } from './db';

export async function sincronizarReservas() {
  if (!navigator.onLine) return;
  
  const pendientes = await obtenerReservasPendientes();
  for (const reserva of pendientes) {
    try {
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reserva)
      });
      if (res.ok) {
        await eliminarReservaOffline(reserva.id); // Limpiamos la BD local
      }
    } catch (e) {
      console.log("Error al sincronizar, se reintentará luego");
    }
  }
}

// Escuchar cambios de conexión
window.addEventListener('online', sincronizarReservas);
