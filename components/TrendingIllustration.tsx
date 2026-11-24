// Escena de Tendencias: bloque urbano con ventanas y una planta en maceta.
const WINDOW_ROWS = [104, 124, 144];
const WINDOW_COLS = [68, 90, 112];

const TrendingIllustration = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="140" y="118" width="44" height="66" className="fill-orange-200" />
      <rect x="150" y="128" width="10" height="10" className="fill-amber-50" />
      <rect x="166" y="128" width="10" height="10" className="fill-amber-50" />
      <rect x="56" y="92" width="86" height="92" className="fill-rose-200" />
      <rect x="56" y="92" width="86" height="6" className="fill-rose-300" />
      {WINDOW_ROWS.map((y) =>
        WINDOW_COLS.map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="16" height="12" rx="1" className="fill-amber-50" />
        )),
      )}
      <rect x="88" y="164" width="22" height="20" className="fill-rose-400" />
      <rect x="0" y="184" width="200" height="16" className="fill-neutral-300" />
      <path d="M24 184 L 28 166 H 44 L 48 184 Z" className="fill-orange-300" />
      <ellipse cx="30" cy="156" rx="7" ry="13" className="fill-emerald-400" />
      <ellipse cx="42" cy="154" rx="7" ry="15" className="fill-emerald-500" />
    </svg>
  );
};

export default TrendingIllustration;
