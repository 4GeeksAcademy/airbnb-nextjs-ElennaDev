interface ListingBadgeProps {
  label: string;
}

const ListingBadge = ({ label }: ListingBadgeProps) => {
  return (
    <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm">
      {label}
    </span>
  );
};

export default ListingBadge;
