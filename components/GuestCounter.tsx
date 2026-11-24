import { Minus, Plus } from "lucide-react";

interface GuestCounterProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const BUTTON_CLASSES =
  "flex size-8 items-center justify-center rounded-full border border-neutral-300 text-neutral-800 transition hover:border-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-neutral-300";

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const GuestCounter = ({ value, min, max, onChange }: GuestCounterProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="font-semibold text-neutral-800">Huéspedes</p>
        <p className="text-xs text-neutral-500">Máximo {max}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Quitar un huésped"
          onClick={() => onChange(clamp(value - 1, min, max))}
          disabled={value <= min}
          className={BUTTON_CLASSES}
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <span className="w-6 text-center tabular-nums" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          aria-label="Añadir un huésped"
          onClick={() => onChange(clamp(value + 1, min, max))}
          disabled={value >= max}
          className={BUTTON_CLASSES}
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default GuestCounter;
