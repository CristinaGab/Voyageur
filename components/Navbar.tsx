import React, { useState } from 'react';
import { Search, Globe, Menu, User, MapPin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Simple scroll effect hook would go here, omitting for brevity in this snippet
  // but styling supports sticky behavior.

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-none cursor-pointer" onClick={() => window.location.hash = ''}>
          <div className="flex items-center gap-2 text-emerald-600">
            <MapPin className="w-8 h-8 fill-emerald-600 text-white" />
            <span className="text-2xl font-bold tracking-tight hidden md:block">voyageur</span>
          </div>
        </div>

        {/* Search Bar - Center */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-auto items-center justify-center">
          <div className="flex items-center border border-gray-200 rounded-full py-2.5 px-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer divide-x divide-gray-300">
            <div className="px-4 font-medium text-sm text-gray-900 truncate">Anywhere</div>
            <div className="px-4 font-medium text-sm text-gray-900 truncate">Any week</div>
            <div className="pl-4 flex items-center gap-3">
              <span className="font-normal text-sm text-gray-500">Add guests</span>
              <div className="bg-emerald-600 p-2.5 rounded-full text-white">
                <Search className="w-4 h-4 stroke-[3px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Placeholder */}
        <div className="flex md:hidden flex-1 mx-4">
           <div className="flex w-full items-center border border-gray-200 rounded-full py-2 px-4 shadow-sm">
              <Search className="w-4 h-4 mr-3" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Anywhere</span>
                <span className="text-xs text-gray-500">Any week • Add guests</span>
              </div>
           </div>
        </div>

        {/* User Menu - Right */}
        <div className="flex-none flex items-center gap-4">
          <div className="text-sm font-medium hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer hidden md:block">
            Voyageur your home
          </div>
          <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer hidden md:block">
            <Globe className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-3 border border-gray-200 rounded-full p-1 pl-3 hover:shadow-md transition cursor-pointer ml-1">
            <Menu className="w-5 h-5 text-gray-600" />
            <div className="bg-gray-500 text-white rounded-full p-1">
              <User className="w-6 h-6 fill-current relative top-0.5" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};