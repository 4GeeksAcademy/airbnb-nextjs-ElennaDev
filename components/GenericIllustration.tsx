// Escena genérica (categoría sin ilustración): casa simple entre colinas.
const GenericIllustration = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="40" cy="190" rx="110" ry="55" className="fill-emerald-200" />
      <ellipse cx="170" cy="195" rx="100" ry="50" className="fill-lime-200" />
      <rect x="78" y="122" width="48" height="40" className="fill-white" />
      <polygon points="72,124 102,98 132,124" className="fill-rose-300" />
      <rect x="96" y="140" width="12" height="22" rx="2" className="fill-neutral-300" />
      <rect x="83" y="130" width="9" height="9" rx="1" className="fill-sky-200" />
      <rect x="112" y="130" width="9" height="9" rx="1" className="fill-sky-200" />
      <rect x="0" y="180" width="200" height="20" className="fill-emerald-300" />
    </svg>
  );
};

export default GenericIllustration;
