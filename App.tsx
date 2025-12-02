import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Categories } from './components/Categories';
import { ListingCard } from './components/ListingCard';
import { PropertyDetails } from './components/PropertyDetails';
import { MOCK_PROPERTIES } from './constants';
import { Category, Property } from './types';
import { Map } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.Icons);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Filter logic (mock)
  const filteredProperties = selectedCategory === Category.Icons 
    ? MOCK_PROPERTIES 
    : MOCK_PROPERTIES.filter(p => p.category === selectedCategory);

  // If filtered is empty, show all (for demo purposes if a category is empty)
  const displayProperties = filteredProperties.length > 0 ? filteredProperties : MOCK_PROPERTIES;

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20">
      <Navbar />
      
      {/* Main Content Area */}
      <main>
        <Categories 
          selectedCategory={selectedCategory} 
          onSelectCategory={(cat) => setSelectedCategory(cat)} 
        />
        
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-6 gap-y-10">
            {displayProperties.map((property) => (
              <ListingCard 
                key={property.id} 
                property={property} 
                onClick={setSelectedProperty} 
              />
            ))}
          </div>
        </div>

        {/* Floating Map Toggle (Cosmetic) */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30">
          <button className="bg-gray-900 text-white px-5 py-3.5 rounded-full font-medium text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
            Show map <Map className="w-4 h-4 text-white" />
          </button>
        </div>
      </main>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetails 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}

      {/* Footer (Simplified) */}
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-3 hidden md:block z-20">
        <div className="max-w-[1920px] mx-auto px-8 flex justify-between items-center text-xs text-gray-500">
          <div className="flex gap-4">
            <span>© 2024 Voyageur, Inc.</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span className="hover:underline cursor-pointer">Terms</span>
          </div>
          <div className="flex gap-4 font-medium text-gray-800">
             <span className="cursor-pointer">English (US)</span>
             <span className="cursor-pointer">€ EUR</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
