import type { VercelRequest, VercelResponse } from '@vercel/node';
import properties from '../data/properties.json';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const featuredOnly = req.query.featured === 'true';
  const idParam = req.query.id;

  if (idParam !== undefined) {
    const id = Number(idParam);
    const property = properties.find((p) => p.id === id);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    return res.status(200).json({ success: true, property });
  }

  const list = featuredOnly ? properties.filter((p) => p.isFeatured) : properties;
  return res.status(200).json({ success: true, properties: list });
}
