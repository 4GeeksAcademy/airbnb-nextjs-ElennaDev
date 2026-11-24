import SortSelect from "@/components/SortSelect";
import type { SortOrder } from "@/types/sort";

interface ResultsHeaderProps {
  count: number;
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

const ResultsHeader = ({ count, sortOrder, onSortChange }: ResultsHeaderProps) => {
  const label = count === 1 ? "alojamiento" : "alojamientos";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
      <h1 className="text-sm font-semibold text-neutral-800" aria-live="polite">
        {count} {label}
      </h1>
      <SortSelect value={sortOrder} onChange={onSortChange} />
    </div>
  );
};

export default ResultsHeader;
