import { Link } from 'wouter';
import { NAV_LINKS, SITE_INFO } from '@/lib/constants';
import TrademarkDisclaimer from './TrademarkDisclaimer';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-display font-bold mb-6">The Ridges Summerlin</h3>
            <p className="text-neutral-300 mb-6">
              Luxury homes and premium real estate in Las Vegas' most prestigious community. Experience the pinnacle of desert living.
            </p>
            <div className="flex space-x-4">
              {Object.entries(SITE_INFO.social).map(([platform, url]) => (
                <a 
                  key={platform} 
                  href={url} 
                  className="text-white hover:text-secondary transition-standard"
                  aria-label={`Visit our ${platform} page`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${platform}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    className="text-neutral-300 hover:text-secondary transition-standard"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/resources#buyer" className="text-neutral-300 hover:text-secondary transition-standard">
                  Buyer's Guide
                </Link>
              </li>
              <li>
                <Link href="/resources#seller" className="text-neutral-300 hover:text-secondary transition-standard">
                  Seller's Guide
                </Link>
              </li>
              <li>
                <Link href="/resources#mortgage" className="text-neutral-300 hover:text-secondary transition-standard">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/resources#market" className="text-neutral-300 hover:text-secondary transition-standard">
                  Market Reports
                </Link>
              </li>
              <li>
                <Link href="/resources#relocation" className="text-neutral-300 hover:text-secondary transition-standard">
                  Relocation Information
                </Link>
              </li>
              <li>
                <Link href="/resources#blog" className="text-neutral-300 hover:text-secondary transition-standard">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="text-neutral-300 hover:text-secondary transition-standard">
                  Nearby Amenities
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1.5 mr-3 text-secondary"></i>
                <span className="text-neutral-300">
                  {SITE_INFO.address.street}<br />
                  {SITE_INFO.address.city}, {SITE_INFO.address.state} {SITE_INFO.address.zip}
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-secondary"></i>
                <a 
                  href={`tel:${SITE_INFO.phone.replace(/[^\d+]/g, '')}`} 
                  className="text-neutral-300 hover:text-white"
                >
                  {SITE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-secondary"></i>
                <a 
                  href={`mailto:${SITE_INFO.email}`} 
                  className="text-neutral-300 hover:text-white"
                >
                  {SITE_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-neutral-700 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Dr. Jan Duffy | The Ridges Summerlin Homes. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-neutral-400">
            <Link href="/privacy" className="hover:text-neutral-300 transition-standard">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-standard">Terms of Service</Link>
            <Link href="/disclosure" className="hover:text-neutral-300 transition-standard">Professional Disclosure</Link>
            <Link href="/sitemap" className="hover:text-neutral-300 transition-standard">Sitemap</Link>
          </div>
        </div>
        
        <TrademarkDisclaimer />
      </div>
    </footer>
  );
};

export default Footer;
