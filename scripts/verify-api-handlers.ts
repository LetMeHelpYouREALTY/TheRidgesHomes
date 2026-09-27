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
  expectedStatus: number,
): Promise<void> {
  const res = createMockRes();
  await handler(req as VercelRequest, res);
  const ok = res.statusCode === expectedStatus;
  console.log(
    `${ok ? 'OK' : 'FAIL'} ${name} -> ${res.statusCode} (expected ${expectedStatus})`,
    JSON.stringify(res.body)?.slice(0, 120),
  );
  if (!ok) {
    throw new Error(`${name} returned ${res.statusCode}, expected ${expectedStatus}`);
  }
}

async function main() {
  delete process.env.FOLLOW_UP_BOSS_API_KEY;

  const testimonials = await import('../api/testimonials.ts');
  await runHandler('GET /api/testimonials', testimonials.default, { method: 'GET' }, 200);

  const properties = await import('../api/properties.ts');
  await runHandler('GET /api/properties', properties.default, {
    method: 'GET',
    query: {},
  }, 200);
  await runHandler('GET /api/properties?id=1', properties.default, {
    method: 'GET',
    query: { id: '1' },
  }, 200);

  const contact = await import('../api/contact.ts');
  await runHandler(
    'POST /api/contact {}',
    contact.default,
    { method: 'POST', body: {} },
    400,
  );

  const valuation = await import('../api/valuation.ts');
  await runHandler(
    'POST /api/valuation {}',
    valuation.default,
    { method: 'POST', body: {} },
    400,
  );

  console.log('All API handler smoke tests passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
