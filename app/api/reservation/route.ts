// app/api/reservation/route.ts
import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

const ReservationSchema = z.object({
  vinId: z.coerce.number().int().positive(),
  cavisteId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive().default(1),
});

function readContentType(req: Request) {
  return (req.headers.get('content-type') || '').toLowerCase();
}

async function parseBody(req: Request) {
  const ct = readContentType(req);
  if (ct.includes('application/json')) {
    const json = await req.json().catch(() => ({}));
    return { data: json as Record<string, unknown>, isForm: false };
  }
  // forms (urlencoded ou multipart)
  const form = await req.formData();
  const data: Record<string, unknown> = {};
  for (const [k, v] of form.entries()) data[k] = v;
  return { data, isForm: true };
}

async function validateCsrfToken(providedToken?: string | null) {
  const c = await cookies();
  const csrfCookie = c.get('wd_csrf')?.value;
  return !!providedToken && !!csrfCookie && providedToken === csrfCookie;
}

export async function POST(req: Request) {
  // 1) garde-fou Origin/Referer déjà en place via middleware.ts (voir étape précédente)

  // 2) récup inputs + token
  const { data, isForm } = await parseBody(req);
  const h = await headers();
  const tokenFromHeader = h.get('x-csrf-token');
  const tokenFromBody = typeof data._csrf === 'string' ? (data._csrf as string) : undefined;

  const token = tokenFromHeader || tokenFromBody;
  if (!(await validateCsrfToken(token))) {
    return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
  }

  // 3) validation métier
  const parsed = ReservationSchema.safeParse({
    vinId: data.vinId,
    cavisteId: data.cavisteId,
    quantity: data.quantity,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { vinId, cavisteId, quantity } = parsed.data;

  // Récupérer l'userId de l'utilisateur connecté (optionnel)
  const session = await getSession();
  const userId = session?.userId ? String(session.userId) : null;

  // 4) Vérifier le stock disponible
  const stock = await prisma.stock.findFirst({
    where: {
      vinId,
      cavisteId,
    },
    select: {
      quantite: true,
      vin: {
        select: {
          nom: true,
        },
      },
    },
  });

  if (!stock) {
    return NextResponse.json({ error: 'Stock introuvable' }, { status: 404 });
  }

  if (stock.quantite < quantity) {
    return NextResponse.json(
      {
        error: `Stock insuffisant. Seulement ${stock.quantite} bouteille${
          stock.quantite > 1 ? 's' : ''
        } disponible${stock.quantite > 1 ? 's' : ''} pour ${stock.vin.nom}.`,
        available: stock.quantite,
      },
      { status: 400 }
    );
  }

  // 5) Créer la réservation (TODO: créer une ligne par bouteille si besoin)
  // Pour l'instant, créons une seule réservation avec la quantité
  const reservationData: {
    vinId: number;
    cavisteId: number;
    status: string;
    userId?: string | null;
  } = {
    vinId,
    cavisteId,
    status: 'en_attente',
  };

  if (userId) {
    reservationData.userId = userId;
  }

  // Créer X réservations (une par bouteille)
  const reservations = await Promise.all(
    Array.from({ length: quantity }, () =>
      prisma.reservation.create({
        data: reservationData,
        select: { id: true },
      })
    )
  );

  const reservation = reservations[0];

  // 5) UX : si form => redirect 303 vers la page précédente (avec un flag)
  if (isForm) {
    const ref = h.get('referer') || '/';
    const url = new URL(ref);
    url.searchParams.set('reservation', 'success');
    url.searchParams.set('rid', String(reservation.id));
    return NextResponse.redirect(url, 303);
  }

  // JSON (fetch) fallback
  return NextResponse.json({ ok: true, reservationId: reservation.id });
}
