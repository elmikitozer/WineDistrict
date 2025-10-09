import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cavistes = await prisma.caviste.findMany({
      select: {
        id: true,
        nom: true,
        adresse: true,
        stocks: {
          select: {
            id: true,
            quantite: true,
            vin: {
              select: {
                id: true,
                nom: true,
                domaine: true,
                année: true,
                prix: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(cavistes);
  } catch (error) {
    console.error("Erreur lors de la récupération des cavistes :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
