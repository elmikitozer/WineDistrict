
import fs from 'node:fs';
import dotenv from 'dotenv';
import path from 'node:path';
import { defineConfig } from 'prisma/config';

// Load .env.local first if present (dev), else fallback to .env
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local', override: true });
} else {
  dotenv.config({ override: true });
}

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    // keep default path (next to schema) — can be omitted
    path: path.join('prisma', 'migrations'),
    // make `prisma db seed` work consistently
    seed: 'tsx prisma/seed.ts',
  },
});
