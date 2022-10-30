import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function PasswordInput({
  inputState,
  handleChange,
  handleVisibility,
  id,
  label,
  name,
  placeholder,
}: {
  inputState: boolean;
  handleChange: any;
  handleVisibility: any;
  name: string;
  label: string;
  id: string;
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
      <div className="flex items-center px-8 py-4 rounded-[15px] border border-[#E0E0E0FC] focus-within:border-[#3D90EFFC] opacity-[99%] w-full ">
        <input
          type={inputState ? "text" : "password"}
          name={name}
          id={id}
          placeholder={inputPlaceholder}
          className="outline-none text-[#3D90EFFC] w-full placeholder:text-[#E0E0E0FC]"
          onChange={handleChange(name)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />

        <button onClick={handleVisibility}>
          {inputState && <AiFillEye />}
          {!inputState && <AiFillEyeInvisible />}
        </button>
      </div>
    </div>
  );
}
