import React from "react";

interface WidgetHeadingProps {
  title: string;
}

export default function WidgetHeading({ title }: WidgetHeadingProps) {
  return (
    <span className="text-poppins text-left px-8 block font-semibold text-[#3D90EFFC]/[99%] text-[28px] capitalize leading-[42px]">
      {title}
    </span>
  );
}
