"use client";

import { Category } from "@/sanity.types";
import { Popover } from "./popover";

interface CategorySelectorProps {
  categories: Category[];
}

export const CategorySelectorComponent = ({
  categories,
}: CategorySelectorProps) => {
  return <Popover></Popover>;
};
