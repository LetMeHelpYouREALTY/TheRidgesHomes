import Hero from '@/components/home/Hero';
import PropertySearch from '@/components/home/PropertySearch';
import AboutSection from '@/components/home/AboutSection';
import CommunitySection from '@/components/home/CommunitySection';
import ValuationSection from '@/components/home/ValuationSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PropertyListingsSection from '@/components/home/PropertyListingsSection';
import ContactSection from '@/components/home/ContactSection';
import { useEffect } from 'react';

const Home = () => {
  // Set page title and meta description
  useEffect(() => {
    document.title = "The Ridges Summerlin Homes | Luxury Real Estate | Dr. Jan Duffy";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Explore luxury homes in The Ridges Summerlin with Dr. Jan Duffy, your expert real estate agent specializing in Las Vegas luxury properties.");
    }
  }, []);

  return (
    <>
      <Hero />
      <PropertySearch />
      <AboutSection />
      <CommunitySection />
      <ValuationSection />
      <TestimonialsSection />
      <PropertyListingsSection />
      <ContactSection />
    </>
  );
};

export default Home;
