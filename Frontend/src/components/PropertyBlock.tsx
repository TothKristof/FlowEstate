import React from "react";
import { priceConverter } from "../utils/priceConverter";

interface Location {
  city: string;
  street: string;
  houseNumber: number;
}

interface Property {
  price: number;
  builtYear: number;
  condition: string;
  location: Location;
}

function PropertyBlock({ property }) {
  const { price, built_year, condition, location, imageUrls, sell } = property;

  const imageSrc =
    imageUrls && imageUrls.length > 0
      ? imageUrls[0]
      : "https://saterdesign.com/cdn/shop/products/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_2000x.jpg?v=1500393334";

  return (
    <div className="flex border-success border-3 border rounded-[1.2rem] my-2  p-2">
      <div className="basis-3/12 flex-col">
        <img
          className="rounded-[1rem]"
          src={imageSrc}
          alt="{location.street} ${location.city}"
        />
      </div>
      <div className="basis-8/12 p-2 flex-col ps-6">
        <p className="font-bold text-4xl ">{priceConverter(price, sell)}</p>
        <h3 className="text-stone-500">
          {location.city}, {location.street} {location.houseNumber}.
        </h3>
        <p>Built Year: {built_year}</p>
        <div className="badge badge-success">{condition}</div>
      </div>
    </div>
  );
}

export default PropertyBlock;
