interface LoadingIndicatorProps {
  label?: string;
}

const SKELETON_CARDS = 4;

const LoadingIndicator = ({ label = "Cargando alojamientos…" }: LoadingIndicatorProps) => {
  return (
    <div role="status" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: SKELETON_CARDS }, (_, index) => (
        <div key={index} className="animate-pulse" aria-hidden="true">
          <div className="aspect-square rounded-2xl bg-neutral-200" />
          <div className="mt-3 h-4 w-3/4 rounded bg-neutral-200" />
          <div className="mt-2 h-4 w-1/2 rounded bg-neutral-200" />
        </div>
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default LoadingIndicator;
