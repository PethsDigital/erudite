import React from "react";
import { ICategory } from "../../../api/models";

interface ICategoryCardProps {
  category: ICategory;
}

export default function CategoryCard({ category }: ICategoryCardProps) {
  return (
    <div className="mt-8 px-8 flex justify-between text-poppins text-[#4F4F4FFC]/[99%] font-semibold text-xl leading-[30px]">
      <div className="">{category.title}</div>

      <div className="px-4 bg-[#3D90EF4D]/30 rounded-[10px]">
        {category.count}
      </div>
    </div>
  );
}
