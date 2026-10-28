import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { users } from '@/lib/users';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // Creamos la sesión
    const sessionData = JSON.stringify({ id: user.id, role: user.role });
    
    // Next.js 16 exige 'await' aquí
    const cookieStore = await cookies();
    
    cookieStore.set('session', sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 día
      path: '/',
    });

    return NextResponse.json({ success: true, role: user.role });
  } catch (error: unknown) {
    console.error("Error en login:", error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
