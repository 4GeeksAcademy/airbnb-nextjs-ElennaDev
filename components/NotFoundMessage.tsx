import Link from "next/link";
import { SearchX } from "lucide-react";

interface NotFoundMessageProps {
  message?: string;
}

const NotFoundMessage = ({
  message = "Puede que el enlace sea incorrecto o que el alojamiento ya no esté disponible.",
}: NotFoundMessageProps) => {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <SearchX className="size-10 text-neutral-400" aria-hidden="true" />
      <h1 className="text-2xl font-semibold text-neutral-800">Alojamiento no encontrado</h1>
      <p className="max-w-sm text-neutral-500">{message}</p>
      <Link
        href="/catalog"
        className="mt-2 rounded-full bg-neutral-100 px-5 py-2.5 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:outline-none"
      >
        Ver el catálogo
      </Link>
    </div>
  );
};

export default NotFoundMessage;
