import { Link } from 'wouter';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-neutral-100 p-8 rounded-lg">
              <ul className="space-y-4 text-neutral-700">
                <li><strong className="text-primary">Licensed since 2008</strong> · Nevada license S.0197614.LLC</li>
                <li><strong className="text-primary">Berkshire Hathaway HomeServices</strong> · Nevada Properties</li>
                <li><strong className="text-primary">$127M+ in career sales</strong> · 500+ clients served</li>
                <li><strong className="text-primary">35 years</strong> in Las Vegas</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">Dr. Jan Duffy</h2>
            <p className="text-lg text-neutral-600 mb-6 font-secondary italic">
              Luxury Real Estate Specialist in The Ridges Summerlin
            </p>
            
            <div className="space-y-4 text-neutral-700 mb-8">
              <p>
                Dr. Jan Duffy has helped buyers and sellers across the Las Vegas Valley since 2008, with more than $127 million in career sales. She brings 35 years of Las Vegas knowledge to every move in The Ridges and the rest of Summerlin.
              </p>
              <p>
                Her approach is simple: real numbers, clear advice and steady guidance from first call to closing.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
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
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/contact"
                className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium rounded transition-standard text-center"
              >
                Contact Dr. Duffy
              </Link>
              <Link 
                href="/#testimonials"
                className="px-6 py-3 bg-white border border-neutral-300 hover:border-secondary text-neutral-800 hover:text-secondary font-secondary font-medium rounded transition-standard text-center"
              >
                Read Testimonials
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
