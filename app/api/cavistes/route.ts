import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cavistes = await prisma.caviste.findMany({
      include: {
        stocks: {
          include: {
            vin: true,
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
