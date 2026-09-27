import type { VercelRequest, VercelResponse } from '@vercel/node';
import { contactSchema } from './_lib/schema.js';
import { FUB_SITE_SOURCE } from './_lib/followUpBoss.js';
import type { FubEventPayload } from './_lib/followUpBoss.js';
import { handleLeadSubmission, methodNotAllowed } from './_lib/handlerUtils.js';

const FORM_NAME = 'Contact Form';

function buildContactEvent(req: VercelRequest, body: unknown): FubEventPayload {
  const validated = contactSchema.parse(body);

  const fieldSummary = [
    validated.interest ? `Interest: ${validated.interest}` : null,
    `Consent: ${validated.consent ? 'yes' : 'no'}`,
  ]
    .filter(Boolean)
    .join(' | ');

  const visitorMessage = validated.message?.trim() ?? '';
  const message = visitorMessage
    ? `${visitorMessage}\n\n${fieldSummary}`
    : fieldSummary || 'Website contact inquiry';

  const referer = req.headers.referer;
  const sourceUrl =
    validated.sourceUrl ??
    (typeof referer === 'string' ? referer : undefined);

  return {
    type: 'General Inquiry',
    message,
    description: `${FORM_NAME} — ${FUB_SITE_SOURCE}`,
    sourceUrl,
    person: {
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email,
      phone: validated.phone,
      formName: FORM_NAME,
    },
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res);
  }

  return handleLeadSubmission(req, res, (body) => buildContactEvent(req, body));
}
