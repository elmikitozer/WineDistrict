import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  const results = await prisma.vin.findMany({
    where: {
      OR: [
        { nom: { contains: q, mode: "insensitive" } },
        { domaine: { contains: q, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      nom: true,
      domaine: true,
      année: true,
    },
    orderBy: { nom: "asc" },
    take: 10,
  });

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
