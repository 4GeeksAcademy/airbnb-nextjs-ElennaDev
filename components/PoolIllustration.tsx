// Escena de Piscinas: piscina con escalera y palmera.
const PALM_LEAVES = [
  { rotate: -35, cx: 46, cy: 112 },
  { rotate: 20, cx: 68, cy: 110 },
  { rotate: -75, cx: 50, cy: 102 },
  { rotate: 70, cx: 66, cy: 100 },
];

const PoolIllustration = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="140" width="200" height="60" className="fill-stone-100" />
      <rect x="40" y="152" width="150" height="34" rx="4" className="fill-cyan-200" />
      <path d="M52 164 q 10 -5 20 0 t 20 0" className="fill-none stroke-cyan-100 stroke-2" />
      <path d="M120 174 q 10 -5 20 0 t 20 0" className="fill-none stroke-cyan-100 stroke-2" />
      <path d="M170 146 v 24 M180 146 v 24" className="fill-none stroke-neutral-400 stroke-2" />
      <path d="M170 156 h 10 M170 164 h 10" className="stroke-neutral-400 stroke-2" />
      <path d="M44 156 Q 50 130 58 108" className="fill-none stroke-amber-400 stroke-[5]" />
      {PALM_LEAVES.map(({ rotate, cx, cy }) => (
        <ellipse
          key={rotate}
          cx={cx}
          cy={cy}
          rx="16"
          ry="5"
          transform={`rotate(${rotate} ${cx} ${cy})`}
          className="fill-emerald-400"
        />
      ))}
      <rect x="10" y="176" width="24" height="6" rx="2" className="fill-rose-300" />
    </svg>
  );
};

export default PoolIllustration;
