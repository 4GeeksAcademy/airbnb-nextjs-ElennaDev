// Escena de Mansiones: fachada simétrica con columnas y cipreses.
const COLUMN_XS = [62, 82, 110, 130];

const MansionIllustration = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="172" width="200" height="28" className="fill-emerald-200" />
      <rect x="46" y="112" width="108" height="60" className="fill-stone-100" />
      <polygon points="40,114 100,90 160,114" className="fill-stone-300" />
      <rect x="40" y="112" width="120" height="5" className="fill-stone-200" />
      {COLUMN_XS.map((x) => (
        <rect key={x} x={x} y="117" width="8" height="55" className="fill-white" />
      ))}
      <rect x="92" y="146" width="16" height="26" rx="8" className="fill-violet-300" />
      <rect x="40" y="170" width="120" height="4" className="fill-stone-300" />
      <ellipse cx="22" cy="146" rx="9" ry="30" className="fill-emerald-400" />
      <ellipse cx="178" cy="146" rx="9" ry="30" className="fill-emerald-400" />
      <rect x="20" y="172" width="4" height="8" className="fill-amber-700" />
      <rect x="176" y="172" width="4" height="8" className="fill-amber-700" />
    </svg>
  );
};

export default MansionIllustration;
