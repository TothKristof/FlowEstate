import { useState, useRef, useEffect } from "react";
import type { Filter } from "../../utils/types/Filter";

interface PriceRangeInputProps{
  filters: Filter,
  setFilters: React.Dispatch<React.SetStateAction<Filter>>
}

function RoomRangeInput({ filters, setFilters }:PriceRangeInputProps) {
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value === "" ? null : parseInt(value),
    }));
  };

  const handleFocus = () => setFocused(true);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node) &&
        !filters.minRooms &&
        !filters.maxRooms
      ) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filters.minRooms, filters.maxRooms]);

  const showInputs = focused || filters.minRooms || filters.maxRooms;

  return (
    <div className="flex flex-col" ref={wrapperRef}>
      <label className="font-semibold mb-1">Rooms</label>
      <div
        className="flex items-center border-2 rounded-md px-3 py-2 bg-white cursor-text h-12"
        onClick={handleFocus}
      >
        {showInputs ? (
          <>
            <input
              type="number"
              name="minRooms"
              value={filters.minRooms || ""}
              onChange={handleChange}
              placeholder="min."
              className="w-full px-1 py-1 outline-none bg-transparent"
            />
            <span className="mx-2 text-gray-500">-</span>
            <input
              type="number"
              name="maxRooms"
              value={filters.maxRooms || ""}
              onChange={handleChange}
              placeholder="max."
              className="w-full px-1 py-1 outline-none bg-transparent"
            />
          </>
        ) : (
          <span className="text-gray-400 pl-1 select-none">Rooms</span>
        )}
      </div>
    </div>
  );
}

export default RoomRangeInput;
