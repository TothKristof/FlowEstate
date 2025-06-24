import type { Property } from "../../utils/types/Property";

interface LocationDetailsFormProps{
  handleChange: (field: string, value: string | number) => void,
  propertyDetails: Property
}
function LocationDetailsForm({handleChange, propertyDetails }:LocationDetailsFormProps) {
  return (
    <fieldset className="fieldset mx-auto my-2 rounded-box w-xs border p-4">
      <div className="basis-3/12 m-2">
        <legend className="fieldset-legend">City</legend>
        <input
          type="text"
          className="input"
          placeholder="London"
          value={ propertyDetails.location.city  ?? ""}
          onChange={(e) => handleChange("location.city", e.target.value)}
        />
      </div>

      <div className="basis-3/12 m-2">
        <legend className="fieldset-legend">Street</legend>
        <input
          type="text"
          className="input"
          placeholder="Something street"
          value={propertyDetails.location.street  ?? ""}
          onChange={(e) => handleChange("location.street", e.target.value)}
        />
      </div>

      <div className="basis-3/12 m-2 flex gap-2">
        <div>
          <legend className="fieldset-legend">House Number</legend>
          <input
            type="number"
            className="input"
            placeholder="23"
            value={propertyDetails.location.houseNumber  ?? ""}
            onChange={(e) =>
              handleChange("location.houseNumber", e.target.value)
            }
          />
        </div>
        <div>
          <legend className="fieldset-legend">Zip Code</legend>
          <input
            type="number"
            className="input"
            placeholder="1204"
            value={propertyDetails.location.zipCode ?? ""}
            onChange={(e) => handleChange("location.zipCode", e.target.value)}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default LocationDetailsForm;
