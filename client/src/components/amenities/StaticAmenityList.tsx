import {
  AMENITY_CATEGORIES,
  type AmenityCategoryId,
  CURATED_AMENITIES,
} from "@/lib/community-map";

type StaticAmenityListProps = {
  categoryFilter?: AmenityCategoryId;
  className?: string;
};

const categoryLabel = new Map(
  AMENITY_CATEGORIES.map((c) => [c.id, c.label]),
);

export function StaticAmenityList({
  categoryFilter,
  className = "",
}: StaticAmenityListProps) {
  const items = categoryFilter
    ? CURATED_AMENITIES.filter((a) => a.category === categoryFilter)
    : CURATED_AMENITIES;

  if (items.length === 0) {
    return (
      <p className="text-sm text-neutral-600">
        Explore the interactive map above for nearby places in this category.
      </p>
    );
  }

  return (
    <ul className={`space-y-3 ${className}`} aria-label="Featured nearby places">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display font-semibold text-primary">{item.name}</h3>
            <span className="text-xs font-medium uppercase tracking-wide text-secondary">
              {categoryLabel.get(item.category)}
            </span>
          </div>
          <p className="mt-1 text-sm text-neutral-600">{item.address}</p>
          {item.note && (
            <p className="mt-2 text-sm text-neutral-700">{item.note}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
