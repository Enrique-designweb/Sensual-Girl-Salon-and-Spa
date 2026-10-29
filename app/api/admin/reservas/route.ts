import { neon } from '@neondatabase/serverless';
import { connection, NextResponse } from 'next/server';

export async function GET(request: Request) {
  await connection();
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
