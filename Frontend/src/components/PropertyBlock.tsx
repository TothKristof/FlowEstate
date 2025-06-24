import { priceConverter } from "../utils/priceConverter";
import type { Property } from "../utils/types/Property";

interface PropertyBlockProps {
  property: Property;
}

function PropertyBlock({ property }: PropertyBlockProps) {
  const {
    price,
    built_year,
    location,
    imageUrls,
    sell,
    room_count,
    area,
  } = property;

  
  const imageSrc =
    imageUrls && imageUrls.length > 0
      ? imageUrls[0]
      : "https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_2000x.jpg?v=1500393334";

  // Handle null location fields
  const city = location.city ?? "";
  const street = location.street ?? "";
  const houseNumber = location.houseNumber ?? "";

  return (
    <div className="sm:flex-col md:flex-row md:flex border-success border-3 border rounded-[1.2rem] my-2 p-2 gap-2">
      <div className="basis-6/12">
        <div className="relative w-full h-full" style={{ aspectRatio: "4 / 2" }}>
          <img
            className="rounded-[1rem] w-full h-full object-cover"
            src={imageSrc}
            alt={`${street} ${city}`.trim() || "Property Image"}
          />
        </div>
      </div>
      <div className="basis-6/12 flex-col p-6 pb-2 bg-success/10 mx-auto rounded-[1rem]">
        <div className="flex-col">
          <div className="badge bg-emerald-200/50 rounded-full text-md font-bold p-4 text-emerald-600">
            {sell !== null ? (sell ? "For sale" : "For Rent") : "N/A"}
          </div>
        </div>
        <div className="mt-2">
          <p className="font-bold text-4xl">
            {price !== null && sell !== null ? priceConverter(price, sell) : "N/A"}
          </p>
          <h3 className="text-stone-500 text-md">
            {city || street || houseNumber
              ? `${city}${city && (street || houseNumber) ? ", " : ""}${street} ${houseNumber}`.trim()
              : "Location not specified"}
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between py-1">
            <p className="text-sm font-medium">Rooms</p>
            <p className="text-sm">{room_count ?? "N/A"}</p>
          </div>
          <div className="border-t border-gray-500"></div>
          <div className="flex justify-between py-1">
            <p className="text-sm font-medium">Built year</p>
            <p className="text-sm">{built_year ?? "N/A"}</p>
          </div>
          <div className="border-t border-gray-500"></div>
          <div className="flex justify-between py-1">
            <p className="text-sm font-medium">Area (m²)</p>
            <p className="text-sm">{area !== null ? `${area} m²` : "N/A"}</p>
          </div>
        </div>
        <div className="mt-3">
          <button className="btn btn-success w-full rounded-full font-bold text-center">
            View Property
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyBlock;