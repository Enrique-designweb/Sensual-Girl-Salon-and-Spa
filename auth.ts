// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const usersMap: Record<string, { id: string; role: string }> = {
  'legna@gmail.com': { id: 'legna', role: 'specialist' },
  'kleyan@gmail.com': { id: 'kleyan', role: 'specialist' },
  'tu_correo@gmail.com': { id: 'admin', role: 'admin' },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email && usersMap[user.email]) {
        return true;
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user && user.email) {
        const customUser = usersMap[user.email];
        token.customId = customUser.id;
        token.role = customUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.customId as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
