import type { Property } from "../../../utils/types/Property";
import { useFormContext } from "react-hook-form";

function PersonalDetailsForm() {
  const { register, formState: { errors } } = useFormContext<Property>();

  return (
    <fieldset className="fieldset m-auto my-2 rounded-box sm:w-10 md:w-xs border p-4">
      <div className="basis-3/12 m-2">
        <legend className="fieldset-legend">Full Name</legend>
        <input
          type="text"
          className="input"
          placeholder="John Doe"
          {...register("owner_name", { required: "Name is required" })}
        />
        {errors.owner_name && <span className="text-red-500 p-1 text-sm">{errors.owner_name.message}</span>}
      </div>

      <div className="basis-3/12 m-2">
        <legend className="fieldset-legend">Phone number</legend>
        <input
          type="tel"
          className="input"
          placeholder="+36208428437"
          {...register("owner_phone", { required: "Phone number is required", minLength: { value: 12, message: "Phone number must be 12 digits" }, maxLength: { value: 12, message: "Phone number must be 12 digits" } })}
        />
        {errors.owner_phone && <span className="text-red-500 p-1 text-sm">{errors.owner_phone.message}</span>}
      </div>

    </fieldset>
  );
}

export default PersonalDetailsForm;
