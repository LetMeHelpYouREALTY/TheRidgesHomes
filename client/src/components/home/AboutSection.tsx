import { Link } from 'wouter';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80" 
              alt="Dr. Jan Duffy, Luxury Real Estate Specialist" 
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">Dr. Jan Duffy</h2>
            <p className="text-lg text-neutral-600 mb-6 font-secondary italic">
              Luxury Real Estate Specialist in The Ridges Summerlin
            </p>
            
            <div className="space-y-4 text-neutral-700 mb-8">
              <p>
                With over 15 years of experience in luxury real estate, Dr. Jan Duffy has established herself as the premier expert for The Ridges Summerlin. Her unique combination of market knowledge, negotiation skills, and personalized service ensures that each client receives concierge-level attention.
              </p>
              <p>
                As a resident of The Ridges herself, Dr. Duffy offers invaluable insider knowledge of the community's exclusive amenities, neighborhoods, and lifestyle opportunities. Her dedication to client satisfaction has earned her a reputation for excellence and a portfolio of high-profile clientele.
              </p>
              <p>
                Dr. Duffy holds certifications as a Luxury Home Marketing Specialist and is consistently ranked among the top 1% of real estate professionals in Las Vegas.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center bg-neutral-100 rounded-full px-4 py-2">
                <i className="fas fa-award text-secondary mr-2"></i>
                <span className="font-secondary">Luxury Specialist</span>
              </div>
              <div className="flex items-center bg-neutral-100 rounded-full px-4 py-2">
                <i className="fas fa-certificate text-secondary mr-2"></i>
                <span className="font-secondary">5.0★ on Realtor.com</span>
              </div>
              <div className="flex items-center bg-neutral-100 rounded-full px-4 py-2">
                <i className="fas fa-home text-secondary mr-2"></i>
                <span className="font-secondary">Ridges Resident</span>
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
