import NextAuth, { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session { user: { role: "ADMIN" | "TEAM" } & DefaultSession["user"]; }
  interface User { role: "ADMIN" | "TEAM"; }
}
declare module "next-auth/jwt" { interface JWT { role?: "ADMIN" | "TEAM"; } }
