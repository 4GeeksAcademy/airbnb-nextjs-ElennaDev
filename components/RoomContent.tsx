import AmenitiesGrid from "@/components/AmenitiesGrid";
import BookingCard from "@/components/BookingCard";
import HostInfo from "@/components/HostInfo";
import ListingHeader from "@/components/ListingHeader";
import PhotoGallery from "@/components/PhotoGallery";
import type { Listing } from "@/types/listing";

interface RoomContentProps {
  listing: Listing;
}

// Layout del Detalle: una columna en móvil; contenido + reserva sticky desde md: (RF-22).
const RoomContent = ({ listing }: RoomContentProps) => {
  return (
    <>
      <PhotoGallery key={`gallery-${listing.id}`} photos={listing.photos} />
      <div className="mt-6 md:grid md:grid-cols-[2fr_1fr] md:items-start md:gap-12">
        <div>
          <ListingHeader
            title={listing.title}
            rating={listing.rating}
            reviewCount={listing.reviewCount}
            location={listing.location}
          />
          <HostInfo host={listing.host} />
          <AmenitiesGrid amenities={listing.amenities} />
        </div>
        <div className="mt-2 md:sticky md:top-24 md:mt-0">
          <BookingCard
            key={`booking-${listing.id}`}
            pricePerNight={listing.pricePerNight}
            maxGuests={listing.maxGuests}
          />
        </div>
      </div>
    </>
  );
};

export default RoomContent;
