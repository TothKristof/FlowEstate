import React from "react";

function PersonalDetailsForm({ step_name, handleChange, propertyDetails}) {
  return (
    <fieldset className="fieldset m-auto my-2 rounded-box w-xs border p-4">
      <legend className="fieldset-legend">{step_name}</legend>

      <div className="basis-3/12 m-2">
        <legend className="fieldset-legend">Full Name</legend>
        <input type="text" className="input" placeholder="John Doe" value={propertyDetails.owner_name} onChange={(e) => handleChange("owner_name", e.target.value)}/>
      </div>

      <div className="basis-3/12 m-2">
        <legend className="fieldset-legend">Phone number</legend>
        <input type="tel" className="input" placeholder="+36208428437" value={propertyDetails.owner_phone} onChange={(e) => handleChange("owner_phone", e.target.value)}/>
      </div>

    </fieldset>
  );
}

export default PersonalDetailsForm;
