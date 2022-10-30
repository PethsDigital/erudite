import React, { useState } from "react";

export default function TextInput({
  name,
  type,
  id,
  handleChange,
  label,
  placeholder,
}: {
  name: string;
  type: React.HTMLInputTypeAttribute;
  id: string;
  handleChange: any;
  label: string;
  placeholder: string;
}) {
  const [isActive, setIsActive] = useState(false);

  const inputPlaceholder = isActive ? "" : placeholder;

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
      <input
        type={type}
        name={name}
        id={id}
        className="px-8 py-4 rounded-[15px] outline-none border focus-within:border-[#3D90EFFC] border-[#E0E0E0FC] text-[#3D90EFFC] opacity-[99%] placeholder:text-[#E0E0E0FC]"
        onChange={handleChange(name)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        placeholder={inputPlaceholder}
      />
    </div>
  );
}
