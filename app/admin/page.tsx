// app/admin/page.tsx
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  // 1. Intentamos leer la sesión de NextAuth (Google)
  const session = await auth();
  
  if (session?.user?.id && session?.user?.role) {
    return <AdminClient userId={session.user.id} role={session.user.role} />;
  }

  // 2. Si no hay sesión de Google, intentamos leer la cookie manual
  const cookieStore = await cookies();
  const manualSession = cookieStore.get('session')?.value;

  let manualUserId = "";
  let manualRole = "";

  if (manualSession) {
    try {
      const parsed = JSON.parse(manualSession);
      manualUserId = parsed.id;
      manualRole = parsed.role;
    } catch {
      // Si la cookie está corrupta, lo mandamos al login
      redirect('/login');
    }
  }

  // 3. Si tenemos los datos de la cookie manual, renderizamos FUERA del try/catch
  if (manualUserId && manualRole) {
    return <AdminClient userId={manualUserId} role={manualRole} />;
  }

  // 4. Si no hay nada, al login
  redirect('/login');
}
