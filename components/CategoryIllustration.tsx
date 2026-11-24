import type { ComponentType } from "react";
import BeachIllustration from "@/components/BeachIllustration";
import CabinIllustration from "@/components/CabinIllustration";
import GenericIllustration from "@/components/GenericIllustration";
import IllustrationSun from "@/components/IllustrationSun";
import MansionIllustration from "@/components/MansionIllustration";
import PoolIllustration from "@/components/PoolIllustration";
import TrendingIllustration from "@/components/TrendingIllustration";

interface CategoryIllustrationProps {
  category?: string;
  variant?: number;
}

interface IllustrationTheme {
  scene: ComponentType;
  /** Degradados de mañana, mediodía y atardecer (clases literales para que Tailwind las detecte). */
  gradients: [string, string, string];
}

const GENERIC_THEME: IllustrationTheme = {
  scene: GenericIllustration,
  gradients: ["from-neutral-100 to-stone-50", "from-sky-100 to-neutral-50", "from-orange-100 to-stone-50"],
};

const THEMES: Record<string, IllustrationTheme> = {
  beach: {
    scene: BeachIllustration,
    gradients: ["from-sky-100 to-amber-50", "from-sky-200 to-sky-50", "from-orange-100 to-rose-50"],
  },
  mansions: {
    scene: MansionIllustration,
    gradients: ["from-violet-100 to-stone-50", "from-indigo-100 to-violet-50", "from-rose-100 to-amber-50"],
  },
  trending: {
    scene: TrendingIllustration,
    gradients: ["from-rose-100 to-orange-50", "from-pink-100 to-rose-50", "from-orange-200 to-amber-50"],
  },
  cabins: {
    scene: CabinIllustration,
    gradients: ["from-emerald-100 to-lime-50", "from-sky-100 to-emerald-50", "from-amber-100 to-orange-50"],
  },
  pools: {
    scene: PoolIllustration,
    gradients: ["from-cyan-100 to-teal-50", "from-sky-200 to-cyan-50", "from-amber-100 to-pink-50"],
  },
};

const CategoryIllustration = ({ category, variant = 0 }: CategoryIllustrationProps) => {
  const { scene: Scene, gradients } = (category && THEMES[category]) || GENERIC_THEME;
  const gradient = gradients[Math.abs(variant) % gradients.length];

  return (
    <div className={`absolute inset-0 bg-linear-to-b ${gradient}`}>
      <IllustrationSun variant={variant} />
      <Scene />
    </div>
  );
};

export default CategoryIllustration;
