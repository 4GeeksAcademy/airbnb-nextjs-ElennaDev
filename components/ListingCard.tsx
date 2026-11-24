import Link from "next/link";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import StarRating from "@/components/StarRating";
import type { Listing } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const { id, title, location, pricePerNight, rating, photos } = listing;

  return (
    <Link
      href={`/rooms/${id}`}
      className="group block rounded-2xl focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-4 focus-visible:outline-none"
    >
      <PhotoPlaceholder
        label={photos[0]}
        className="aspect-square rounded-2xl shadow-sm transition-opacity group-hover:opacity-90"
      />
      <div className="mt-3">
        <h3 className="line-clamp-2 text-[15px] leading-snug font-semibold text-neutral-800">
          {title}
        </h3>
        <p className="mt-0.5 text-sm text-neutral-500">{location}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-sm">
          <span>
            <span className="font-semibold text-neutral-800">{pricePerNight} €</span>
            <span className="text-neutral-500"> / noche</span>
          </span>
          <span className="text-neutral-400" aria-hidden="true">
            ·
          </span>
          <StarRating rating={rating} />
        </p>
      </div>
    </Link>
  );
};

export default ListingCard;
