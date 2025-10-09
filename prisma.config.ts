import 'dotenv/config';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    // keep default path (next to schema) — can be omitted
    path: path.join('prisma', 'migrations'),
    // make `prisma db seed` work consistently
    seed: 'tsx prisma/seed.ts',
  },
});
