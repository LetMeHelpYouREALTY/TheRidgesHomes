import type { VercelRequest, VercelResponse } from '@vercel/node';
import { valuationRequestSchema } from './_lib/schema.js';
import { FUB_SITE_SOURCE } from './_lib/followUpBoss.js';
import type { FubEventPayload } from './_lib/followUpBoss.js';
import { handleLeadSubmission, methodNotAllowed } from './_lib/handlerUtils.js';

const FORM_NAME = 'Home Valuation Form';

function buildValuationEvent(req: VercelRequest, body: unknown): FubEventPayload {
  const validated = valuationRequestSchema.parse(body);

  const propertyLine = `Property: ${validated.address}, ${validated.city}, ${validated.state} ${validated.zipCode}`;
  const extra = [
    validated.propertyType ? `Property type: ${validated.propertyType}` : null,
    validated.estimatedValue != null ? `Estimated value: ${validated.estimatedValue}` : null,
    validated.timeframe ? `Timeframe: ${validated.timeframe}` : null,
  ]
    .filter(Boolean)
    .join(' | ');

  const message = extra ? `${propertyLine}\n\n${extra}` : propertyLine;

  const referer = req.headers.referer;
  const sourceUrl =
    validated.sourceUrl ??
    (typeof referer === 'string' ? referer : undefined);

  return {
    type: 'Seller Inquiry',
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

  return handleLeadSubmission(req, res, (body) => buildValuationEvent(req, body));
}
