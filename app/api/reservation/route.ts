// app/api/reservation/route.ts
import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const ReservationSchema = z.object({
  vinId: z.coerce.number().int().positive(),
  cavisteId: z.coerce.number().int().positive(),
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
  });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const { vinId, cavisteId } = parsed.data;

  // 4) TODO: transaction stock → reservation (quand prêt)
  const reservation = await prisma.reservation.create({
    data: { vinId, cavisteId, status: 'en_attente' },
    select: { id: true },
  });

  // 5) UX : si form => redirect 303 vers la page précédente (avec un flag)
  if (isForm) {
    const ref = h.get('referer') || '/';
    const url = new URL(ref);
    url.searchParams.set('reserved', '1');
    url.searchParams.set('rid', String(reservation.id));
    return NextResponse.redirect(url, 303);
  }

  // JSON (fetch) fallback
  return NextResponse.json({ ok: true, reservationId: reservation.id });
}
