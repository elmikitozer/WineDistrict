import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  // get user cavisteId
  const user = await (prisma as any).user?.findUnique({
    where: { id: session.userId },
    select: { cavisteId: true },
  });
  if (!user?.cavisteId) {
    return NextResponse.json({ error: "Aucun caviste associé" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const status = (searchParams.get("status") || "").trim();
  const q = (searchParams.get("q") || "").trim();

  const andFilters: any[] = [{ cavisteId: user.cavisteId }];
  if (["en_attente", "confirmee", "annulee"].includes(status)) {
    andFilters.push({ status });
  }
  if (q) {
    andFilters.push({
      OR: [
        { vin: { is: { nom: { contains: q, mode: "insensitive" } } } },
        { vin: { is: { domaine: { contains: q, mode: "insensitive" } } } },
      ],
    });
  }
  const where = andFilters.length > 1 ? { AND: andFilters } : andFilters[0];

  const reservations = await prisma.reservation.findMany({
    where,
    orderBy: { date: "desc" },
    include: { vin: true },
  });

  return NextResponse.json({ items: reservations });
}
