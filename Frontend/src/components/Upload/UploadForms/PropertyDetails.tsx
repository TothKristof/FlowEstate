import React, { useState, useRef } from "react";
import { priceConverter } from "../../../utils/priceConverter";
import type { Property } from "../../../utils/types/Property";
import { useFormContext } from "react-hook-form";

interface PropertyDetailsProps {
  conditions: string[];
  propertyTypes: string[];
}

function PropertyDetails({
  conditions,
  propertyTypes,
}: PropertyDetailsProps) {
  const { register, formState: { errors } } = useFormContext<Property>();
  const { setValue, watch, trigger } = useFormContext<Property>();
  const propertyDetails = watch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleConditionClick = (condition: string) => {
    setValue("condition", condition);
    trigger("condition");
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as "area" | "price" | "room_count" | "built_year";
    const value = e.target.value;
    const convertedValue = value === "" ? null : parseFloat(value);
    setValue(name, convertedValue);
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
              {...register("area", {
                required: "Area is required",
                valueAsNumber: true,
                min: { value: 1, message: "Area must be greater than 0" },
                max: { value: 10000, message: "Area must be less than 10000" },
                onChange: (e) => {
                  handleInputChange(e);
                },
                validate: (value) =>
                  Number.isInteger(Number(value)) || "Area must be an integer",
              })}
              name="area"
            />
            {errors.area && <span className="text-red-500 p-1 text-sm">{errors.area.message}</span>}
          </div>

          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Built Date:</legend>
            <input
              type="number"
              className="input border border-gray-300 rounded-lg p-2 w-full"
              placeholder="2000"
              value={propertyDetails.built_year ?? ""}
              {...register("built_year", {
                required: "Built year is required",
                valueAsNumber: true,
                min: { value: 1900, message: "Built year must be greater than 1900" },
                max: { value: new Date().getFullYear(), message: `Built year must be less than ${new Date().getFullYear()}` },
                onChange: (e) => {
                  handleInputChange(e);
                },
                validate: (value) =>
                  Number.isInteger(Number(value)) || "Built year must be an integer",
              })}
              name="built_year"
            />
            {errors.built_year && <span className="text-red-500 p-1 text-sm">{errors.built_year.message}</span>}
          </div>

          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Price:</legend>
            <input
              type="number"
              className="input border border-gray-300 rounded-lg p-2 w-full"
              placeholder="8600000"
              value={propertyDetails.price ?? ""}
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 1, message: "Price must be greater than 0" },
                max: { value: 1000000000, message: "Price must be less than 1000000000" },
              })}
              name="price"
            />
            <p className="m-2 text-xl w-full text-right">
              {(propertyDetails.price !== null && propertyDetails.price !== undefined && propertyDetails.price !== 0)
                ? priceConverter(propertyDetails.price, propertyDetails.sell)
                : ""}
            </p>
            {errors.price && <span className="text-red-500 p-1 text-sm">{errors.price.message}</span>}
          </div>

          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Condition:</legend>
            {conditions && conditions.length > 0 && (
              <div className="relative">
                <div className="flex flex-wrap gap-2">
                  {conditions.slice(0, 4).map((condition) => (
                    <button
                      type="button"
                      key={condition}
                      className={`btn btn-sm ${
                        propertyDetails.condition === condition ? `btn-success` : "btn-outline"
                      }`}
                      onClick={() => {
                        handleConditionClick(condition);
                        trigger("condition");
                      }}
                      {...register("condition", {
                        required: "Condition is required",
                      })}
                    >
                      {condition}
                    </button>
                  ))}
                  {conditions.length > 4 && (
                    <div className="relative">
                      <button
                        type="button"
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
                              type="button"
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
                {errors.condition && <span className="text-red-500 p-1 text-sm">{errors.condition.message}</span>}
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
              {...register("room_count", {
                required: "Room count is required",
                valueAsNumber: true,
                min: { value: 1, message: "Room count must be greater than 0" },
                max: { value: 10, message: "Room count must be less than 10" },
                onChange: (e) => {
                  handleInputChange(e);
                },
                validate: (value) =>
                  Number.isInteger(Number(value)) || "Room count must be an integer",
              })}
              name="room_count"
            />
            {errors.room_count && <span className="text-red-500 p-1 text-sm">{errors.room_count.message}</span>}
          </div>
          <div className="basis-1/3 m-2">
            <legend className="fieldset-legend">Rent or Sell</legend>
            <div className="flex gap-4">
              <button
                type="button"
                className={`btn btn-xl ${propertyDetails.sell ? "btn-success" : "btn-outline"}`}
                onClick={() => {
                  setValue("sell", true);
                  trigger("sell");
                }}
              >
                Sell
              </button>
              <button
                type="button"
                className={`btn btn-xl ${!propertyDetails.sell ? "btn-success" : "btn-outline"}`}
                  onClick={() => {
                    setValue("sell", false);
                    trigger("sell");
                  }}
              >
                Rent
              </button>
            </div>
            {errors.sell && <span className="text-red-500 p-1 text-sm">{errors.sell.message}</span>}
          </div>

          <div className="basis-2/3 m-2">
            <legend className="fieldset-legend">Property type:</legend>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((propertyType) => (
                <button
                  type="button"
                  key={propertyType}
                  className={`btn btn-sm ${
                    propertyDetails.property_type === propertyType ? `btn-success` : "btn-outline"
                  }`}
                    onClick={() => {
                      setValue("property_type", propertyType);
                      trigger("property_type");
                    }}
                    {...register("property_type", {
                      required: "Property type is required",
                    })}
                >
                  {propertyType}
                </button>
              ))}
            </div>
            {errors.property_type && <span className="text-red-500 p-1 text-sm">{errors.property_type.message}</span>}
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default PropertyDetails;