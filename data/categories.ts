import { Castle, Flame, LayoutGrid, TreePine, Waves, WavesLadder } from "lucide-react";
import type { Category } from "@/types/category";

export const ALL_CATEGORY_ID = "all";

export const categories: Category[] = [
  { id: ALL_CATEGORY_ID, label: "Todas", icon: LayoutGrid },
  { id: "beach", label: "Playa", icon: Waves },
  { id: "mansions", label: "Mansiones", icon: Castle },
  { id: "trending", label: "Tendencias", icon: Flame },
  { id: "cabins", label: "Cabañas", icon: TreePine },
  { id: "pools", label: "Piscinas", icon: WavesLadder },
];
