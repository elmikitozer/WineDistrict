import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const email = process.env.TEST_USER_EMAIL || 'test@winedistrict.fr';
  const password = process.env.TEST_USER_PASSWORD || 'wd-test-1234';
  const cavisteId = process.env.TEST_USER_CAVISTE_ID
    ? Number(process.env.TEST_USER_CAVISTE_ID)
    : undefined;

  const passwordHash = await bcrypt.hash(password, 10);
  let cid = cavisteId;
  if (!cid) {
    const c = await prisma.caviste.findFirst({ select: { id: true } });
    cid = c?.id;
  }
  const id = `usr_${Math.random().toString(36).slice(2, 10)}`;
  // @ts-ignore - User model may not have types if not generated yet
  const user = await (prisma as any).user?.upsert({
    where: { email },
    create: { id, email, passwordHash, role: 'CAVISTE', cavisteId: cid },
    update: {},
    include: { caviste: true },
  });

  if (!user) {
    console.error(
      'User model not found. Ensure Prisma schema includes User and regenerate client.'
    );
    process.exit(1);
  }

  console.log('Test user ready:\n', {
    email,
    password,
    cavisteId: user.cavisteId,
    caviste: user.caviste?.nom,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
