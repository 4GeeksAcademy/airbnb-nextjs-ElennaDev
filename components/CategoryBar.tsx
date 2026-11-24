import CategoryItem from "@/components/CategoryItem";
import type { Category } from "@/types/category";

interface CategoryBarProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

const CategoryBar = ({ categories, activeId, onSelect }: CategoryBarProps) => {
  return (
    <nav aria-label="Categorías" className="-mx-6 md:mx-0">
      <ul className="flex gap-3 overflow-x-auto px-6 py-1 [scrollbar-width:none] md:gap-6 md:px-0 [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <li key={category.id} className="shrink-0">
            <CategoryItem
              category={category}
              isActive={category.id === activeId}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryBar;
