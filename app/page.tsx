"use client";

import { MapPinned } from "lucide-react";
import { useEffect, useState } from "react";
import CategoryBar from "@/components/CategoryBar";
import ListingGrid from "@/components/ListingGrid";
import LoadingIndicator from "@/components/LoadingIndicator";
import Navbar from "@/components/Navbar";
import PromoCard from "@/components/PromoCard";
import SectionHeader from "@/components/SectionHeader";
import { ALL_CATEGORY_ID, categories } from "@/data/categories";
import { listings as mockListings } from "@/data/listings";
import type { Listing } from "@/types/listing";

const LOADING_DELAY_MS = 800;

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY_ID);

  // Carga simulada al montar (§5). El setState va dentro del callback (T-4).
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setListings(mockListings);
      setIsLoading(false);
    }, LOADING_DELAY_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  // Estado derivado: categoría + texto, sin useEffect (T-3).
  const normalizedQuery = query.trim().toLowerCase();
  const visibleListings = listings.filter(
    (listing) =>
      (activeCategory === ALL_CATEGORY_ID || listing.category === activeCategory) &&
      (listing.title.toLowerCase().includes(normalizedQuery) ||
        listing.location.toLowerCase().includes(normalizedQuery)),
  );

  return (
    <>
      <Navbar query={query} onQueryChange={setQuery} />
      <main className="flex-1 space-y-8 px-6 py-6 md:px-10 lg:px-20">
        <CategoryBar
          categories={categories}
          activeId={activeCategory}
          onSelect={setActiveCategory}
        />
        <section>
          <SectionHeader
            title="Alojamientos destacados"
            subtitle="Escapadas con las mejores valoraciones"
            href="/catalog"
          />
          {isLoading ? <LoadingIndicator /> : <ListingGrid listings={visibleListings} />}
        </section>
        <PromoCard
          title="¿Buscas algo concreto? Compara todos los alojamientos por precio"
          ctaLabel="Ver el catálogo"
          href="/catalog"
          icon={<MapPinned className="size-14" strokeWidth={1.25} aria-hidden="true" />}
        />
      </main>
    </>
  );
};

export default HomePage;
