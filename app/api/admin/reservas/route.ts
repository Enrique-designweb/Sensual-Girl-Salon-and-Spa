import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

// Estas 3 líneas obligan a Next.js a no pre-renderizar ni cachear la ruta
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const especialistaId = searchParams.get('especialista_id');
    const sql = neon(process.env.DATABASE_URL!);
    
    let result;
    if (especialistaId) {
      result = await sql`SELECT * FROM reservas WHERE especialista_id = ${especialistaId} ORDER BY fecha_hora ASC`;
    } else {
      result = await sql`SELECT * FROM reservas ORDER BY fecha_hora ASC`;
    }
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    return NextResponse.json({ success: false, error: 'Error al obtener reservas' }, { status: 500 });
  }
}
