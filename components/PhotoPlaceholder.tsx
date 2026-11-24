import type { ReactNode } from "react";
import CategoryIllustration from "@/components/CategoryIllustration";

interface PhotoPlaceholderProps {
  /** `Listing.category`. Sin valor o desconocida → ilustración genérica. */
  category?: string;
  /** Índice de la foto en la galería: cambia degradado y sol (D-9). */
  variant?: number;
  /** Nombre accesible de la foto (no visible, D-8). Sin label, la capa es decorativa. */
  label?: string;
  /** Forma y proporción. Sustituye a la forma por defecto (cuadrada y redondeada). */
  className?: string;
  /** Overlays posicionados con `absolute` (badges, botones, contador). */
  children?: ReactNode;
}

const PhotoPlaceholder = ({
  category,
  variant = 0,
  label,
  className = "aspect-square rounded-2xl",
  children,
}: PhotoPlaceholderProps) => {
  // La capa ilustrada va separada de los overlays: si llevara role="img" el contenedor,
  // los botones hijos dejarían de ser accesibles.
  const a11yProps = label
    ? { role: "img", "aria-label": `Foto: ${label}` }
    : { "aria-hidden": true };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" {...a11yProps}>
        <CategoryIllustration category={category} variant={variant} />
      </div>
      {children}
    </div>
  );
};

export default PhotoPlaceholder;
