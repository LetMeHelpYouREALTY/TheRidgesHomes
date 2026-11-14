import { useEffect } from 'react';
import { Link } from 'wouter';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const About = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = "About Dr. Jan Duffy | The Ridges Summerlin Luxury Real Estate";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Meet Dr. Jan Duffy, Las Vegas REALTOR® licensed since 2008 with Berkshire Hathaway HomeServices Nevada Properties, serving buyers and sellers in The Ridges Summerlin.");
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-primary overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
        >
        </div>
        <div className="absolute inset-0 gradient-overlay"></div>
        
        <div className="container mx-auto h-full px-4 md:px-8 relative z-10 flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              About <span className="text-secondary">Dr. Jan Duffy</span>
            </h1>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="bg-neutral-100 p-8 rounded-lg">
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Background</h3>
                <ul className="space-y-4 text-neutral-700">
                  <li><strong className="text-primary">Licensed since 2008</strong><br /><span className="text-sm text-neutral-600">Nevada license S.0197614.LLC</span></li>
                  <li><strong className="text-primary">Berkshire Hathaway HomeServices Nevada Properties</strong><br /><span className="text-sm text-neutral-600">Since September 2008</span></li>
                  <li><strong className="text-primary">$127M+ in career sales</strong><br /><span className="text-sm text-neutral-600">500+ clients served</span></li>
                  <li><strong className="text-primary">Doctorate (PhD)</strong><br /><span className="text-sm text-neutral-600">35 years in Las Vegas</span></li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">Meet Dr. Jan Duffy</h2>
              <p className="text-lg text-neutral-600 mb-6 font-secondary italic">
                Your Dedicated Luxury Real Estate Specialist in The Ridges Summerlin
              </p>
              
              <div className="space-y-6 text-neutral-700 mb-10">
                <p>
                  Since 2008, I have helped clients buy and sell homes across the Las Vegas Valley, including the guard-gated and luxury neighborhoods of Summerlin. I bring 35 years of Las Vegas knowledge to every client.
                </p>
                <p>
                  My doctorate trained me to work from data. I pair that with hands-on market experience, so my advice rests on real numbers while respecting what a move means to you.
                </p>
                <p>
                  My approach to real estate is both strategic and personal. A home in The Ridges is a major life decision, not just a transaction. Whether you are buying or selling, I use clear pricing, strong marketing and careful negotiation to get you the best result.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center bg-neutral-100 rounded-full px-4 py-2">
                  <i className="fas fa-award text-secondary mr-2"></i>
                  <span className="font-secondary">Luxury Specialist</span>
                </div>
                <div className="flex items-center bg-neutral-100 rounded-full px-4 py-2">
                  <i className="fas fa-certificate text-secondary mr-2"></i>
                  <span className="font-secondary">Licensed since 2008</span>
                </div>
                <div className="flex items-center bg-neutral-100 rounded-full px-4 py-2">
                  <i className="fas fa-home text-secondary mr-2"></i>
                  <span className="font-secondary">$127M+ career sales</span>
                </div>
                <div className="flex items-center bg-neutral-100 rounded-full px-4 py-2">
                  <i className="fas fa-handshake text-secondary mr-2"></i>
                  <span className="font-secondary">Concierge Service</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/contact"
                  className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium rounded transition-standard text-center"
                >
                  Schedule a Consultation
                </Link>
                <Link 
                  href="/listings"
                  className="px-6 py-3 bg-white border border-primary text-primary hover:bg-primary hover:text-white font-secondary font-medium rounded transition-standard text-center"
                >
                  View My Listings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </>
  );
};

export default About;
