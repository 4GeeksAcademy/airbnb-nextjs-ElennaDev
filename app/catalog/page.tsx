"use client";

import { useEffect, useState } from "react";
import ListingList from "@/components/ListingList";
import LoadingIndicator from "@/components/LoadingIndicator";
import MapPlaceholder from "@/components/MapPlaceholder";
import Navbar from "@/components/Navbar";
import ResultsHeader from "@/components/ResultsHeader";
import { listings as mockListings } from "@/data/listings";
import type { Listing } from "@/types/listing";
import type { SortOrder } from "@/types/sort";

const LOADING_DELAY_MS = 800;

const CatalogPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Carga simulada al montar (§5). El setState va dentro del callback (T-4).
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setListings(mockListings);
      setIsLoading(false);
    }, LOADING_DELAY_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  // Estado derivado (T-3): filtrar por texto y ordenar una copia, sin mutar el estado.
  const normalizedQuery = query.trim().toLowerCase();
  const visibleListings = listings
    .filter(
      (listing) =>
        listing.title.toLowerCase().includes(normalizedQuery) ||
        listing.location.toLowerCase().includes(normalizedQuery),
    )
    .toSorted((a, b) =>
      sortOrder === "asc" ? a.pricePerNight - b.pricePerNight : b.pricePerNight - a.pricePerNight,
    );

  return (
    <>
      <Navbar query={query} onQueryChange={setQuery} />
      <main className="flex-1 px-6 pb-8 md:px-10 lg:px-20">
        {isLoading ? (
          <div className="h-[4.25rem]" aria-hidden="true" />
        ) : (
          <ResultsHeader count={visibleListings.length} sortOrder={sortOrder} onSortChange={setSortOrder} />
        )}
        <div className="flex flex-col gap-6 md:grid md:grid-cols-[3fr_2fr] md:items-start">
          <section aria-label="Resultados">
            {isLoading ? <LoadingIndicator /> : <ListingList listings={visibleListings} />}
          </section>
          <MapPlaceholder />
        </div>
      </main>
    </>
  );
};

export default CatalogPage;
