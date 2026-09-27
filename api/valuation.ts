import type { VercelRequest, VercelResponse } from '@vercel/node';
import { valuationRequestSchema } from '../shared/schema';
import { checkExistingContact, createContact } from '../lib/followUpBoss';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const validatedData = valuationRequestSchema.parse(req.body);

    let followUpBossError: string | null = null;

    try {
      const existingContact = await checkExistingContact(validatedData.email);

      if (!existingContact || existingContact.people.length === 0) {
        const contactData = {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          phone: validatedData.phone,
          interest: 'Home Valuation',
          message: `Property Address: ${validatedData.address}, ${validatedData.city}, ${validatedData.state} ${validatedData.zipCode}${validatedData.timeframe ? ` | Timeframe: ${validatedData.timeframe}` : ''}`,
          consentGiven: true,
        };

        await createContact(contactData);
      }
    } catch (crmError) {
      console.error('Error with Follow Up Boss CRM:', crmError);
      followUpBossError =
        crmError instanceof Error ? crmError.message : 'Unknown CRM error';
    }

    const id = Date.now();

    return res.status(200).json({
      success: true,
      message: 'Valuation request received successfully',
      id,
      crmStatus: followUpBossError ? 'error' : 'success',
      crmMessage: followUpBossError || 'Valuation request sent to CRM',
    });
  } catch (error) {
    console.error('Error processing valuation request:', error);
    return res.status(400).json({
      success: false,
      message: 'Invalid valuation form data',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
