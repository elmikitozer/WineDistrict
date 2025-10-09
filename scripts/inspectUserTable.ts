import { prisma } from "@/lib/prisma";

async function main() {
  const rows = await prisma.$queryRawUnsafe<any[]>(
    `SELECT column_name, data_type, column_default, is_nullable
     FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = 'User'
     ORDER BY ordinal_position`
  );
  console.table(rows);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
