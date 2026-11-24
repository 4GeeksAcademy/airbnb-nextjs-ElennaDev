import type { Amenity } from "@/types/listing";

interface AmenityItemProps {
  amenity: Amenity;
}

const AmenityItem = ({ amenity }: AmenityItemProps) => {
  const { icon: Icon, label } = amenity;

  return (
    <li className="flex min-w-0 items-center gap-2 text-base text-neutral-800 md:gap-3">
      <Icon className="size-6 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      <span className="min-w-0 hyphens-auto">{label}</span>
    </li>
  );
};

export default AmenityItem;
