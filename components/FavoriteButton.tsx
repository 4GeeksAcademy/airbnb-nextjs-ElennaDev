import { Heart } from "lucide-react";
import type { MouseEvent } from "react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton = ({ isFavorite, onToggle }: FavoriteButtonProps) => {
  // Evita que el clic llegue al <Link> de la tarjeta y navegue al detalle (§7).
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggle();
  };

  return (
    <button
      type="button"
      aria-label={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
      aria-pressed={isFavorite}
      onClick={handleClick}
      className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full transition hover:scale-110 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
    >
      <Heart
        className={`size-6 drop-shadow ${isFavorite ? "fill-rose-600 text-rose-600" : "fill-black/40 text-white"}`}
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
};

export default FavoriteButton;
