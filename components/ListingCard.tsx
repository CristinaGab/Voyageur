import React from 'react';
import { Property } from '../types';
import { Star, Heart } from 'lucide-react';

interface ListingCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ property, onClick }) => {
  return (
    <div 
      className="group cursor-pointer flex flex-col gap-3 w-full relative"
      onClick={() => onClick(property)}
    >
      {/* Image Container */}
      <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-gray-200">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <button className="absolute top-3 right-3 p-2 rounded-full hover:scale-110 transition active:scale-90">
          <Heart className="w-6 h-6 text-white fill-black/40 stroke-white stroke-[2px]" />
        </button>
        {property.isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
             <span className="text-xs font-bold text-gray-800">Guest favorite</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 truncate">{property.location}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-black" />
            <span className="text-sm font-light">{property.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">{property.distance}</p>
        <p className="text-gray-500 text-sm">{property.dates}</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="font-semibold text-gray-900">€{property.price}</span>
          <span className="text-gray-900 font-light">night</span>
        </div>
      </div>
    </div>
  );
};
