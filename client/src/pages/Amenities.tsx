import { useEffect } from "react";
import { Link } from "wouter";
import AmenityMap from "@/components/amenities/AmenityMap";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE_INFO } from "@/lib/constants";
import { AMENITIES_FAQ, COMMUNITY_MAP_CONFIG } from "@/lib/community-map";
import {
  buildAmenitiesPageSchemas,
  injectJsonLdScripts,
  setAmenitiesPageMeta,
} from "@/lib/amenities-schema";

const Amenities = () => {
  useEffect(() => {
    setAmenitiesPageMeta();
    const schemas = buildAmenitiesPageSchemas();
    const cleanup = injectJsonLdScripts(schemas);
    return cleanup;
  }, []);

  return (
    <>
      <section className="relative h-[45vh] min-h-[320px] bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555529771-7888783a18d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80')",
          }}
        />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="container mx-auto h-full px-4 md:px-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight max-w-3xl">
            Nearby Amenities in{" "}
            <span className="text-secondary">{COMMUNITY_MAP_CONFIG.fullName}</span>
            , Las Vegas
          </h1>
          <p className="mt-4 text-lg text-neutral-200 max-w-2xl">
            A hyperlocal guide to golf, dining, parks, healthcare, and everyday
            essentials around guard-gated Summerlin living.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-neutral-50">
        <div className="container mx-auto max-w-5xl">
          <AmenityMap showStaticList={false} defaultCategory="golf" />
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-4xl prose prose-neutral">
          <h2 className="text-3xl font-display font-bold text-primary mb-8">
            Living Locally in The Ridges
          </h2>

          <h3 className="text-2xl font-display font-semibold text-primary mt-10">
            Dining &amp; Cafes
          </h3>
          <p className="text-neutral-700">
            Downtown Summerlin at Festival Plaza Drive anchors west-side dining
            with national and local restaurants, coffee shops, and patios. Many
            Ridges residents also use village centers along Charleston Boulevard
            and Rampart Boulevard for quick meals and takeout.
          </p>

          <h3 className="text-2xl font-display font-semibold text-primary mt-10">
            Parks &amp; Recreation
          </h3>
          <p className="text-neutral-700">
            Summerlin&apos;s trail network connects villages across the master
            plan. Red Rock Canyon National Conservation Area, at Scenic Loop
            Drive, offers hiking and scenic drives minutes west of The Ridges.
            Club Ridges provides private pools, tennis, and fitness for
            residents.
          </p>

          <h3 className="text-2xl font-display font-semibold text-primary mt-10">
            Golf
          </h3>
          <p className="text-neutral-700">
            Bear&apos;s Best Las Vegas is the signature course within The
            Ridges, designed by Jack Nicklaus with replica holes from his
            portfolio. Additional public and private courses are available
            throughout Summerlin and the west valley.
          </p>

          <h3 className="text-2xl font-display font-semibold text-primary mt-10">
            Healthcare
          </h3>
          <p className="text-neutral-700">
            Summerlin Hospital Medical Center on North Town Center Drive is a
            major full-service hospital serving the west valley. Urgent care,
            specialists, and pharmacies are clustered in Summerlin commercial
            corridors for routine care.
          </p>

          <h3 className="text-2xl font-display font-semibold text-primary mt-10">
            Shopping &amp; Grocery
          </h3>
          <p className="text-neutral-700">
            Downtown Summerlin combines retail, services, and entertainment.
            Grocery runs often include Whole Foods Market at Downtown Summerlin
            (Town Center Drive), Smith&apos;s on West Charleston Boulevard, and
            additional options in surrounding Summerlin villages.
          </p>

          <h3 className="text-2xl font-display font-semibold text-primary mt-10">
            Schools
          </h3>
          <p className="text-neutral-700">
            The Ridges is served by Clark County School District schools in the
            Summerlin area. Which CCSD schools are assigned to your address?
            Verify with the{" "}
            <a
              href="https://ccsd.net/zoning"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              CCSD Zoning Search
            </a>{" "}
            before enrolling; Palo Verde High School is one high school serving
            parts of Summerlin.
          </p>

          <h3 className="text-2xl font-display font-semibold text-primary mt-10">
            Commute &amp; Key Destinations
          </h3>
          <p className="text-neutral-700">
            Downtown Summerlin is a short drive east of The Ridges gates.
            Approximate driving distances (traffic-dependent): central Las Vegas
            Strip about 20 miles; Harry Reid International Airport about
            20–25 miles; Summerlin Hospital Medical Center roughly 5–8 miles.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-neutral-100" aria-labelledby="amenities-faq-heading">
        <div className="container mx-auto max-w-3xl">
          <h2
            id="amenities-faq-heading"
            className="text-3xl font-display font-bold text-primary mb-8 text-center"
          >
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm px-6">
            {AMENITIES_FAQ.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-display text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-700">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-primary text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Your Local Expert for The Ridges
          </h2>
          <p className="text-neutral-200 mb-6">
            Dr. Jan Duffy, REALTOR® with Berkshire Hathaway HomeServices Nevada
            Properties, helps buyers and sellers navigate The Ridges Summerlin
            with on-the-ground knowledge of neighborhoods, amenities, and
            market conditions.
          </p>
          <p className="text-neutral-300 mb-8">
            {SITE_INFO.address.street}, {SITE_INFO.address.city},{" "}
            {SITE_INFO.address.state} {SITE_INFO.address.zip}
            <br />
            <a
              href={`tel:${SITE_INFO.phone.replace(/[^\d+]/g, "")}`}
              className="hover:text-secondary transition-standard"
            >
              {SITE_INFO.phone}
            </a>
            {" · "}
            <a
              href={`mailto:${SITE_INFO.email}`}
              className="hover:text-secondary transition-standard"
            >
              {SITE_INFO.email}
            </a>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3 bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium rounded transition-standard"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/listings"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/40 text-white font-secondary font-medium rounded transition-standard"
            >
              View Ridges Listings
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Amenities;
