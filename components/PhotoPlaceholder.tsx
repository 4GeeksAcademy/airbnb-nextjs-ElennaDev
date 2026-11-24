import { ImageIcon } from "lucide-react";
import type { ReactNode } from "react";

interface PhotoPlaceholderProps {
  label?: string;
  /** Forma y proporción. Sustituye a la forma por defecto (cuadrada y redondeada). */
  className?: string;
  /** Overlays posicionados con `absolute` (badges, botones, contador). */
  children?: ReactNode;
}

const PhotoPlaceholder = ({
  label,
  className = "aspect-square rounded-2xl",
  children,
}: PhotoPlaceholderProps) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden bg-neutral-200 text-neutral-500 ${className}`}
    >
      <ImageIcon className="size-8" aria-hidden="true" />
      {label && <span className="text-sm font-medium">{label}</span>}
      {children}
    </div>
  );
};

export default PhotoPlaceholder;
