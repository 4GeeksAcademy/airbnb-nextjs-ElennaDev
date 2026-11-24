import AmenityItem from "@/components/AmenityItem";
import type { Amenity } from "@/types/listing";

interface AmenitiesGridProps {
  amenities: Amenity[];
}

const AmenitiesGrid = ({ amenities }: AmenitiesGridProps) => {
  return (
    <section aria-labelledby="amenities-title" className="border-t border-neutral-200 py-6">
      <h2 id="amenities-title" className="mb-4 text-xl font-semibold text-neutral-800">
        Qué ofrece este alojamiento
      </h2>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {amenities.map((amenity) => (
          <AmenityItem key={amenity.label} amenity={amenity} />
        ))}
      </ul>
    </section>
  );
};

export default AmenitiesGrid;
