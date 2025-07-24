import React, { useState, useRef, useEffect } from "react";
import type { Filter } from "../../utils/types/Filter";

interface PriceRangeInputProps{
  filters: Filter,
  setFilters: React.Dispatch<React.SetStateAction<Filter>>
}

function PriceRangeInput({ filters, setFilters }: PriceRangeInputProps) {
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? null : parseFloat(value) * 1_000_000;
    setFilters((prev) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  const handleFocus = () => {
    setFocused(true);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)  &&
        !filters.minPrice &&
        !filters.maxPrice
      ) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filters.minPrice, filters.maxPrice]);

  const showInputs = focused || filters.minPrice !== null || filters.maxPrice !== null;

  return (
    <div className="flex flex-col" ref={wrapperRef}>
      <label className="font-semibold mb-1">Price range</label>
      <div
        className="flex items-center border-2 rounded-md px-3 bg-white cursor-text h-12"
        onClick={handleFocus}
      >
        {showInputs ? (
          <>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice !== null ? filters.minPrice / 1_000_000 : ""}
              onChange={handleChange}
              placeholder="min."
              className="w-full h-full px-1 py-1 outline-none bg-transparent"
            />
            <span className="mx-2 text-gray-500">-</span>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice !== null ? filters.maxPrice / 1_000_000 : ""}
              onChange={handleChange}
              placeholder="max."
              className="w-full h-full px-1 py-1 outline-none bg-transparent"
            />
            <span className="ml-2 text-black font-semibold">M Ft</span>
          </>
        ) : (
          <>
            <span className="text-gray-400 pl-1 select-none">Price</span>
            <span className="ml-auto text-black font-semibold">M Ft</span>
          </>
        )}
      </div>
    </div>
  );
}

export default PriceRangeInput;
