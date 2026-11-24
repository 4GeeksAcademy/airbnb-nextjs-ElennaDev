// Escena de Cabañas: cabaña de madera entre pinos y montañas.
const PINES = [
  { x: 28, size: 1 },
  { x: 168, size: 1.2 },
  { x: 186, size: 0.8 },
];

const CabinIllustration = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="-10,160 55,96 120,160" className="fill-teal-200" />
      <polygon points="70,160 140,90 210,160" className="fill-emerald-300" />
      <polygon points="128,102 140,90 152,102 146,100 140,104 134,100" className="fill-white" />
      <rect x="0" y="158" width="200" height="42" className="fill-lime-200" />
      <rect x="72" y="136" width="56" height="36" className="fill-amber-200" />
      <line x1="72" y1="148" x2="128" y2="148" className="stroke-amber-400" />
      <line x1="72" y1="160" x2="128" y2="160" className="stroke-amber-400" />
      <polygon points="64,138 100,112 136,138" className="fill-amber-600" />
      <rect x="94" y="150" width="12" height="22" className="fill-amber-800" />
      <rect x="110" y="142" width="10" height="9" className="fill-yellow-100" />
      {PINES.map(({ x, size }) => (
        <polygon
          key={x}
          points={`${x - 12 * size},${178} ${x},${178 - 42 * size} ${x + 12 * size},${178}`}
          className="fill-emerald-400"
        />
      ))}
    </svg>
  );
};

export default CabinIllustration;
