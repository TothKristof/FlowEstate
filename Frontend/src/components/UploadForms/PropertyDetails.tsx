import React, { useState, useRef } from "react";
import { priceConverter } from "../../utils/priceConverter";
import type { Property } from "../../utils/types/Property";

interface PropertyDetailsProps {
  handleChange: (field: string, value: string | number | boolean | null) => void;
  conditions: string[];
  propertyTypes: string[];
  propertyDetails: Property;
}

function PropertyDetails({
  handleChange,
  conditions,
  propertyTypes,
  propertyDetails,
}: PropertyDetailsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleConditionClick = (condition: string) => {
    handleChange("condition", condition);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericFields = ["area", "price", "room_count"];
    const convertedValue = numericFields.includes(name) ? (value === "" ? null : parseFloat(value)) : value;
    handleChange(name, convertedValue);
  };

  return (
    <fieldset className="fieldset mx-auto my-2 rounded-box flex justify-center border">
      <div className="flex w-full p-2">
        <div className="basis-6/12">
          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Area (m²)</legend>
            <input
              type="number"
              className="input border border-gray-300 rounded-lg p-2 w-full"
              placeholder="86"
              value={propertyDetails.area ?? ""}
              onChange={handleInputChange}
              name="area"
            />
          </div>

          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Built Date:</legend>
            <input
              type="month"
              className="input border border-gray-300 rounded-lg p-2 w-full"
              placeholder="2000-02"
              value={propertyDetails.built_year ?? ""}
              onChange={(e) => handleChange("built_year", e.target.value.slice(0, 4))}
              name="built_year"
            />
          </div>

          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Price:</legend>
            <input
              type="number"
              className="input border border-gray-300 rounded-lg p-2 w-full"
              placeholder="8600000"
              value={propertyDetails.price ?? ""}
              onChange={handleInputChange}
              name="price"
            />
            <p className="m-2 text-xl w-full text-right">
              {propertyDetails.price !== null && propertyDetails.sell !== null
                ? priceConverter(propertyDetails.price, propertyDetails.sell)
                : ""}
            </p>
          </div>

          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Condition:</legend>
            {conditions && conditions.length > 0 && (
              <div className="relative">
                <div className="flex flex-wrap gap-2">
                  {conditions.slice(0, 4).map((condition) => (
                    <button
                      key={condition}
                      className={`btn btn-sm ${
                        propertyDetails.condition === condition ? `btn-success` : "btn-outline"
                      }`}
                      onClick={() => handleConditionClick(condition)}
                    >
                      {condition}
                    </button>
                  ))}
                  {conditions.length > 4 && (
                    <div className="relative">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        ...
                      </button>
                      {isDropdownOpen && (
                        <div
                          ref={dropdownRef}
                          className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                        >
                          {conditions.slice(4).map((condition) => (
                            <button
                              key={condition}
                              className={`block w-full text-left px-4 py-2 btn ${
                                propertyDetails.condition === condition ? `btn-success` : ""
                              }`}
                              onClick={() => handleConditionClick(condition)}
                            >
                              {condition}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="basis-6/12">
          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Room count:</legend>
            <input
              type="number"
              className="input border border-gray-300 rounded-lg p-2 w-full"
              placeholder="3"
              value={propertyDetails.room_count ?? ""}
              onChange={handleInputChange}
              name="room_count"
            />
          </div>
          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Rent or Sell</legend>
            <div className="flex gap-4">
              <button
                className={`btn btn-xl ${propertyDetails.sell ? "btn-success" : "btn-outline"}`}
                onClick={() => handleChange("sell", true)}
              >
                Sell
              </button>
              <button
                className={`btn btn-xl ${!propertyDetails.sell ? "btn-success" : "btn-outline"}`}
                onClick={() => handleChange("sell", false)}
              >
                Rent
              </button>
            </div>
          </div>

          <div className="basis-2/3 m-2">
            <legend className="fieldset-legend">Property type:</legend>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((propertyType) => (
                <button
                  key={propertyType}
                  className={`btn btn-sm ${
                    propertyDetails.property_type === propertyType ? `btn-success` : "btn-outline"
                  }`}
                  onClick={() => handleChange("property_type", propertyType)}
                >
                  {propertyType}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default PropertyDetails;