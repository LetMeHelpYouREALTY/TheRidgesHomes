import { useEffect } from 'react';
import { REALSCOUT_AGENT_ID } from '@/lib/constants';

declare global {
  interface HTMLElementTagNameMap {
    'realscout-office-listings': HTMLElement;
  }
}

const PropertyListingsSection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-neutral-100">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Current Listings</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Explore our curated selection of luxury properties currently available in Las Vegas.
          </p>
        </div>
        
        <realscout-office-listings 
          agent-encoded-id={REALSCOUT_AGENT_ID} 
          sort-order="PRICE_HIGH" 
          listing-status="For Sale" 
          property-types="SFR,MF,TC" 
          price-min="500000">
        </realscout-office-listings>
      </div>
    </section>
  );
};

export default PropertyListingsSection;
