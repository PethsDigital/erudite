import React, { useState } from "react";
import searchIcon from "../assets/icons/search.svg";

interface SearchBarProps {
  handleSearch(value: string | undefined): void;
}

export default function SearchBar({ handleSearch }: SearchBarProps) {
  const [value, setValue] = useState<string>();

  return (
    <div className="flex px-[32px] py-[17px] rounded-[15px] bg-[rgba(255,255,255,0.99)] shadow-[0_0_4px_rgba(18,25,33,0.15)] w-full max-w-[921px]">
      <button
        type="submit"
        className="mr-[24px] placeholder:text-[#E0E0E0FC]/[99%] text-poppins font-medium text-[18px] leading-[27px]"
        onClick={() => handleSearch(value)}
      >
        <img src={searchIcon} alt="Search" />
      </button>

      <input
        type="text"
        placeholder="Search Topics"
        className="w-full outline-none"
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    </div>
  );
}
