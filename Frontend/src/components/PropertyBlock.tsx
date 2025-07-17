import { priceConverter } from "../utils/priceConverter";
import type { Property } from "../utils/types/Property";
import { Link } from "react-router-dom";

interface PropertyBlockProps {
  property: Property;
}

function PropertyBlock({ property }: PropertyBlockProps) {
  const { id, price, built_year, location, imageUrls, sell, room_count, area } =
    property;

  const imageSrc =
    imageUrls && imageUrls.length > 0
      ? imageUrls[0]
      : "https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_2000x.jpg?v=1500393334";

  // Handle null location fields
  const city = location.city ?? "";
  const street = location.street ?? "";
  const houseNumber = location.houseNumber ?? "";

  return (
    <div className="sm:flex-col lg:flex-row lg:flex items-stretch border-success border-3 border rounded-[1.2rem] my-2 p-2 gap-2 min-h-[300px]">
      <div className="basis-6/12 aspect-[4/2] relative h-full">
        <img
          className="rounded-[1rem] w-full h-full object-cover absolute top-0 left-0"
          src={imageSrc}
          alt={`${street} ${city}`.trim() || "Property Image"}
        />
      </div>
      <div className="basis-6/12 flex flex-col justify-between p-6 pb-2 bg-success/10 rounded-[1rem] h-full xl:aspect-[4/2]">
        <div className="flex-col">
          <div className="badge bg-emerald-200/50 rounded-full text-md font-bold p-4 text-emerald-600">
            {sell !== null ? (sell ? "For sale" : "For Rent") : "N/A"}
          </div>
        </div>
        <div className="mt-2">
          <p className="font-bold text-4xl">
            {price !== null && sell !== null
              ? priceConverter(price, sell)
              : "N/A"}
          </p>
          <h3 className="text-stone-500 text-md">
            {city || street || houseNumber
              ? `${city}${city && (street || houseNumber) ? ", " : ""
                }${street} ${houseNumber}`.trim()
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
          <Link to={`/main/property/${id}`}>
            <button className="btn btn-success w-full rounded-full font-bold text-center">
              View Property
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyBlock;
