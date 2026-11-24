import {
  Car,
  CookingPot,
  Dumbbell,
  Flame,
  Mountain,
  Snowflake,
  Tv,
  WashingMachine,
  Waves,
  WavesLadder,
  Wifi,
} from "lucide-react";
import type { Amenity, Listing } from "@/types/listing";

const WIFI: Amenity = { icon: Wifi, label: "Wifi" };
const KITCHEN: Amenity = { icon: CookingPot, label: "Cocina" };
const PARKING: Amenity = { icon: Car, label: "Aparcamiento gratuito" };
const AC: Amenity = { icon: Snowflake, label: "Aire acondicionado" };
const TV: Amenity = { icon: Tv, label: "Televisión" };
const WASHER: Amenity = { icon: WashingMachine, label: "Lavadora" };
const POOL: Amenity = { icon: WavesLadder, label: "Piscina" };
const FIREPLACE: Amenity = { icon: Flame, label: "Chimenea" };
const GYM: Amenity = { icon: Dumbbell, label: "Gimnasio" };
const SEA_VIEW: Amenity = { icon: Waves, label: "Vistas al mar" };
const MOUNTAIN_VIEW: Amenity = { icon: Mountain, label: "Vistas a la montaña" };

const FULL_GALLERY = ["Salón", "Dormitorio", "Cocina", "Baño", "Exterior"];

export const listings: Listing[] = [
  {
    id: "1", title: "Casa frente al mar en Tarifa", location: "Tarifa, Cádiz",
    pricePerNight: 145, rating: 4.92, reviewCount: 128, category: "beach",
    photos: FULL_GALLERY, maxGuests: 6, host: { name: "Lucía", yearsHosting: 7 },
    amenities: [WIFI, KITCHEN, SEA_VIEW, PARKING, WASHER, AC],
  },
  {
    id: "2", title: "Apartamento junto a la playa", location: "Sitges, Barcelona",
    pricePerNight: 98, rating: 4.71, reviewCount: 64, category: "beach",
    photos: ["Terraza", "Salón", "Dormitorio"], maxGuests: 4, host: { name: "Jordi", yearsHosting: 3 },
    amenities: [WIFI, AC, SEA_VIEW, TV],
  },
  {
    id: "3", title: "Mansión con jardín histórico", location: "Sevilla",
    pricePerNight: 620, rating: 4.97, reviewCount: 41, category: "mansions",
    photos: ["Fachada", "Jardín", "Salón", "Comedor"], maxGuests: 12, host: { name: "Carmen", yearsHosting: 11 },
    amenities: [WIFI, KITCHEN, POOL, PARKING, AC, GYM, TV, WASHER],
  },
  {
    id: "4", title: "Palacete con vistas al Retiro", location: "Madrid",
    pricePerNight: 480, rating: 4.88, reviewCount: 57, category: "mansions",
    photos: ["Salón", "Biblioteca", "Dormitorio"], maxGuests: 10, host: { name: "Álvaro", yearsHosting: 5 },
    amenities: [WIFI, KITCHEN, AC, TV, GYM],
  },
  {
    id: "5", title: "Loft de diseño en Malasaña", location: "Madrid",
    pricePerNight: 112, rating: 4.83, reviewCount: 203, category: "trending",
    photos: ["Loft"], maxGuests: 2, host: { name: "Sara", yearsHosting: 1 },
    amenities: [WIFI, KITCHEN, AC, TV],
  },
  {
    id: "6", title: "Estudio para una persona en el centro", location: "Valencia",
    pricePerNight: 54, rating: 4.6, reviewCount: 89, category: "trending",
    photos: ["Estudio", "Baño"], maxGuests: 1, host: { name: "Pau", yearsHosting: 2 },
    amenities: [WIFI, AC, WASHER],
  },
  {
    id: "7", title: "Cabaña de madera en el Pirineo", location: "Benasque, Huesca",
    pricePerNight: 135, rating: 4.95, reviewCount: 76, category: "cabins",
    photos: FULL_GALLERY, maxGuests: 5, host: { name: "Iker", yearsHosting: 6 },
    amenities: [WIFI, KITCHEN, FIREPLACE, MOUNTAIN_VIEW, PARKING],
  },
  {
    id: "8", title: "Refugio entre robles", location: "Cangas de Onís, Asturias",
    pricePerNight: 89, rating: 4.78, reviewCount: 52, category: "cabins",
    photos: ["Exterior", "Interior", "Porche"], maxGuests: 3, host: { name: "Marta", yearsHosting: 4 },
    amenities: [KITCHEN, FIREPLACE, MOUNTAIN_VIEW, PARKING],
  },
  {
    id: "9", title: "Villa con piscina infinita", location: "Ibiza",
    pricePerNight: 390, rating: 4.9, reviewCount: 98, category: "pools",
    photos: ["Piscina", "Salón", "Dormitorio", "Terraza"], maxGuests: 8, host: { name: "Nora", yearsHosting: 9 },
    amenities: [WIFI, POOL, AC, SEA_VIEW, KITCHEN, PARKING, TV],
  },
  {
    id: "10", title: "Casa rural con piscina", location: "Ronda, Málaga",
    pricePerNight: 165, rating: 4.68, reviewCount: 37, category: "pools",
    photos: ["Piscina", "Patio", "Dormitorio"], maxGuests: 6, host: { name: "Antonio", yearsHosting: 8 },
    amenities: [WIFI, POOL, KITCHEN, PARKING, FIREPLACE],
  },
  {
    id: "11", title: "Ático con terraza en la Barceloneta", location: "Barcelona",
    pricePerNight: 210, rating: 4.86, reviewCount: 145, category: "beach",
    photos: ["Terraza", "Salón", "Dormitorio", "Cocina"], maxGuests: 4, host: { name: "Laia", yearsHosting: 5 },
    amenities: [WIFI, AC, SEA_VIEW, KITCHEN, WASHER],
  },
  {
    id: "12", title: "Casa cueva reformada", location: "Guadix, Granada",
    pricePerNight: 76, rating: 4.74, reviewCount: 61, category: "trending",
    photos: ["Entrada", "Salón", "Dormitorio"], maxGuests: 4, host: { name: "Rocío", yearsHosting: 3 },
    amenities: [WIFI, KITCHEN, PARKING, TV],
  },
];
