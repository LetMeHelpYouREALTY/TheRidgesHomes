/**
 * Unit test FUB /v1/events payload with mocked fetch (no live CRM calls).
 * Run: npx tsx scripts/followUpBoss-mock.test.ts
 */

import assert from 'node:assert/strict';

const originalFetch = globalThis.fetch;

async function run() {
  process.env.FOLLOW_UP_BOSS_API_KEY = 'test-key-not-real';

  let capturedUrl = '';
  let capturedInit: RequestInit | undefined;

  globalThis.fetch = async (input, init) => {
    capturedUrl = String(input);
    capturedInit = init;
    return new Response(null, { status: 201 });
  };

  const { postFollowUpBossEvent, FUB_SITE_SOURCE } = await import('../api/_lib/followUpBoss.ts');

  await postFollowUpBossEvent({
    type: 'General Inquiry',
    message: 'Hello',
    description: 'Contact Form — theridgessummerlinhomes.com',
    sourceUrl: 'https://theridgessummerlinhomes.com/#contact',
    person: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      phone: '7025550100',
      formName: 'Contact Form',
    },
  });

  assert.equal(capturedUrl, 'https://api.followupboss.com/v1/events');
  assert.ok(capturedInit?.headers);
  const headers = capturedInit.headers as Record<string, string>;
  assert.equal(headers['X-System'], FUB_SITE_SOURCE);
  assert.ok(headers.Authorization?.startsWith('Basic '));

  const body = JSON.parse(String(capturedInit.body));
  assert.equal(body.source, FUB_SITE_SOURCE);
  assert.equal(body.system, FUB_SITE_SOURCE);
  assert.equal(body.type, 'General Inquiry');
  assert.equal(body.person.tags[0], FUB_SITE_SOURCE);
  assert.equal(body.person.tags[1], 'Contact Form');

  console.log('followUpBoss mock test passed.');
}

run()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    globalThis.fetch = originalFetch;
    delete process.env.FOLLOW_UP_BOSS_API_KEY;
  });
