import { useEffect } from 'react';
import { Link } from 'wouter';
import { COMMUNITY_FEATURES } from '@/lib/constants';
import AmenityMapSection from '@/components/amenities/AmenityMapSection';

const Community = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = "The Ridges Summerlin Community | Luxury Las Vegas Living";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Discover The Ridges Summerlin, Las Vegas' most prestigious luxury community featuring Bear's Best Golf Course, 24/7 security, stunning views, and world-class amenities.");
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] bg-primary overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
        >
        </div>
        <div className="absolute inset-0 gradient-overlay"></div>
        
        <div className="container mx-auto h-full px-4 md:px-8 relative z-10 flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              The <span className="text-secondary">Ridges Summerlin</span> Community
            </h1>
          </div>
        </div>
      </section>

      {/* Community Overview */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">Las Vegas' Most Prestigious Community</h2>
              
              <div className="space-y-6 text-neutral-700 mb-8">
                <p>
                  Nestled against the stunning backdrop of the Spring Mountains and Red Rock Canyon, The Ridges is the crown jewel of Summerlin, offering an unparalleled luxury living experience in Las Vegas.
                </p>
                <p>
                  This exclusive guard-gated community spans approximately 793 acres and is comprised of several distinct neighborhoods, each with its own unique character but united by a commitment to architectural excellence and desert contemporary design.
                </p>
                <p>
                  What truly sets The Ridges apart is its elevated location, providing residents with breathtaking panoramic views of the Las Vegas Strip and the surrounding mountain landscape. The community's design philosophy emphasizes harmony with the natural desert environment, creating a sophisticated oasis of luxury.
                </p>
                <p>
                  Since its development began in the early 2000s, The Ridges has attracted discerning homeowners who value privacy, security, and access to world-class amenities. Home to some of the most architecturally significant properties in Las Vegas, real estate in The Ridges represents the pinnacle of desert luxury living.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/listings"
                  className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium rounded transition-standard text-center"
                >
                  View Available Properties
                </Link>
                <Link 
                  href="/contact"
                  className="px-6 py-3 bg-white border border-primary text-primary hover:bg-primary hover:text-white font-secondary font-medium rounded transition-standard text-center"
                >
                  Schedule a Tour
                </Link>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80" 
                alt="Luxury home in The Ridges Summerlin" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-20 px-4 md:px-8 bg-neutral-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Community Amenities</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              The Ridges offers residents an unparalleled collection of amenities and lifestyle opportunities designed for sophisticated desert living.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-display font-bold text-primary mb-8">Exclusive Features</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <i className="fas fa-golf-ball text-secondary text-2xl mt-1 mr-4"></i>
                  <div>
                    <h4 className="text-xl font-display font-semibold text-neutral-800 mb-2">Bear's Best Golf Course</h4>
                    <p className="text-neutral-600">
                      The centerpiece of The Ridges is the Jack Nicklaus-designed Bear's Best Golf Course, featuring 18 replica holes from Nicklaus' most famous courses around the world. This championship course offers not only exceptional playing conditions but also serves as a verdant backdrop for many homes in the community.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-dumbbell text-secondary text-2xl mt-1 mr-4"></i>
                  <div>
                    <h4 className="text-xl font-display font-semibold text-neutral-800 mb-2">Club Ridges</h4>
                    <p className="text-neutral-600">
                      Residents enjoy exclusive access to Club Ridges, a 9,000-square-foot private community center featuring a state-of-the-art fitness facility, multi-purpose rooms for community events, resort-style swimming pools, and tennis courts. The clubhouse serves as the social hub of the community.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-shield-alt text-secondary text-2xl mt-1 mr-4"></i>
                  <div>
                    <h4 className="text-xl font-display font-semibold text-neutral-800 mb-2">Gated Security</h4>
                    <p className="text-neutral-600">
                      Security and privacy are paramount at The Ridges. The community features 24/7 guarded gate entrances, regular security patrols, and state-of-the-art surveillance systems, creating a safe and private environment for residents and their families.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-hiking text-secondary text-2xl mt-1 mr-4"></i>
                  <div>
                    <h4 className="text-xl font-display font-semibold text-neutral-800 mb-2">Trails & Natural Beauty</h4>
                    <p className="text-neutral-600">
                      The community is integrated with Summerlin's extensive trail system, offering over 150 miles of interconnected paths for walking, jogging, and biking. The proximity to Red Rock Canyon National Conservation Area provides residents with easy access to outdoor recreation activities and stunning natural landscapes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <img 
                src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Bear's Best Golf Course at The Ridges" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80" 
                alt="Club Ridges private clubhouse" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMMUNITY_FEATURES.map(feature => (
              <div key={feature.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-64 object-cover"
                />
                
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-primary mb-2">{feature.title}</h3>
                  <p className="text-neutral-600 mb-4">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AmenityMapSection
        id="whats-nearby"
        title="What's Nearby The Ridges"
        subtitle="Golf, trails, Downtown Summerlin, and west-valley services within easy reach of guard-gated living."
      />

      {/* Neighborhoods */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Distinctive Neighborhoods</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              The Ridges is comprised of several unique neighborhoods, each offering its own architectural style and character.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-neutral-100 rounded-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Falcon Ridge</h3>
                <p className="text-neutral-600 mb-6">
                  Custom homesites with expansive Strip views, featuring some of the most architecturally significant residences in Las Vegas.
                </p>
                <Link 
                  href="/listings?neighborhood=falcon-ridge"
                  className="text-secondary hover:text-secondary-dark font-secondary inline-flex items-center"
                >
                  View Properties <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            <div className="bg-neutral-100 rounded-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Azure</h3>
                <p className="text-neutral-600 mb-6">
                  Contemporary single-story residences with exceptional indoor/outdoor living spaces and unobstructed mountain views.
                </p>
                <Link 
                  href="/listings?neighborhood=azure"
                  className="text-secondary hover:text-secondary-dark font-secondary inline-flex items-center"
                >
                  View Properties <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            <div className="bg-neutral-100 rounded-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Silver Ridge</h3>
                <p className="text-neutral-600 mb-6">
                  Elevated homesites offering panoramic views of the Las Vegas Valley and Bear's Best Golf Course.
                </p>
                <Link 
                  href="/listings?neighborhood=silver-ridge"
                  className="text-secondary hover:text-secondary-dark font-secondary inline-flex items-center"
                >
                  View Properties <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            <div className="bg-neutral-100 rounded-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Cloud Chaser</h3>
                <p className="text-neutral-600 mb-6">
                  Ultra-luxury custom estates with expansive floor plans and premium architectural details.
                </p>
                <Link 
                  href="/listings?neighborhood=cloud-chaser"
                  className="text-secondary hover:text-secondary-dark font-secondary inline-flex items-center"
                >
                  View Properties <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            <div className="bg-neutral-100 rounded-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Promontory</h3>
                <p className="text-neutral-600 mb-6">
                  Exclusive enclave featuring some of the most valuable properties in The Ridges with dramatic architecture.
                </p>
                <Link 
                  href="/listings?neighborhood=promontory"
                  className="text-secondary hover:text-secondary-dark font-secondary inline-flex items-center"
                >
                  View Properties <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            <div className="bg-neutral-100 rounded-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Arrowhead</h3>
                <p className="text-neutral-600 mb-6">
                  Semi-custom homes blending contemporary design with desert-inspired architecture.
                </p>
                <Link 
                  href="/listings?neighborhood=arrowhead"
                  className="text-secondary hover:text-secondary-dark font-secondary inline-flex items-center"
                >
                  View Properties <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-8 bg-primary text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Experience The Ridges Lifestyle</h2>
          <p className="text-xl text-neutral-200 mb-8">
            Let Dr. Jan Duffy help you discover the perfect property in this extraordinary community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/contact"
              className="px-8 py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium rounded transition-standard text-center"
            >
              Schedule a Private Tour
            </Link>
            <Link 
              href="/#valuation"
              className="px-8 py-3 bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white border border-white border-opacity-40 font-secondary font-medium rounded transition-standard text-center"
            >
              Get Your Home Valuation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Community;
