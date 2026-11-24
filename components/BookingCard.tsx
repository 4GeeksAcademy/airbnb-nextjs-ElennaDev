"use client";

import { useState } from "react";
import GuestCounter from "@/components/GuestCounter";

interface BookingCardProps {
  pricePerNight: number;
  maxGuests: number;
}

const MIN_GUESTS = 1;

const BookingCard = ({ pricePerNight, maxGuests }: BookingCardProps) => {
  const [guests, setGuests] = useState(MIN_GUESTS);

  return (
    <aside
      aria-label="Reserva"
      className="space-y-5 rounded-2xl border border-neutral-200 p-6 shadow-md"
    >
      <p>
        <span className="text-xl font-semibold text-neutral-800">{pricePerNight} €</span>
        <span className="text-neutral-500"> / noche</span>
      </p>
      <GuestCounter value={guests} min={MIN_GUESTS} max={maxGuests} onChange={setGuests} />
      {/* Sin reserva real (fuera de alcance): el CTA no navega. */}
      <button
        type="button"
        className="h-12 w-full rounded-lg bg-rose-600 font-semibold text-white transition hover:bg-rose-700 focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Reservar
      </button>
      <p className="text-center text-sm text-neutral-500">No se hará ningún cargo todavía</p>
    </aside>
  );
};

export default BookingCard;
