import Link from "next/link";
import type { ReactNode } from "react";

interface PromoCardProps {
  title: string;
  ctaLabel: string;
  icon?: ReactNode;
  /** Ruta interna existente. Si falta, el CTA se muestra como texto. */
  href?: string;
}

const CTA_CLASSES =
  "inline-flex rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:outline-none";

const PromoCard = ({ title, ctaLabel, icon, href }: PromoCardProps) => {
  return (
    <aside className="flex items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-md md:max-w-xl">
      <div className="space-y-3">
        <p className="text-lg leading-snug font-semibold text-neutral-800">{title}</p>
        {href ? (
          <Link href={href} className={CTA_CLASSES}>
            {ctaLabel}
          </Link>
        ) : (
          <span className={CTA_CLASSES}>{ctaLabel}</span>
        )}
      </div>
      {icon && <div className="shrink-0 text-rose-600">{icon}</div>}
    </aside>
  );
};

export default PromoCard;
