"use client";

import Link from "next/link";
import { useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";
import ListingBadge from "@/components/ListingBadge";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import StarRating from "@/components/StarRating";
import type { Listing } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const { id, title, location, pricePerNight, rating, photos, badge } = listing;
  // Estado local no compartido (excepción a T-2 aceptada en plan.md, fase 7).
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    // FavoriteButton va como hermano del <Link> (no dentro) para no anidar un <button> en un <a>.
    <div className="relative">
      <Link
        href={`/rooms/${id}`}
        className="group block rounded-2xl focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-4 focus-visible:outline-none"
      >
        <PhotoPlaceholder
          label={photos[0]}
          className="aspect-square rounded-2xl shadow-sm transition-opacity group-hover:opacity-90"
        >
          {badge && <ListingBadge label={badge} />}
        </PhotoPlaceholder>
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
      <FavoriteButton isFavorite={isFavorite} onToggle={() => setIsFavorite((value) => !value)} />
    </div>
  );
};

export default ListingCard;
