import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const vinId = Number(data.get("vinId"));
  const cavisteId = Number(data.get("cavisteId"));

  if (!vinId || !cavisteId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const vin = await prisma.vin.findUnique({ where: { id: vinId } });
  const caviste = await prisma.caviste.findUnique({ where: { id: cavisteId } });

  await prisma.reservation.create({
    data: { vinId, cavisteId },
  });

  const baseUrl = new URL(req.url).origin;
  const redirectUrl = new URL(`${baseUrl}/merci`);

  if (vin?.nom) redirectUrl.searchParams.set("vin", vin.nom);
  if (caviste?.nom) redirectUrl.searchParams.set("caviste", caviste.nom);

  return NextResponse.redirect(redirectUrl, 303);
}
