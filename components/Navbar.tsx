import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import UserMenu from "@/components/UserMenu";

interface NavbarProps {
  query?: string;
  /** Si no se pasa, no se muestra la búsqueda (vista de Detalle). */
  onQueryChange?: (query: string) => void;
}

const Navbar = ({ query = "", onQueryChange }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
      <div className="flex items-center gap-3 px-6 py-3 md:gap-6 md:px-10 lg:px-20">
        <Logo />
        <div className="flex flex-1 justify-center">
          {onQueryChange && (
            <div className="w-full md:max-w-xl">
              <SearchBar value={query} onChange={onQueryChange} />
            </div>
          )}
        </div>
        <UserMenu />
      </div>
    </header>
  );
};

export default Navbar;
