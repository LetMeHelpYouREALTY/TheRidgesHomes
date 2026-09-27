export const FUB_SITE_SOURCE = 'theridgessummerlinhomes.com';

const FOLLOW_UP_BOSS_EVENTS_URL = 'https://api.followupboss.com/v1/events';

export type FubInquiryType =
  | 'General Inquiry'
  | 'Seller Inquiry'
  | 'Property Inquiry'
  | 'Registration';

export type FubEventPerson = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  formName: string;
};

export type FubEventPayload = {
  type: FubInquiryType;
  message: string;
  description: string;
  sourceUrl?: string;
  person: FubEventPerson;
};

export function isFollowUpBossConfigured(): boolean {
  return Boolean(process.env.FOLLOW_UP_BOSS_API_KEY?.trim());
}

function getAuthorizationHeader(): string {
  const apiKey = process.env.FOLLOW_UP_BOSS_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('FOLLOW_UP_BOSS_API_KEY is not configured');
  }
  return `Basic ${Buffer.from(`${apiKey}:`, 'utf8').toString('base64')}`;
}

export async function postFollowUpBossEvent(payload: FubEventPayload): Promise<void> {
  const { person, type, message, description, sourceUrl } = payload;

  const body = {
    source: FUB_SITE_SOURCE,
    system: FUB_SITE_SOURCE,
    type,
    message,
    description,
    sourceUrl,
    person: {
      firstName: person.firstName,
      lastName: person.lastName,
      emails: person.email ? [{ value: person.email }] : [],
      phones: person.phone ? [{ value: person.phone }] : [],
      tags: [FUB_SITE_SOURCE, person.formName],
    },
  };

  const response = await fetch(FOLLOW_UP_BOSS_EVENTS_URL, {
    method: 'POST',
    headers: {
      Authorization: getAuthorizationHeader(),
      'Content-Type': 'application/json',
      'X-System': FUB_SITE_SOURCE,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Follow Up Boss API responded with status ${response.status}`);
  }
}

export function isHoneypotTripped(body: Record<string, unknown> | undefined): boolean {
  if (!body || typeof body !== 'object') {
    return false;
  }
  const company = typeof body.company === 'string' ? body.company.trim() : '';
  const website = typeof body.website === 'string' ? body.website.trim() : '';
  return company.length > 0 || website.length > 0;
}
