import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ZodError } from 'zod';
import { isFollowUpBossConfigured, isHoneypotTripped, postFollowUpBossEvent } from './followUpBoss.js';
import type { FubEventPayload } from './followUpBoss.js';

export function methodNotAllowed(res: VercelResponse): VercelResponse {
  res.setHeader('Allow', 'POST');
  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export function validationError(res: VercelResponse, error: ZodError): VercelResponse {
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: error.flatten(),
  });
}

export async function handleLeadSubmission(
  req: VercelRequest,
  res: VercelResponse,
  parseBody: (body: unknown) => FubEventPayload,
): Promise<VercelResponse> {
  const rawBody = req.body as Record<string, unknown> | undefined;

  if (isHoneypotTripped(rawBody)) {
    return res.status(200).json({ success: true });
  }

  let eventPayload: FubEventPayload;
  try {
    eventPayload = parseBody(req.body);
  } catch (error) {
    if (error instanceof ZodError) {
      return validationError(res, error);
    }
    return res.status(400).json({
      success: false,
      message: 'Invalid form data',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  if (!isFollowUpBossConfigured()) {
    console.error(
      '[FUB] FOLLOW_UP_BOSS_API_KEY is not set; cannot send lead to Follow Up Boss.',
    );
    return res.status(503).json({
      success: false,
      message: 'Lead capture is temporarily unavailable. Please try again later.',
    });
  }

  try {
    await postFollowUpBossEvent(eventPayload);
    return res.status(200).json({
      success: true,
      message: 'Request received successfully',
    });
  } catch (error) {
    const status =
      error instanceof Error ? error.message.match(/status (\d+)/)?.[1] : null;
    console.error(
      '[FUB] Failed to create event in Follow Up Boss.',
      status ? `HTTP ${status}` : error,
    );
    return res.status(502).json({
      success: false,
      message: 'Failed to send lead to CRM',
    });
  }
}
