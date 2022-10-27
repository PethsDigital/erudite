import React from "react";

interface SectionHeaderProps {
  heading: string;
}

export default function SectionHeader({ heading }: SectionHeaderProps) {
  return (
    <div className="border-b-4 border-[#3D90EF] w-full text-left mb-2">
      <h2 className="inline capitalize px-[52px] py-[9px] text-white/[99%] text-poppins text-[28px] font-semibold leading-[42px] bg-[#3D90EF] pb-1">
        {heading}
      </h2>
    </div>
  );
}
