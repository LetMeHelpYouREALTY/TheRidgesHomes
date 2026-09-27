import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import Parser from 'rss-parser';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'URL parameter is required',
      });
    }

    const parser = new Parser();
    const response = await axios.get(url);
    const feed = await parser.parseString(response.data);

    return res.status(200).json({
      success: true,
      title: feed.title,
      description: feed.description,
      link: feed.link,
      items: feed.items,
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch RSS feed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
