import StarRating from "@/components/StarRating";

interface ListingHeaderProps {
  title: string;
  rating: number;
  reviewCount: number;
  location: string;
}

const ListingHeader = ({ title, rating, reviewCount, location }: ListingHeaderProps) => {
  return (
    <header className="pb-6">
      <h1 className="text-2xl leading-tight font-semibold text-neutral-800 md:text-3xl">{title}</h1>
      <p className="mt-2 flex flex-wrap items-center gap-x-1.5 text-sm text-neutral-800">
        <StarRating rating={rating} />
        <span className="text-neutral-400" aria-hidden="true">
          ·
        </span>
        <span className="font-medium underline">
          {reviewCount} {reviewCount === 1 ? "reseña" : "reseñas"}
        </span>
        <span className="text-neutral-400" aria-hidden="true">
          ·
        </span>
        <span className="text-neutral-500">{location}</span>
      </p>
    </header>
  );
};

export default ListingHeader;
