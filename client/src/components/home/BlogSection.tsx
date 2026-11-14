import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import Parser from 'rss-parser';

// Define type for RSS feed items
interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet?: string;
  creator?: string;
  categories?: string[];
  isoDate?: string;
}

const RSS_FEED_URL = 'https://www.simplifyingthemarket.com/en/feed/';

const BlogSection = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRssFeed = async () => {
      try {
        setLoading(true);
        // Use the server as a proxy to avoid CORS issues
        const response = await fetch(`/api/rss-feed?url=${encodeURIComponent(RSS_FEED_URL)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch RSS feed');
        }
        
        const data = await response.json();
        setFeedItems(data.items);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching RSS feed:', err);
        setError('Unable to load blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchRssFeed();
  }, []);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Extract a clean excerpt from the content
  const getExcerpt = (content: string, maxLength = 150) => {
    // Remove HTML tags
    const strippedContent = content.replace(/<[^>]*>?/gm, '');
    // Get a short excerpt
    return strippedContent.length > maxLength 
      ? strippedContent.substring(0, maxLength) + '...' 
      : strippedContent;
  };

  // Extract the first image from the content if available
  const getImageFromContent = (content: string) => {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : 'https://static01.nyt.com/images/2020/03/08/realestate/08veges1/08veges1-superJumbo.jpg';
  };

  return (
    <div className="space-y-8">
      {loading ? (
        <div className="py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-neutral-600">Loading blog posts...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {feedItems.slice(0, 2).map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                <img 
                  src={getImageFromContent(item.content)}
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <div className="text-sm text-neutral-500 mb-2">
                    {item.categories && item.categories.length > 0 ? item.categories[0] : 'Real Estate'} • {formatDate(item.pubDate)}
                  </div>
                  <CardTitle className="font-display text-xl text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 mb-4">
                    {getExcerpt(item.content)}
                  </p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary-dark font-secondary inline-flex items-center">
                    Read More <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feedItems.slice(2, 5).map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="text-sm text-neutral-500 mb-1">
                    {item.categories && item.categories.length > 0 ? item.categories[0] : 'Real Estate'} • {formatDate(item.pubDate)}
                  </div>
                  <CardTitle className="font-display text-lg text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600 text-sm mb-2">
                    {getExcerpt(item.content, 100)}
                  </p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary-dark font-secondary text-sm inline-flex items-center">
                    Read More <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="https://www.simplifyingthemarket.com/en/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary rounded transition-standard inline-block"
            >
              View All Blog Posts <i className="fas fa-external-link-alt ml-2"></i>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogSection;