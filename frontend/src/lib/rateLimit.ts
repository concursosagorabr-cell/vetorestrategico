import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    tokens: number;
    lastRefill: number;
  };
}

const store: RateLimitStore = {};

// Clean up stale entries every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      if (now - store[key].lastRefill > 600000) {
        delete store[key];
      }
    }
  }, 600000);
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}

/**
 * Token bucket rate limiter for API routes.
 * @param key Unique identifier (e.g. `chat:${ip}`)
 * @param limit Max tokens allowed in window
 * @param windowMs Window duration in milliseconds (default: 60s)
 * @returns { success: boolean, remaining: number, resetMs: number }
 */
export function rateLimit(key: string, limit: number = 20, windowMs: number = 60000) {
  const now = Date.now();
  const record = store[key] || { tokens: limit, lastRefill: now };

  // Refill tokens proportionally to elapsed time
  const timePassed = now - record.lastRefill;
  const refillRate = limit / windowMs;
  const tokensToAdd = timePassed * refillRate;

  record.tokens = Math.min(limit, record.tokens + tokensToAdd);
  record.lastRefill = now;

  if (record.tokens >= 1) {
    record.tokens -= 1;
    store[key] = record;
    return {
      success: true,
      remaining: Math.floor(record.tokens),
      resetMs: Math.ceil((1 - (record.tokens % 1)) / refillRate),
    };
  }

  store[key] = record;
  return {
    success: false,
    remaining: 0,
    resetMs: Math.ceil((1 - record.tokens) / refillRate),
  };
}
