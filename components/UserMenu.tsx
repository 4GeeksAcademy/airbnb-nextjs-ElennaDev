import { CircleUserRound, Menu } from "lucide-react";

// Solo visual (§4): no abre ningún menú ni navega.
const UserMenu = () => {
  return (
    <button
      type="button"
      aria-label="Menú de usuario"
      className="flex shrink-0 items-center gap-3 rounded-full text-neutral-500 focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:outline-none md:border md:border-neutral-200 md:py-1 md:pr-1 md:pl-3 md:hover:shadow-md"
    >
      <Menu className="hidden size-4 text-neutral-800 md:block" aria-hidden="true" />
      <CircleUserRound className="size-8" strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
};

export default UserMenu;
