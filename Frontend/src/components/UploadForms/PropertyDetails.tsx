import React from "react";
import { useState, useRef } from "react";
import { priceConverter } from "../../utils/priceConverter";

function PropertyDetails({
  step_name,
  handleChange,
  conditions,
  propertyTypes,
  propertyDetails,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleConditionClick = (condition) => {
    handleChange("condition", condition);
    setIsDropdownOpen(false);
  };

  return (
    <fieldset className="fieldset mx-auto my-2 rounded-box  flex justify-center border">
      <legend className="fieldset-legend">{step_name}</legend>
      <div className="flex w-full p-2">
        <div className="basis-6/12">
          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Area (m²)</legend>
            <input
              type="number"
              className="input border border-gray-300 rounded-lg p-2 w-full"
              placeholder="86"
              value={propertyDetails.area}
              onChange={(e) => handleChange("area", e.target.value)}
            />
          </div>

          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Built Date:</legend>
            <input
              type="month"
              className="input border border-gray-300 rounded-lg p-2 w-full"
              placeholder="2000-februar"
              value={propertyDetails.built_year}
              onChange={(e) =>
                handleChange("built_year", e.target.value.slice(0, 4))
              }
            />
          </div>

          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Price:</legend>
            <input
              type="number"
              className="input border border-gray-300 rounded-lg p-2 w-full"
              placeholder="8600000"
              value={propertyDetails.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
            <p className="m-2 text-xl w-full text-right">{propertyDetails.price && priceConverter(propertyDetails.price, propertyDetails.sell)}</p>
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
                        propertyDetails.condition == condition
                          ? `btn-success`
                          : "btn-outline"
                      }`}
                      onClick={() => handleChange("condition", condition)}
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
                                propertyDetails.condition == condition
                                  ? `btn-success`
                                  : ""
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
              value={propertyDetails.room_count}
              onChange={(e) => handleChange("room_count", e.target.value)}
            />
          </div>
          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Rent or Sell</legend>
            <div className="flex gap-4">
              <button
                className={`btn btn-xl ${
                  propertyDetails.sell ? "btn-success" : "btn-outline"
                }`}
                onClick={() => handleChange("sell", true)}
              >
                Sell
              </button>
              <button
                className={`btn btn-xl ${
                  !propertyDetails.sell ? "btn-success" : "btn-outline"
                }`}
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
                    propertyDetails.property_type == propertyType
                      ? `btn-success`
                      : "btn-outline"
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
