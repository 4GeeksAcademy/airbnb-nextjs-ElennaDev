import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
}

const formatRating = (rating: number): string =>
  rating.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 2 });

const StarRating = ({ rating, reviewCount }: StarRatingProps) => {
  const value = formatRating(rating);

  return (
    <span className="inline-flex items-center gap-1 text-sm text-neutral-800">
      <Star className="size-3.5 fill-current" aria-hidden="true" />
      <span aria-hidden="true">{value}</span>
      {reviewCount !== undefined && (
        <span className="text-neutral-500" aria-hidden="true">
          ({reviewCount})
        </span>
      )}
      <span className="sr-only">
        Valoración {value} de 5
        {reviewCount !== undefined && `, ${reviewCount} reseñas`}
      </span>
    </span>
  );
};

export default StarRating;
