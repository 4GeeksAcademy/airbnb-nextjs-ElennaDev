import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Empieza a buscar" }: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className="flex h-14 w-full items-center gap-3 rounded-full border border-neutral-200 bg-white px-5 shadow-md focus-within:ring-2 focus-within:ring-neutral-800">
      <Search className="size-5 shrink-0 text-neutral-800" aria-hidden="true" />
      <span className="sr-only">Buscar alojamientos por nombre o ubicación</span>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-base font-medium text-neutral-800 placeholder:text-neutral-800 focus:outline-none md:placeholder:text-neutral-500"
      />
    </label>
  );
};

export default SearchBar;
