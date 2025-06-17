import React from "react";
import Input from "./Input";

function SearchForm() {
  return (
    <>
      <h2 className="font-[700] text-2xl">Find the best place</h2>
      <fieldset className="search-form fieldset flex flex-row ">
        <div className="md:form-row md:flex-row flex flex-col w-full">
          {/* Looking for*/}
          <Input title="Looking for" type="text" placeholder="Enter type" />

          {/* Price */}
          <Input title="Price" type="number" placeholder="Price" />

          {/* Location */}
          <Input title="Locations" type="text" placeholder="Location" />

          {/* Number of rooms */}
          <Input
            title="Number of rooms"
            type="number"
            placeholder="2 Bed rooms"
          />
        </div>
      </fieldset>
      <div className="flex justify-end">
        <button className="btn btn-neutral mt-4 rounded-[2rem] w-40">
          Search Properties
        </button>
      </div>
    </>
  );
}

export default SearchForm;
