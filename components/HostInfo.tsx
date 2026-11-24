import { CircleUserRound } from "lucide-react";
import type { Host } from "@/types/listing";

interface HostInfoProps {
  host: Host;
}

const HostInfo = ({ host }: HostInfoProps) => {
  const { name, yearsHosting } = host;
  const yearsLabel = yearsHosting === 1 ? "año" : "años";

  return (
    <section aria-label="Anfitrión" className="flex items-center gap-4 border-t border-neutral-200 py-6">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-500">
        <CircleUserRound className="size-7" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div>
        <p className="font-semibold text-neutral-800">Anfitrión: {name}</p>
        <p className="text-sm text-neutral-500">
          {yearsHosting} {yearsLabel} como anfitrión
        </p>
      </div>
    </section>
  );
};

export default HostInfo;
