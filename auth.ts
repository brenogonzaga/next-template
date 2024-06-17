import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db/prisma";

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [],
  secret: process.env.NEXT_AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
