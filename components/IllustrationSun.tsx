interface IllustrationSunProps {
  variant: number;
}

// Mañana, mediodía y atardecer (D-9). Coordenadas en el mismo marco 200×200 que las escenas;
// por debajo de y≈87 para seguir visible al recortar a 16:9.
const SUN_VARIANTS = [
  { cx: 42, cy: 112, className: "fill-amber-200" },
  { cx: 100, cy: 104, className: "fill-yellow-200" },
  { cx: 158, cy: 118, className: "fill-orange-300" },
];

const IllustrationSun = ({ variant }: IllustrationSunProps) => {
  const sun = SUN_VARIANTS[Math.abs(variant) % SUN_VARIANTS.length];

  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx={sun.cx} cy={sun.cy} r="22" className="fill-white/40" />
      <circle cx={sun.cx} cy={sun.cy} r="14" className={sun.className} />
    </svg>
  );
};

export default IllustrationSun;
