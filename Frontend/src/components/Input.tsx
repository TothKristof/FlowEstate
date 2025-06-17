import React from "react";

interface InputProps {
  title: string;
  type: string;
  placeholder: string;
  description?: string;
}

function Input({ title, type, placeholder, description }: InputProps) {
  return (
    <div className="basis-3/12 m-2">
      <legend className="fieldset-legend">{title}</legend>
      <input type={type} className="input" placeholder={placeholder} />
      {description && <p className="label">{description}</p>}
    </div>
  );
}

export default Input;