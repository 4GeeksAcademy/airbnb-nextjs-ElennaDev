"use client";

// BANCO DE PRUEBAS TEMPORAL (tarea 2.9). Se elimina en la tarea 3.5.
import { useState } from "react";
import ListingCard from "@/components/ListingCard";
import LoadingIndicator from "@/components/LoadingIndicator";
import Navbar from "@/components/Navbar";
import { listings } from "@/data/listings";

const HomePage = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <Navbar query={query} onQueryChange={setQuery} />
      <main className="space-y-10 px-6 py-8 md:px-10 lg:px-20">
        <p data-testid="echo">Eco: {query}</p>
        <Navbar />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.slice(0, 4).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        <LoadingIndicator />
      </main>
    </>
  );
};

export default HomePage;
