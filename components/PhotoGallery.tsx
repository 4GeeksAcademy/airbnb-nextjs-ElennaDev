"use client";

import { useState } from "react";
import GalleryControls from "@/components/GalleryControls";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

interface PhotoGalleryProps {
  photos: string[];
  category?: string;
}

const PhotoGallery = ({ photos, category }: PhotoGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = photos.length - 1;

  const goPrev = () => setCurrentIndex((index) => Math.max(0, index - 1));
  const goNext = () => setCurrentIndex((index) => Math.min(lastIndex, index + 1));

  return (
    <section aria-label="Galería de fotos" aria-roledescription="carrusel" className="-mx-6 md:mx-0">
      <PhotoPlaceholder
        category={category}
        variant={currentIndex}
        label={photos[currentIndex]}
        className="aspect-[4/3] md:aspect-video md:rounded-2xl"
      >
        <GalleryControls
          onPrev={goPrev}
          onNext={goNext}
          canPrev={currentIndex > 0}
          canNext={currentIndex < lastIndex}
        />
        <span
          className="absolute right-3 bottom-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white"
          aria-live="polite"
        >
          {currentIndex + 1} / {photos.length}
        </span>
      </PhotoPlaceholder>
    </section>
  );
};

export default PhotoGallery;
