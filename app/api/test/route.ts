import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    const cavistes = await prisma.caviste.findMany();
    return NextResponse.json(cavistes);
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
