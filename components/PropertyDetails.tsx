import React, { useEffect, useState, useMemo } from 'react';
import { Property } from '../types';
import { X, Star, MapPin, ShieldCheck, User, Sparkles, ChevronLeft, ChevronRight, AlertCircle, Heart, Share } from 'lucide-react';
import { generatePropertyDescription } from '../services/geminiService';
import { ChatWidget } from './ChatWidget';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onClose }) => {
  const [description, setDescription] = useState<string>(property.description || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Date selection state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [viewDate, setViewDate] = useState(new Date()); // Controls the calendar view
  const [error, setError] = useState('');
  
  // Wishlist state
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Helpers for calendar
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = formatDate(new Date());

  const handleDateSelect = (dateStr: string) => {
    setError(''); // Clear error on interaction

    if (dateStr < todayStr) {
        setError("Cannot select dates in the past.");
        return;
    }

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut('');
    } else {
      if (dateStr < checkIn) {
        setCheckIn(dateStr);
        setCheckOut(checkIn); // Swap if clicked earlier date
      } else if (dateStr === checkIn) {
        setCheckIn(''); // Deselect
      } else {
        setCheckOut(dateStr);
      }
    }
  };

  const handleReserve = () => {
    if (!checkIn) {
        setError("Please select a check-in date.");
        return;
    }
    if (!checkOut) {
        setError("Please select a check-out date.");
        return;
    }

    if (checkIn < todayStr) {
        setError("Dates cannot be in the past.");
        return;
    }

    if (checkOut <= checkIn) {
        setError("Check-out date must be after check-in date.");
        return;
    }

    // Validation passed
    setError('');
    alert(`Reservation initiated for ${property.title}\nDates: ${checkIn} to ${checkOut}`);
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
    const today = new Date();
    // Don't go back past current month
    if (offset < 0 && newDate.getMonth() < today.getMonth() && newDate.getFullYear() === today.getFullYear()) return;
    if (newDate < new Date(today.getFullYear(), today.getMonth(), 1)) return;
    
    setViewDate(newDate);
  };

  // Price calculation
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    if (end <= start) return 0;

    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days;
  }, [checkIn, checkOut]);

  const cleaningFee = 45;
  const serviceFeeRate = 0.14;
  
  const basePrice = property.price * nights;
  const serviceFee = Math.round(basePrice * serviceFeeRate);
  const totalPrice = basePrice + cleaningFee + serviceFee;

  useEffect(() => {
    let isMounted = true;
    const fetchDescription = async () => {
      if (!property.description && !description) {
        setIsGenerating(true);
        const text = await generatePropertyDescription(property.title, property.location, property.amenities);
        if (isMounted) {
            setDescription(text);
            setIsGenerating(false);
        }
      }
    };
    fetchDescription();
    return () => { isMounted = false; };
  }, [property, description]);

  const renderCalendarMonth = (offset: number) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth() + offset;
    const date = new Date(year, month, 1);
    const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = date.getDay(); // 0 = Sunday

    const days = [];
    // Empty slots for start of week
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const current = new Date(year, month, d);
      const dateStr = formatDate(current);
      const isPast = dateStr < todayStr;
      const isSelected = dateStr === checkIn || dateStr === checkOut;
      const isRange = checkIn && checkOut && dateStr > checkIn && dateStr < checkOut;
      const isCheckIn = dateStr === checkIn;
      const isCheckOut = dateStr === checkOut;

      let buttonClass = "w-full aspect-square flex items-center justify-center text-sm font-medium rounded-full transition relative z-10 ";
      
      if (isPast) {
        buttonClass += "text-gray-300 cursor-not-allowed decoration-slice";
      } else if (isSelected) {
        buttonClass += "bg-black text-white hover:bg-black";
      } else if (isRange) {
        buttonClass += "bg-gray-100 text-black hover:bg-gray-200 rounded-none";
      } else {
        buttonClass += "text-gray-700 hover:border hover:border-black hover:bg-gray-50";
      }

      // Range styling connectors
      const isRangeStart = isCheckIn && checkOut;
      const isRangeEnd = isCheckOut && checkIn;

      days.push(
        <div key={dateStr} className="relative w-full aspect-square p-0.5">
            {isRange && <div className="absolute inset-0 bg-gray-100" />}
            {isRangeStart && <div className="absolute top-1/2 bottom-1/2 right-0 left-1/2 -translate-y-1/2 w-1/2 h-full bg-gray-100" />}
            {isRangeEnd && <div className="absolute top-1/2 bottom-1/2 left-0 right-1/2 -translate-y-1/2 w-1/2 h-full bg-gray-100" />}
            
            <button
                onClick={() => !isPast && handleDateSelect(dateStr)}
                disabled={isPast}
                className={buttonClass}
            >
                {d}
            </button>
        </div>
      );
    }

    return (
      <div className="select-none">
        <h3 className="text-center font-medium mb-4 text-gray-800">{monthName}</h3>
        <div className="grid grid-cols-7 gap-y-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-xs text-gray-400 font-medium">{day}</div>
            ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white animate-in slide-in-from-bottom-10 duration-300">
      {/* Header Actions */}
      <div className="sticky top-0 z-10 flex justify-between items-center px-4 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 text-sm font-medium underline hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                <Share className="w-4 h-4" />
                Share
             </button>
             <button className="flex items-center gap-2 text-sm font-medium underline hover:bg-gray-100 px-3 py-2 rounded-lg transition">
                <Heart className="w-4 h-4" />
                Save
             </button>
             <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="flex items-center gap-2 text-sm font-medium underline hover:bg-gray-100 px-3 py-2 rounded-lg transition"
             >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500 border-rose-500' : ''}`} />
                {isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
             </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 pb-32">
        {/* Title Block */}
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-2">{property.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-800 mb-6">
            <span className="flex items-center gap-1 font-medium"><Star className="w-4 h-4 fill-current" /> {property.rating}</span>
            <span className="text-gray-400">•</span>
            <span className="underline font-medium">{property.location}</span>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden mb-8">
            <div className="md:col-span-2 md:row-span-2 h-full">
                <img src={property.images[0]} className="w-full h-full object-cover hover:opacity-95 transition" alt="Main" />
            </div>
            <div className="hidden md:block h-full">
                <img src={property.images[1] || property.images[0]} className="w-full h-full object-cover hover:opacity-95 transition" alt="2" />
            </div>
            <div className="hidden md:block h-full">
                <img src={property.images[0]} className="w-full h-full object-cover hover:opacity-95 transition" alt="3" />
            </div>
             <div className="hidden md:block h-full">
                <img src={property.images[1] || property.images[0]} className="w-full h-full object-cover hover:opacity-95 transition" alt="4" />
            </div>
            <div className="hidden md:block h-full relative">
                <img src={property.images[0]} className="w-full h-full object-cover hover:opacity-95 transition" alt="5" />
                <button className="absolute bottom-4 right-4 bg-white px-3 py-1 text-sm font-medium rounded-md shadow-sm border border-gray-200">
                    Show all photos
                </button>
            </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left Column: Details */}
            <div className="md:col-span-2 space-y-8">
                <div className="flex justify-between items-center py-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-medium">Entire home hosted by Voyageur</h2>
                        <p className="text-gray-500 text-sm mt-1">4 guests • 2 bedrooms • 2 beds • 2 baths</p>
                    </div>
                    <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                    </div>
                </div>

                {/* Highlights */}
                <div className="space-y-4 py-2 border-b border-gray-100 pb-6">
                    <div className="flex gap-4 items-start">
                        <ShieldCheck className="w-6 h-6 text-gray-600 mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-900">Secure booking</h3>
                            <p className="text-sm text-gray-500">Your payments are protected by Voyageur Secure.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <MapPin className="w-6 h-6 text-gray-600 mt-1" />
                        <div>
                            <h3 className="font-medium text-gray-900">Great location</h3>
                            <p className="text-sm text-gray-500">100% of recent guests gave the location a 5-star rating.</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="py-2 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                         <h2 className="text-xl font-medium">About this place</h2>
                         {isGenerating && <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1"><Sparkles className="w-3 h-3"/> AI Generating...</span>}
                    </div>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {isGenerating ? (
                            <div className="space-y-2 animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        ) : description}
                    </div>
                </div>

                {/* Amenities */}
                 <div className="py-4 border-b border-gray-100 pb-8">
                    <h2 className="text-xl font-medium mb-4">What this place offers</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {property.amenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-gray-700">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                <span>{amenity}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Calendar Section */}
                <div id="calendar-section" className="py-4">
                   <h2 className="text-xl font-medium mb-1">Select check-in date</h2>
                   <p className="text-gray-500 text-sm mb-6">Add your travel dates for exact pricing</p>
                   
                   <div className="bg-gray-50 p-6 rounded-2xl">
                      <div className="flex justify-between items-center mb-4">
                         <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-200 rounded-full">
                            <ChevronLeft className="w-4 h-4" />
                         </button>
                         <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-200 rounded-full">
                            <ChevronRight className="w-4 h-4" />
                         </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          {renderCalendarMonth(0)}
                          <div className="hidden md:block">
                             {renderCalendarMonth(1)}
                          </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                          <button onClick={() => {setCheckIn(''); setCheckOut('')}} className="text-sm font-semibold underline text-gray-900 hover:text-gray-600">
                             Clear dates
                          </button>
                      </div>
                   </div>
                </div>
            </div>

            {/* Right Column: Sticky Reservation Card */}
            <div className="relative">
                <div className="sticky top-32 border border-gray-200 shadow-xl rounded-2xl p-6 bg-white">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <span className="text-2xl font-bold">€{property.price}</span> 
                            <span className="text-gray-500"> night</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                             <Star className="w-4 h-4 fill-black" />
                             <span className="font-semibold">{property.rating}</span>
                        </div>
                    </div>

                    <div className="border border-gray-300 rounded-lg mb-4">
                        <div className="grid grid-cols-2 border-b border-gray-300">
                            <div className="p-3 border-r border-gray-300 cursor-pointer hover:bg-gray-50 transition" onClick={() => document.getElementById('calendar-section')?.scrollIntoView({behavior: 'smooth'})}>
                                <label className="block text-[10px] font-bold uppercase text-gray-700">Check-in</label>
                                <div className={`text-sm mt-0.5 ${checkIn ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {checkIn || 'Select date'}
                                </div>
                            </div>
                            <div className="p-3 cursor-pointer hover:bg-gray-50 transition" onClick={() => document.getElementById('calendar-section')?.scrollIntoView({behavior: 'smooth'})}>
                                <label className="block text-[10px] font-bold uppercase text-gray-700">Checkout</label>
                                <div className={`text-sm mt-0.5 ${checkOut ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {checkOut || 'Select date'}
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                             <div className="text-[10px] font-bold uppercase text-gray-700">Guests</div>
                            <div className="text-sm">1 guest</div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-red-600 text-sm animate-in fade-in slide-in-from-top-1">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <span className="font-medium">{error}</span>
                        </div>
                    )}

                    <button 
                        onClick={handleReserve}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-lg transition mb-4"
                    >
                        Reserve
                    </button>
                    
                    <p className="text-center text-sm text-gray-500 mb-4">You won't be charged yet</p>

                    {nights > 0 ? (
                        <>
                            <div className="flex justify-between text-gray-600 py-1">
                                <span className="underline">€{property.price} x {nights} nights</span>
                                <span>€{basePrice}</span>
                            </div>
                             <div className="flex justify-between text-gray-600 py-1">
                                <span className="underline">Cleaning fee</span>
                                <span>€{cleaningFee}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 py-1 border-b border-gray-100 pb-4">
                                <span className="underline">Service fee</span>
                                <span>€{serviceFee}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg pt-4 text-gray-900">
                                <span>Total before taxes</span>
                                <span>€{totalPrice}</span>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-gray-400 text-sm pb-2 italic">
                            Select dates to see total
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
      
      {/* Floating AI Concierge Trigger */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-[55] bg-black text-white px-5 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-emerald-400" />
        Ask AI Concierge
      </button>

      <ChatWidget 
        location={property.location} 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};