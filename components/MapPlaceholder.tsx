import { Map as MapIcon } from "lucide-react";

const MapPlaceholder = () => {
  return (
    <aside
      aria-label="Mapa de resultados"
      className="flex h-64 flex-col items-center justify-center gap-2 rounded-2xl bg-neutral-100 text-neutral-500 md:sticky md:top-24 md:h-[calc(100vh-8rem)]"
    >
      <MapIcon className="size-8" aria-hidden="true" />
      <span className="text-sm font-medium">Mapa</span>
    </aside>
  );
};

export default MapPlaceholder;
