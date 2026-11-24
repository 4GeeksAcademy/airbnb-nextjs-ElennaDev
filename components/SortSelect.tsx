import { ArrowDown, ArrowUp, type LucideIcon } from "lucide-react";
import type { SortOrder } from "@/types/sort";

interface SortSelectProps {
  value: SortOrder;
  onChange: (order: SortOrder) => void;
}

interface SortOption {
  order: SortOrder;
  label: string;
  description: string;
  icon: LucideIcon;
}

const OPTIONS: SortOption[] = [
  { order: "asc", label: "Precio", description: "Precio de menor a mayor", icon: ArrowUp },
  { order: "desc", label: "Precio", description: "Precio de mayor a menor", icon: ArrowDown },
];

const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <div role="group" aria-label="Ordenar por precio" className="flex shrink-0 gap-2">
      {OPTIONS.map(({ order, label, description, icon: Icon }) => {
        const isActive = order === value;
        return (
          <button
            key={order}
            type="button"
            aria-pressed={isActive}
            aria-label={description}
            onClick={() => onChange(order)}
            className={`flex h-9 items-center gap-1 rounded-full border border-neutral-200 px-4 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:outline-none ${
              isActive ? "bg-neutral-100 text-neutral-800 shadow-sm" : "bg-white text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {label}
            <Icon className="size-4" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
};

export default SortSelect;
