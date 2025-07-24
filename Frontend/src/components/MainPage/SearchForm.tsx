import React from "react";
import PriceRangeInput from "./PriceRangeInput";
import RoomRangeInput from "./RoomRangeInput";
import type { Filter } from "../../utils/types/Filter";

// Props interfész pontos típusozással
interface SearchFormProps {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
  filteredSearch: (filter: Filter) => void;
}

function SearchForm({ filters, setFilters, filteredSearch }: SearchFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue;
    if (name === "sell") {
      parsedValue = value === "" ? null : value === "true";
    } else {
      parsedValue = type === "number" ? (value === "" ? null : parseInt(value, 10)) : value === "" ? null : value;
    }
    setFilters((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  return (
    <>
      <h2 className="font-[700] text-2xl mb-4">Find the best place</h2>
      <fieldset className="search-form fieldset grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
        {/* Price Range */}
        <PriceRangeInput filters={filters} setFilters={setFilters} />

        {/* Room Count Range */}
        <RoomRangeInput filters={filters} setFilters={setFilters} />

        {/* Sell / Rent */}
        <div className="flex flex-col w-full">
          <label className="font-semibold mb-1">Listing type</label>
          <select
            name="sell"
            value={filters.sell === null || filters.sell === undefined ? "" : String(filters.sell)}
            onChange={handleChange}
            className="border-2 rounded-md px-3 py-2 bg-white h-12"
          >
            <option value="">Any</option>
            <option value="true">For Sale</option>
            <option value="false">For Rent</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="flex flex-col w-full">
          <label className="font-semibold mb-1">Property Type</label>
          <select
            name="propertyType"
            value={filters.propertyType ?? ""}
            onChange={handleChange}
            className="border-2 rounded-md px-3 py-2 bg-white h-12"
          >
            <option value="">Any</option>
            <option value="HOUSE">House</option>
            <option value="APARTMENT">Apartment</option>
            <option value="LAND">Land</option>
          </select>
        </div>

        {/* Condition */}
        <div className="flex flex-col w-full">
          <label className="font-semibold mb-1">Condition</label>
          <select
            name="condition"
            value={filters.condition ?? ""}
            onChange={handleChange}
            className="border-2 rounded-md px-3 py-2 bg-white h-12"
          >
            <option value="">Any</option>
            <option value="NEW">New</option>
            <option value="GOOD">Good</option>
            <option value="NEEDS_RENOVATION">Needs Renovation</option>
          </select>
        </div>

        {/* City */}
        <div className="flex flex-col w-full">
          <label className="font-semibold mb-1">City</label>
          <input
            type="text"
            name="city"
            value={filters.city ?? ""}
            onChange={handleChange}
            placeholder="e.g. Budapest"
            className="border-2 rounded-md px-3 py-2 bg-white h-12"
          />
        </div>
      </fieldset>

      <div className="flex justify-end">
        <button
          className="btn btn-neutral mt-4 rounded-[2rem] w-40"
          onClick={() => filteredSearch(filters)}
        >
          Search Properties
        </button>
      </div>
    </>
  );
}

export default SearchForm;