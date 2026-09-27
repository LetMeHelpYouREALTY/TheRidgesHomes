import { useEffect, useState } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { REALSCOUT_AGENT_ID } from '@/lib/constants';
import AmenityMapSection from '@/components/amenities/AmenityMapSection';

const Listings = () => {
  const [location] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  
  // Parse query parameters
  const priceRange = searchParams.get('price') || '';
  const beds = searchParams.get('beds') || '';
  const baths = searchParams.get('baths') || '';
  const propertyType = searchParams.get('type') || '';
  const neighborhood = searchParams.get('neighborhood') || '';
  
  // Set page title and meta description
  useEffect(() => {
    let title = "Luxury Homes For Sale | The Ridges Summerlin";
    let description = "Browse luxury homes for sale in The Ridges Summerlin. Find your dream property with Dr. Jan Duffy, Las Vegas' premier luxury real estate specialist.";
    
    // Customize title and description based on search parameters
    if (neighborhood) {
      const formattedNeighborhood = neighborhood
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      title = `${formattedNeighborhood} Homes For Sale | The Ridges Summerlin`;
      description = `Explore luxury homes for sale in the ${formattedNeighborhood} neighborhood of The Ridges Summerlin with Dr. Jan Duffy.`;
    } else if (priceRange || beds || baths || propertyType) {
      title = "Custom Property Search | The Ridges Summerlin";
      description = "View your customized selection of luxury properties in The Ridges Summerlin matching your specific criteria.";
    }
    
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [priceRange, beds, baths, propertyType, neighborhood]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] bg-primary overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')" }}
        >
        </div>
        <div className="absolute inset-0 gradient-overlay"></div>
        
        <div className="container mx-auto h-full px-4 md:px-8 relative z-10 flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Luxury Homes For Sale in <span className="text-secondary">The Ridges Summerlin</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Search Filters */}
      <section className="py-10 px-4 md:px-8 bg-white border-b border-neutral-200">
        <div className="container mx-auto">
          <form className="flex flex-wrap gap-4 items-end">
            <div className="w-full md:w-auto flex-1 min-w-[200px]">
              <label className="block text-neutral-700 font-secondary text-sm mb-2">Price Range</label>
              <select 
                value={priceRange}
                onChange={(e) => {
                  const params = new URLSearchParams(search);
                  if (e.target.value) {
                    params.set('price', e.target.value);
                  } else {
                    params.delete('price');
                  }
                  window.location.href = `${location}?${params.toString()}`;
                }}
                className="w-full px-4 py-2 rounded border border-neutral-300 focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-20 outline-none transition-standard"
              >
                <option value="">Any Price</option>
                <option value="1000000-2000000">$1M - $2M</option>
                <option value="2000000-3000000">$2M - $3M</option>
                <option value="3000000-5000000">$3M - $5M</option>
                <option value="5000000-10000000">$5M - $10M</option>
                <option value="10000000+">$10M+</option>
              </select>
            </div>
            
            <div className="w-full md:w-auto flex-1 min-w-[150px]">
              <label className="block text-neutral-700 font-secondary text-sm mb-2">Bedrooms</label>
              <select 
                value={beds}
                onChange={(e) => {
                  const params = new URLSearchParams(search);
                  if (e.target.value) {
                    params.set('beds', e.target.value);
                  } else {
                    params.delete('beds');
                  }
                  window.location.href = `${location}?${params.toString()}`;
                }}
                className="w-full px-4 py-2 rounded border border-neutral-300 focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-20 outline-none transition-standard"
              >
                <option value="">Any</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
                <option value="6">6+ Bedrooms</option>
              </select>
            </div>
            
            <div className="w-full md:w-auto flex-1 min-w-[150px]">
              <label className="block text-neutral-700 font-secondary text-sm mb-2">Bathrooms</label>
              <select 
                value={baths}
                onChange={(e) => {
                  const params = new URLSearchParams(search);
                  if (e.target.value) {
                    params.set('baths', e.target.value);
                  } else {
                    params.delete('baths');
                  }
                  window.location.href = `${location}?${params.toString()}`;
                }}
                className="w-full px-4 py-2 rounded border border-neutral-300 focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-20 outline-none transition-standard"
              >
                <option value="">Any</option>
                <option value="2">2+ Bathrooms</option>
                <option value="3">3+ Bathrooms</option>
                <option value="4">4+ Bathrooms</option>
                <option value="5">5+ Bathrooms</option>
              </select>
            </div>
            
            <div className="w-full md:w-auto flex-1 min-w-[180px]">
              <label className="block text-neutral-700 font-secondary text-sm mb-2">Property Type</label>
              <select 
                value={propertyType}
                onChange={(e) => {
                  const params = new URLSearchParams(search);
                  if (e.target.value) {
                    params.set('type', e.target.value);
                  } else {
                    params.delete('type');
                  }
                  window.location.href = `${location}?${params.toString()}`;
                }}
                className="w-full px-4 py-2 rounded border border-neutral-300 focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-20 outline-none transition-standard"
              >
                <option value="">All Types</option>
                <option value="single-family">Single Family</option>
                <option value="custom">Custom Home</option>
                <option value="estate">Estate</option>
                <option value="townhome">Townhome</option>
              </select>
            </div>
            
            <div className="w-full md:w-auto flex-1 min-w-[180px]">
              <label className="block text-neutral-700 font-secondary text-sm mb-2">Neighborhood</label>
              <select 
                value={neighborhood}
                onChange={(e) => {
                  const params = new URLSearchParams(search);
                  if (e.target.value) {
                    params.set('neighborhood', e.target.value);
                  } else {
                    params.delete('neighborhood');
                  }
                  window.location.href = `${location}?${params.toString()}`;
                }}
                className="w-full px-4 py-2 rounded border border-neutral-300 focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-20 outline-none transition-standard"
              >
                <option value="">All Neighborhoods</option>
                <option value="falcon-ridge">Falcon Ridge</option>
                <option value="azure">Azure</option>
                <option value="silver-ridge">Silver Ridge</option>
                <option value="cloud-chaser">Cloud Chaser</option>
                <option value="promontory">Promontory</option>
                <option value="arrowhead">Arrowhead</option>
              </select>
            </div>
            
            <div className="w-full md:w-auto">
              <button 
                type="reset"
                onClick={() => {
                  window.location.href = location;
                }}
                className="px-6 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-secondary font-medium rounded transition-standard"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Listings */}
      <section className="py-12 px-4 md:px-8 bg-neutral-50">
        <div className="container mx-auto">
          <realscout-office-listings 
            agent-encoded-id={REALSCOUT_AGENT_ID} 
            sort-order="STATUS_AND_SIGNIFICANT_CHANGE" 
            listing-status="For Sale" 
            property-types="SFR,MF,TC,LAL,MOBILE" 
            price-min="500000">
          </realscout-office-listings>
        </div>
      </section>

      <AmenityMapSection
        compact
        id="listings-nearby"
        title="Explore the Neighborhood"
        subtitle="See restaurants, golf, parks, and services near listings in The Ridges Summerlin."
      />

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">Can't find what you're looking for?</h2>
          <p className="text-lg text-neutral-600 mb-8">
            I have access to upcoming and off-market luxury properties that may not be publicly listed. Contact me for a personalized property search.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/contact"
              className="px-8 py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium rounded transition-standard text-center"
            >
              Request Personalized Search
            </Link>
            <Link 
              href="/#valuation"
              className="px-8 py-3 bg-primary hover:bg-primary-light text-white font-secondary font-medium rounded transition-standard text-center"
            >
              Get Your Home Valuation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Listings;
