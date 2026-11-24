"use client";

import { use, useEffect, useState } from "react";
import BackLink from "@/components/BackLink";
import LoadingIndicator from "@/components/LoadingIndicator";
import Navbar from "@/components/Navbar";
import NotFoundMessage from "@/components/NotFoundMessage";
import RoomContent from "@/components/RoomContent";
import { listings as mockListings } from "@/data/listings";
import type { Listing } from "@/types/listing";

interface RoomDetailProps {
  params: Promise<{ id: string }>;
}

const LOADING_DELAY_MS = 800;

// Contenedor con estado de la vista de Detalle (D-7 / T-8).
const RoomDetail = ({ params }: RoomDetailProps) => {
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState<Listing | null>(null);

  // Carga simulada dependiente del id (§5). El setState va dentro del callback (T-4).
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setListing(mockListings.find((item) => item.id === id) ?? null);
      setIsLoading(false);
    }, LOADING_DELAY_MS);
    return () => clearTimeout(timeoutId);
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 pb-12 md:px-10 lg:px-20">
        <div className="py-4">
          <BackLink />
        </div>
        {isLoading && <LoadingIndicator label="Cargando alojamiento…" />}
        {!isLoading && !listing && <NotFoundMessage />}
        {!isLoading && listing && <RoomContent listing={listing} />}
      </main>
    </>
  );
};

export default RoomDetail;
