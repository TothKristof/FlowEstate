import type { Property } from "../../utils/types/Property";
import { useFormContext } from "react-hook-form";

function LocationDetailsForm() {
  const { register, formState: { errors } } = useFormContext<Property>();
  return (
    <fieldset className="fieldset mx-auto my-2 rounded-box w-xs border p-4">
      <div className="basis-3/12 m-2">
        <legend className="fieldset-legend">City</legend>
        <input
          type="text"
          className="input"
          placeholder="London"
          {...register("location.city", { required: "City is required" })}
        />
        {errors.location?.city && <span className="text-red-500 p-1 text-sm">{errors.location.city.message}</span>}
      </div>

      <div className="basis-3/12 m-2">
        <legend className="fieldset-legend">Street</legend>
        <input
          type="text"
          className="input"
          placeholder="Something street"
          {...register("location.street", { required: "Street is required" })}
        />
        {errors.location?.street && <span className="text-red-500 p-1 text-sm">{errors.location.street.message}</span>}
      </div>

      <div className="basis-3/12 m-2 flex gap-2">
        <div>
          <legend className="fieldset-legend">House Number</legend>
          <input
            type="number"
            className="input"
            placeholder="23"
            {...register("location.houseNumber", { required: "House number is required" })}
          />
          {errors.location?.houseNumber && <span className="text-red-500 p-1 text-sm">{errors.location.houseNumber.message}</span>}
        </div>
        <div>
          <legend className="fieldset-legend">Zip Code</legend>
          <input
            type="number"
            className="input"
            placeholder="1204"
            {...register("location.zipCode", { required: "Zip code is required" })}
          />
          {errors.location?.zipCode && <span className="text-red-500 p-1 text-sm">{errors.location.zipCode.message}</span>}
        </div>
      </div>
    </fieldset>
  );
}

export default LocationDetailsForm;
