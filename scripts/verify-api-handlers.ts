/**
 * Smoke-test Vercel API handlers without calling Follow Up Boss.
 * Run: npx tsx scripts/verify-api-handlers.ts
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

type Handler = (req: VercelRequest, res: VercelResponse) => void | Promise<void>;

function createMockRes(): VercelResponse & {
  statusCode: number;
  body: unknown;
} {
  const state = { statusCode: 200, body: undefined as unknown };
  const res = {
    statusCode: state.statusCode,
    body: state.body,
    setHeader: () => res,
    status(code: number) {
      state.statusCode = code;
      return res;
    },
    json(payload: unknown) {
      state.body = payload;
      return res;
    },
    end: () => res,
  } as VercelResponse & { statusCode: number; body: unknown };
  Object.defineProperty(res, 'statusCode', {
    get: () => state.statusCode,
  });
  Object.defineProperty(res, 'body', {
    get: () => state.body,
  });
  return res;
}

async function runHandler(
  name: string,
  handler: Handler,
  req: Partial<VercelRequest>,
): Promise<void> {
  const res = createMockRes();
  await handler(req as VercelRequest, res);
  const ok = res.statusCode >= 200 && res.statusCode < 300;
  console.log(
    `${ok ? 'OK' : 'FAIL'} ${name} -> ${res.statusCode}`,
    JSON.stringify(res.body)?.slice(0, 120),
  );
  if (!ok) {
    throw new Error(`${name} returned ${res.statusCode}`);
  }
}

async function main() {
  delete process.env.FOLLOW_UP_BOSS_API_KEY;

  const testimonials = await import('../api/testimonials.ts');
  await runHandler('GET /api/testimonials', testimonials.default, { method: 'GET' });

  const properties = await import('../api/properties.ts');
  await runHandler('GET /api/properties', properties.default, {
    method: 'GET',
    query: {},
  });
  await runHandler('GET /api/properties?id=1', properties.default, {
    method: 'GET',
    query: { id: '1' },
  });

  const contact = await import('../api/contact.ts');
  await runHandler('POST /api/contact', contact.default, {
    method: 'POST',
    body: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '7025550100',
      interest: 'Buying',
      message: 'Hello',
      consent: true,
    },
  });

  const valuation = await import('../api/valuation.ts');
  await runHandler('POST /api/valuation', valuation.default, {
    method: 'POST',
    body: {
      firstName: 'Val',
      lastName: 'Uation',
      email: 'val@example.com',
      phone: '7025550101',
      address: '1 Main St',
      city: 'Las Vegas',
      state: 'NV',
      zipCode: '89135',
      timeframe: '3 months',
    },
  });

  console.log('All API handler smoke tests passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
