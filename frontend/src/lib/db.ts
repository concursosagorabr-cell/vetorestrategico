import { neon } from '@neondatabase/serverless';

const databaseUrl =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_ti5dLhXaP8DH@ep-bold-dew-acvbr7w3.sa-east-1.aws.neon.tech/neondb?sslmode=require';

export const sql = neon(databaseUrl);
