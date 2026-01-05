import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getDb } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  const db = await getDb();
  return {
    adapter: PrismaAdapter(db),
    providers: [
      GitHub({
        clientId: process.env.AUTH_GITHUB_ID!,
        clientSecret: process.env.AUTH_GITHUB_SECRET!,
      }),
    ],
    secret: process.env.AUTH_SECRET || "development-secret-change-in-production",
    trustHost: true,
  };
});
