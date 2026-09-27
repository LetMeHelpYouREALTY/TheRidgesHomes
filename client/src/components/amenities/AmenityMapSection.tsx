import { Link } from "wouter";
import AmenityMap from "./AmenityMap";
import { COMMUNITY_MAP_CONFIG } from "@/lib/community-map";

type AmenityMapSectionProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  showViewAllLink?: boolean;
  compact?: boolean;
};

export default function AmenityMapSection({
  id = "nearby-amenities",
  title = `Life Near ${COMMUNITY_MAP_CONFIG.fullName}`,
  subtitle = `Explore dining, golf, parks, healthcare, and shopping within minutes of ${COMMUNITY_MAP_CONFIG.name} in ${COMMUNITY_MAP_CONFIG.city}.`,
  showViewAllLink = true,
  compact = false,
}: AmenityMapSectionProps) {
  return (
    <section
      id={id}
      className="py-20 px-4 md:px-8 bg-white"
      aria-labelledby={`${id}-heading`}
    >
      <div className="container mx-auto">
        <div className="mb-10 max-w-3xl">
          <h2
            id={`${id}-heading`}
            className="text-3xl md:text-4xl font-display font-bold text-primary mb-4"
          >
            {title}
          </h2>
          <p className="text-lg text-neutral-600">{subtitle}</p>
        </div>

        <AmenityMap
          heightClassName={compact ? "h-[360px] md:h-[400px]" : "h-[420px] md:h-[480px]"}
          showStaticList={!compact}
          defaultCategory="golf"
        />

        {showViewAllLink && (
          <div className="mt-10 text-center">
            <Link
              href="/amenities"
              className="inline-block bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium py-3 px-8 rounded transition-standard"
            >
              View All Nearby Amenities
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
