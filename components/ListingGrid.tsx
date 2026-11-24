import ListingCard from "@/components/ListingCard";
import type { Listing } from "@/types/listing";

interface ListingGridProps {
  listings: Listing[];
}

const ListingGrid = ({ listings }: ListingGridProps) => {
  if (listings.length === 0) {
    return (
      <p className="rounded-2xl bg-neutral-50 px-6 py-10 text-center text-neutral-500">
        No hay alojamientos que coincidan con tu búsqueda.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings.map((listing) => (
        <li key={listing.id}>
          <ListingCard listing={listing} />
        </li>
      ))}
    </ul>
  );
};

export default ListingGrid;
