import { openDB } from 'idb';

const DB_NAME = 'sensual-girl-offline';
const STORE_NAME = 'reservas-pendientes';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

// Guardar reserva offline
export async function guardarReservaOffline(reserva: any) {
  const db = await getDB();
  return db.add(STORE_NAME, { ...reserva, syncStatus: 'pendiente' });
}

// Obtener todas las reservas pendientes
export async function obtenerReservasPendientes() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

// Eliminar reserva (cuando ya se sincronizó)
export async function eliminarReservaOffline(id: number) {
  const db = await getDB();
  return db.delete(STORE_NAME, id);
}
