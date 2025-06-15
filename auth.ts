import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getDb } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(getDb()),
  providers: [],
});
