import type { Filter } from "../../utils/types/Filter";

interface FilterChipsProps {
  appliedFilters: Filter;
  setAppliedFilters: React.Dispatch<React.SetStateAction<Filter>>;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}

function FilterChips({ appliedFilters, setAppliedFilters, setFilters }: FilterChipsProps) {
  const handleRemove = (key: keyof Filter) => {
    setAppliedFilters((prev: Filter) => ({ ...prev, [key]: null }));
    setFilters((prev: Filter) => ({ ...prev, [key]: null }));
  };

  const handleClearAll = () => {
    const empty = {
      minPrice: null,
      maxPrice: null,
      minRooms: null,
      maxRooms: null,
      sell: null,
      propertyType: null,
      condition: null,
      city: null,
    };
    setFilters(empty);
    setAppliedFilters({
      minPrice: null,
      maxPrice: null,
      minRooms: null,
      maxRooms: null,
      sell: null,
      propertyType: null,
      condition: null,
      city: null,
    });
  };

  const renderChips = () => {
    const chips = [];

    if (appliedFilters.minPrice || appliedFilters.maxPrice) {
      const min = appliedFilters.minPrice ? appliedFilters.minPrice / 1_000_000 : "";
      const max = appliedFilters.maxPrice ? appliedFilters.maxPrice / 1_000_000 : "";
      chips.push({
        key: "price",
        label: `Price: ${min} - ${max} M Ft`,
      });
    }

    if (appliedFilters.minRooms || appliedFilters.maxRooms) {
      chips.push({
        key: "rooms",
        label: `Rooms: ${appliedFilters.minRooms ?? ""} - ${appliedFilters.maxRooms ?? ""}`,
      });
    }

    Object.entries(appliedFilters).forEach(([key, value]) => {
      if (
        !value ||
        ["minPrice", "maxPrice", "minRooms", "maxRooms"].includes(key)
      )
        return;

      let label = "";
      if (key === "sell") label = value ? "For sale" : "For rent";
      else
        label =
          key.charAt(0).toUpperCase() +
          key.slice(1) +
          ": " +
          value.toString().charAt(0).toUpperCase() +
          value.toString().slice(1);

      chips.push({ key, label });
    });

    return chips;
  };

  const chips = renderChips();

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map(({ key, label }) => (
        <div
          key={key}
          className="bg-gray-200 rounded-full px-4 py-1 text-sm flex items-center"
        >
          <span>{label}</span>
          <button
            className="ml-2 text-red-500 font-bold"
            onClick={() => {
              if (key === "price") {
                handleRemove("minPrice");
                handleRemove("maxPrice");
              } else if (key === "rooms") {
                handleRemove("minRooms");
                handleRemove("maxRooms");
              } else {
                handleRemove(key as keyof Filter);
              }
            }}
          >
            ×
          </button>
        </div>
      ))}
      {chips.length > 0 && (
        <button
          className="ml-2 text-sm underline text-red-600"
          onClick={handleClearAll}
        >
          Delete all filters
        </button>
      )}
    </div>
  );
}

export default FilterChips;
