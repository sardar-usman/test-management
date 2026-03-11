import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider({
    name: "Credentials",
    credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) return null;
      if (credentials.email === process.env.ADMIN_EMAIL && credentials.password === process.env.ADMIN_PASSWORD)
        return { id: "admin", email: process.env.ADMIN_EMAIL, name: "Admin", role: "ADMIN" };
      if (credentials.email === process.env.TEAM_EMAIL && credentials.password === process.env.TEAM_PASSWORD)
        return { id: "team", email: process.env.TEAM_EMAIL, name: "Team", role: "TEAM" };
      return null;
    },
  })],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) { if (user) token.role = user.role; return token; },
    async session({ session, token }) { if (session.user) session.user.role = token.role as "ADMIN" | "TEAM"; return session; },
  },
};
