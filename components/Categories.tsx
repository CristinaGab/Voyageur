import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';
import { Tent, Star, Waves, Zap, Home, Fish, Snowflake, Droplets, Trees } from 'lucide-react';

interface CategoriesProps {
  selectedCategory: string;
  onSelectCategory: (cat: Category) => void;
}

const IconMap: Record<string, React.ElementType> = {
  "Star": Star,
  "Waves": Waves,
  "Droplets": Droplets,
  "Tent": Tent,
  "Zap": Zap,
  "Trees": Trees,
  "Home": Home,
  "Fish": Fish,
  "Snowflake": Snowflake,
};

export const Categories: React.FC<CategoriesProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="pt-24 pb-4 sticky top-20 bg-white z-40 shadow-sm md:shadow-none">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide pb-2">
          {CATEGORIES.map((cat) => {
            const Icon = IconMap[cat.icon];
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name as Category)}
                className={`flex flex-col items-center gap-2 min-w-[64px] cursor-pointer group transition-all duration-200 border-b-2 pb-2 ${
                  isSelected
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200'
                }`}
              >
                <Icon className={`w-6 h-6 ${isSelected ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                <span className={`text-xs whitespace-nowrap ${isSelected ? 'font-medium' : 'font-normal'}`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};