import React from "react";

function Summary({ propertyDetails }) {
  if (!propertyDetails) return null;

  const {
    owner_name,
    owner_phone,
    area,
    built_year,
    price,
    room_count,
    sell,
    condition,
    property_type,
    location,
  } = propertyDetails;

  return (
    <div className="w-full mx-auto mt-4">
      <div className="card bg-base-100 ">
        <div className="card-body p-4 w-150">
          <h2 className="card-title text-lg mb-2">Property Summary</h2>

          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <div className="flex flex-col py-1">
              <span className="font-medium text-gray-500">Owner Name</span>
              <span>{owner_name || "-"}</span>
            </div>
            <div className="flex flex-col py-1">
              <span className="font-medium text-gray-500">Phone</span>
              <span>{owner_phone || "-"}</span>
            </div>

            <div className="flex flex-col py-1">
              <span className="font-medium text-gray-500">Area</span>
              <span>{area ? `${area} m²` : "-"}</span>
            </div>
            <div className="flex flex-col py-1">
              <span className="font-medium text-gray-500">Built Year</span>
              <span>{built_year || "-"}</span>
            </div>

            <div className="flex flex-col py-1">
              <span className="font-medium text-gray-500">Price</span>
              <span>{price ? `${price.toLocaleString()} Ft` : "-"}</span>
            </div>
            <div className="flex flex-col py-1">
              <span className="font-medium text-gray-500">Rooms</span>
              <span>{room_count || "-"}</span>
            </div>

            <div className="flex flex-col py-1">
              <span className="font-medium text-gray-500">For Sale</span>
              <span>{sell != null ? (sell ? "Yes" : "No") : "-"}</span>
            </div>
            <div className="flex flex-col py-1">
              <span className="font-medium text-gray-500">Condition</span>
              <span>{condition || "-"}</span>
            </div>

            <div className="flex flex-col py-1">
              <span className="font-medium text-gray-500">Property Type</span>
              <span>{property_type || "-"}</span>
            </div>
          </div>

          {location && (
            <>
              <div className="divider my-3">Location</div>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col py-1">
                  <span className="font-medium text-gray-500">City</span>
                  <span>{location.city || "-"}</span>
                </div>
                <div className="flex flex-col py-1">
                  <span className="font-medium text-gray-500">Street</span>
                  <span>{location.street || "-"}</span>
                </div>
                <div className="flex flex-col py-1">
                  <span className="font-medium text-gray-500">House Number</span>
                  <span>{location.houseNumber || "-"}</span>
                </div>
                <div className="flex flex-col py-1">
                  <span className="font-medium text-gray-500">ZIP Code</span>
                  <span>{location.zipCode || "-"}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Summary;
