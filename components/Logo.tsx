import Link from "next/link";
import { House } from "lucide-react";

const Logo = () => {
  return (
    <Link
      href="/"
      aria-label="Refugio, ir al inicio"
      className="flex shrink-0 items-center gap-2 rounded-full text-rose-600 focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:outline-none"
    >
      <House className="size-8" strokeWidth={2.25} aria-hidden="true" />
      <span className="hidden text-xl font-bold tracking-tight md:inline">refugio</span>
    </Link>
  );
};

export default Logo;
