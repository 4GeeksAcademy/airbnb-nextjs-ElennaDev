import type { Category } from "@/types/category";

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
  onSelect: (id: string) => void;
}

const BASE_CLASSES =
  "flex h-9 shrink-0 items-center gap-2 rounded-full border border-neutral-200 px-4 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:outline-none md:text-base";
const ACTIVE_CLASSES = "bg-neutral-100 text-neutral-800 shadow-sm";
const INACTIVE_CLASSES = "bg-white text-neutral-500 hover:text-neutral-800 hover:shadow-sm";

const CategoryItem = ({ category, isActive, onSelect }: CategoryItemProps) => {
  const { id, label, icon: Icon } = category;

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={() => onSelect(id)}
      className={`${BASE_CLASSES} ${isActive ? ACTIVE_CLASSES : INACTIVE_CLASSES}`}
    >
      <Icon className="size-4" aria-hidden="true" />
      {label}
    </button>
  );
};

export default CategoryItem;
