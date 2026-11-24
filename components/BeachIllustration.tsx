// Escena de Playa: mar en franjas, arena y sombrilla.
const BeachIllustration = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 size-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="128" width="200" height="40" className="fill-sky-300" />
      <rect x="0" y="140" width="200" height="10" className="fill-sky-200" />
      <path
        d="M0 158 Q 25 152 50 158 T 100 158 T 150 158 T 200 158"
        className="fill-none stroke-white stroke-2"
      />
      <path d="M0 166 Q 60 156 120 164 T 200 160 V200 H0 Z" className="fill-amber-100" />
      <line x1="132" y1="128" x2="140" y2="182" className="stroke-neutral-500 stroke-[1.5]" />
      <path d="M104 132 Q 132 102 162 126 Z" className="fill-rose-300" />
      <path d="M124 128 Q 133 108 142 127 Z" className="fill-white" />
      <rect x="52" y="174" width="34" height="12" rx="2" className="fill-teal-200" />
      <rect x="52" y="178" width="34" height="3" className="fill-white" />
    </svg>
  );
};

export default BeachIllustration;
