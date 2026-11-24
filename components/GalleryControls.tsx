import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

const BUTTON_CLASSES =
  "flex size-8 items-center justify-center rounded-full bg-white text-neutral-800 shadow-md transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-neutral-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100";

const GalleryControls = ({ onPrev, onNext, canPrev, canNext }: GalleryControlsProps) => {
  return (
    <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
      <button type="button" aria-label="Foto anterior" onClick={onPrev} disabled={!canPrev} className={BUTTON_CLASSES}>
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>
      <button type="button" aria-label="Foto siguiente" onClick={onNext} disabled={!canNext} className={BUTTON_CLASSES}>
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default GalleryControls;
