import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// 1. Definimos el esquema de validación
const reservaSchema = z.object({
  cliente_nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(255),
  cliente_telefono: z.string().min(5, "El teléfono es obligatorio").max(50),
  servicio_id: z.string(),
  servicio_nombre: z.string(),
  especialista_id: z.string(),
  especialista_nombre: z.string(),
  fecha_hora: z.string().datetime("Formato de fecha inválido (ISO 8601 requerido)"),
  duracion_minutos: z.number().int().positive(),
  precio: z.number().positive(),
  moneda: z.string().length(3).default("CUP"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 2. Validamos los datos
    const parsed = reservaSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const data = parsed.data;
    if (!process.env.DATABASE_URL) throw new Error("Falta DATABASE_URL");

    const sql = neon(process.env.DATABASE_URL);

    // 3. Verificamos conflicto de horario
    const conflicto = await sql`
      SELECT id FROM reservas 
      WHERE especialista_id = ${data.especialista_id} 
      AND fecha_hora = ${data.fecha_hora}
    `;

    if (conflicto.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Esta especialista ya tiene una cita reservada a esta misma hora.' },
        { status: 400 }
      );
    }

    // 4. Insertamos la reserva
    const result = await sql`
      INSERT INTO reservas (
        cliente_nombre, cliente_telefono, servicio_id, servicio_nombre, 
        especialista_id, especialista_nombre, fecha_hora, duracion_minutos, 
        precio, moneda
      ) VALUES (
        ${data.cliente_nombre}, ${data.cliente_telefono}, ${data.servicio_id}, 
        ${data.servicio_nombre}, ${data.especialista_id}, ${data.especialista_nombre}, 
        ${data.fecha_hora}, ${data.duracion_minutos}, ${data.precio}, ${data.moneda}
      ) RETURNING id;
    `;

    return NextResponse.json({ success: true, id: result[0].id });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: 'Error al guardar' }, { status: 500 });
  }
}
