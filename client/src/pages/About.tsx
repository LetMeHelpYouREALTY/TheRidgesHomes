import { useEffect } from 'react';
import { Link } from 'wouter';
import { TESTIMONIALS } from '@/lib/constants';

const About = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = "About Dr. Jan Duffy | The Ridges Summerlin Luxury Real Estate";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Meet Dr. Jan Duffy, luxury real estate specialist for The Ridges Summerlin, licensed since 2008 · 35 years in Las Vegas, with insider knowledge of Las Vegas' most prestigious community.");
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
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80" 
                alt="Dr. Jan Duffy, Luxury Real Estate Specialist" 
                className="w-full h-auto rounded-lg shadow-xl mb-8"
              />
              
              <div className="bg-neutral-100 p-8 rounded-lg">
                <h3 className="text-2xl font-display font-bold text-primary mb-4">Credentials & Certifications</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-award text-secondary mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-display font-semibold text-primary">Certified Luxury Home Marketing Specialist</h4>
                      <p className="text-neutral-600 text-sm">Institute for Luxury Home Marketing</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-certificate text-secondary mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-display font-semibold text-primary">Million Dollar Guild Member</h4>
                      <p className="text-neutral-600 text-sm">5.0★ from 50 Realtor.com reviews</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-star text-secondary mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-display font-semibold text-primary">Las Vegas Top Producer</h4>
                      <p className="text-neutral-600 text-sm">10 consecutive years</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-graduation-cap text-secondary mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-display font-semibold text-primary">Doctor of Business Administration</h4>
                      <p className="text-neutral-600 text-sm">Focus on Real Estate Economics</p>
                    </div>
                  </li>
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
                  Licensed since 2008 · 35 years in Las Vegas, I have been helping clients discover their dream homes in Las Vegas' guard-gated and luxury communities, with a specialized focus on The Ridges Summerlin. As both a real estate professional and a resident of The Ridges, I offer my clients unparalleled insights into this extraordinary community.
                </p>
                <p>
                  My journey in luxury real estate began after completing my Ph.D. in Research. This academic background, combined with my hands-on experience in the luxury market, allows me to provide data-driven advice while understanding the emotional aspects of finding the perfect home.
                </p>
                <p>
                  What sets my service apart is my commitment to personalized attention. I intentionally maintain a selective client base to ensure that each individual receives the concierge-level service they deserve. From the initial consultation to well beyond closing, I remain dedicated to exceeding expectations and creating lasting relationships.
                </p>
                <p>
                  My approach to real estate is both strategic and compassionate. I understand that a luxury home is not merely a transaction but a significant life decision. Whether you're looking to purchase your dream home or market your property to qualified buyers, I leverage my extensive network, marketing expertise, and negotiation skills to achieve optimal results.
                </p>
                <p>
                  When not assisting clients, I enjoy exploring the hiking trails around Red Rock Canyon, attending cultural events at The Smith Center, and supporting local charitable organizations focused on education and community development.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-10">
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

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 bg-neutral-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">What My Clients Say</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              I'm honored to have helped numerous clients find their dream homes and achieve their real estate goals in The Ridges Summerlin.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {TESTIMONIALS.map(testimonial => (
              <div key={testimonial.id} className="bg-white rounded-lg p-8 shadow-lg">
                <div className="text-secondary mb-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                
                <p className="text-neutral-600 italic mb-6">
                  "{testimonial.content}"
                </p>
                
                <div>
                  <h4 className="font-display font-bold text-primary">{testimonial.name}</h4>
                  <p className="text-neutral-500 text-sm">{testimonial.type}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-light text-white font-secondary font-medium py-3 px-8 rounded transition-standard"
            >
              Work With Dr. Duffy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
