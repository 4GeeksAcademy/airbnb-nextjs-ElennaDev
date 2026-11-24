import type { LucideIcon } from "lucide-react";

export interface Host {
  name: string;
  yearsHosting: number;
}

export interface Amenity {
  icon: LucideIcon;
  label: string;
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  /** Precio por noche en euros. */
  pricePerNight: number;
  /** Valoración media de 0 a 5. */
  rating: number;
  reviewCount: number;
  /** Coincide con `Category.id`. */
  category: string;
  /** Etiquetas de los placeholders de foto (al menos una). */
  photos: string[];
  maxGuests: number;
  host: Host;
  amenities: Amenity[];
  /** Solo para el opcional RF-23. */
  badge?: string;
}
