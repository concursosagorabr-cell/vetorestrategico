import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'Vetor Estratégico API (Next.js Serverless)',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production',
  });
}
