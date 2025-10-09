import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

async function main() {
  const url = process.env.DATABASE_URL || '';
  const masked = url.replace(/:(.+?)@/, ':****@');
  console.log('DATABASE_URL =', masked);

  const prisma = new PrismaClient();
  try {
    const [{ ok }] = await prisma.$queryRaw<{ ok: number }[]>`SELECT 1 as ok`;
    console.log('Basic query OK =', ok);

    const [{ version }] = await prisma.$queryRaw<{ version: string }[]>`SELECT version()`;
    console.log('Postgres version =', version);

    try {
      const [{ txt }] = await prisma.$queryRaw<{ txt: string }[]>`SELECT unaccent('éàîôù') as txt`;
      console.log('unaccent available =', txt);
    } catch (e: any) {
      console.warn('unaccent not available yet (this is fine before enabling):', e?.message || e);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error('DB ping failed:', e);
  process.exit(1);
});
