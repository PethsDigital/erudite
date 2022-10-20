import React, { useState } from "react";

export default function SelectInput({
  name,
  defaultValue,
  id,
  handleChange,
  label,
  options,
}: {
  name: string;
  defaultValue: string;
  id: string;
  handleChange: any;
  label: string;
  options: string[];
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="flex flex-col">
      {isActive && (
        <label
          htmlFor={name}
          className="text-poppins text-[#3D90EFFC] text-lg leading-[27px] font-medium opacity-[99%] mb-4"
        >
          {label}
        </label>
      )}

      <select
        name={name}
        id={id}
        className="px-8 py-4 rounded-[15px] outline-none border focus-within:border-[#3D90EFFC] border-[#E0E0E0FC] focus-within:text-[#3D90EFFC] text-[#E0E0E0FC] opacity-[99%]"
        onChange={handleChange(name)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      >
        <option value="">{defaultValue}</option>
        {options.map((opt, index) => (
          <option value={opt} key={index}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
