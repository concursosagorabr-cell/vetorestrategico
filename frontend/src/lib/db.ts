import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL || '';

if (!databaseUrl && process.env.NODE_ENV === 'production') {
  console.warn('Aviso: DATABASE_URL não configurada nas variáveis de ambiente.');
}

export const sql = neon(databaseUrl);

