import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
}

const SectionHeader = ({ title, subtitle, href }: SectionHeaderProps) => {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-xl leading-tight font-semibold text-neutral-800 md:text-2xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          aria-label={`Ver todo: ${title}`}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-800 transition hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:outline-none"
        >
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
