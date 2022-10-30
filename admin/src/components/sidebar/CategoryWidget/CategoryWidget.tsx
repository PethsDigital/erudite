import React, { useEffect, useState } from "react";
import { getCategories } from "../../../api/data";
import { ICategory } from "../../../api/models";
import WidgetLayout from "../WidgetLayout";
import CategoryCard from "./CategoryCard";

export default function CategoryWidget() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const categories = getCategories();

    setCategories(categories);
  }, []);

  const View = () => (
    <div className="border-t border-[#E8E8E8] mt-[24.5px]">
      {categories.slice(0, 5).map((category) => (
        <CategoryCard category={category} key={category.id} />
      ))}
    </div>
  );

  return <WidgetLayout title="Categories" View={View} />;
}
