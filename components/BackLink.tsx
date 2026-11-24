import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  href?: string;
  label?: string;
}

const BackLink = ({ href = "/catalog", label = "Volver al catálogo" }: BackLinkProps) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full text-sm font-medium text-neutral-800 hover:underline focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:outline-none"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      {label}
    </Link>
  );
};

export default BackLink;
