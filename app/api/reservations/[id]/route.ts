import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const StatusSchema = z.object({
  status: z.enum(["en_attente", "confirmee", "annulee"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = StatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  // Récupérer l'utilisateur avec son cavisteId
  const user = await (prisma as any).user?.findUnique({
    where: { id: session.userId },
    select: { cavisteId: true },
  });
  if (!user?.cavisteId) {
    return NextResponse.json({ error: "Aucun caviste associé" }, { status: 403 });
  }

  // Vérifier que la réservation appartient au caviste de l'utilisateur
  const existing = await prisma.reservation.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "Réservation introuvable" }, { status: 404 });
  }
  if (existing.cavisteId !== user.cavisteId) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const updated = await prisma.reservation.update({
    where: { id: params.id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json({ ok: true, reservation: updated });
}
