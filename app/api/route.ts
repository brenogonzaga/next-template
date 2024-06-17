import prisma from "@/lib/db/prisma";

export const runtime = "edge";

export async function GET(request: Request) {
  const numVisitors = await prisma.visit.count();
  return new Response(`You have had ${numVisitors} visitors!`);
}
