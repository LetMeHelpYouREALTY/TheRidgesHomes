import type { VercelRequest, VercelResponse } from '@vercel/node';
import testimonials from '../data/testimonials.json' with { type: 'json' };

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  return res.status(200).json({ success: true, testimonials });
}
