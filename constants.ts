import { Category, Property } from './types';

export const CATEGORIES = [
  { name: Category.Icons, icon: "Star" },
  { name: Category.Beachfront, icon: "Waves" },
  { name: Category.AmazingPools, icon: "Droplets" },
  { name: Category.Cabins, icon: "Tent" },
  { name: Category.Omg, icon: "Zap" },
  { name: Category.Camping, icon: "Trees" },
  { name: Category.TinyHomes, icon: "Home" },
  { name: Category.Lakefront, icon: "Fish" },
  { name: Category.Arctic, icon: "Snowflake" },
];

export const MOCK_PROPERTIES: Property[] = [
  // FRANCE
  {
    id: 'fr-1',
    title: "Eiffel Tower View Apartment",
    location: "Paris, France",
    distance: "7th Arrondissement",
    dates: "Nov 12 - 17",
    price: 350,
    rating: 4.98,
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
    ],
    category: Category.Icons,
    isGuestFavorite: true,
    amenities: ["Eiffel Tower View", "Haussmann Architecture", "Wine Cellar", "Concierge"]
  },
  {
    id: 'fr-2',
    title: "Château de Provence",
    location: "Gordes, France",
    distance: "Luberon Valley",
    dates: "Jun 10 - 17",
    price: 850,
    rating: 5.0,
    images: [
      "https://images.unsplash.com/photo-1595867865324-b146e27cb9e2?q=80&w=2070&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"
    ],
    category: Category.AmazingPools,
    amenities: ["Infinity Pool", "Lavender Fields", "Chef's Kitchen", "Tennis Court"]
  },
   {
    id: 'fr-3',
    title: "Alpine Chalet Mont-Blanc",
    location: "Chamonix, France",
    distance: "French Alps",
    dates: "Jan 5 - 12",
    price: 520,
    rating: 4.92,
    images: [
      "https://images.unsplash.com/photo-1517309230475-6736d91a7631?q=80&w=1978&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
    ],
    category: Category.Arctic,
    amenities: ["Ski-in/Ski-out", "Sauna", "Fireplace", "Mountain View"]
  },

  // UK
  {
    id: 'uk-1',
    title: "Historic Cotswolds Stone Cottage",
    location: "Bibury, UK",
    distance: "Gloucestershire",
    dates: "Sep 20 - 25",
    price: 220,
    rating: 4.89,
    images: [
      "https://images.unsplash.com/photo-1480074568708-e7b720bb9f92?q=80&w=2070&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop"
    ],
    category: Category.Cabins,
    isGuestFavorite: true,
    amenities: ["Garden", "Open Fire", "Village Views", "Pub Nearby"]
  },
  {
    id: 'uk-2',
    title: "Modern Shoreditch Loft",
    location: "London, UK",
    distance: "East London",
    dates: "Oct 5 - 10",
    price: 290,
    rating: 4.85,
    images: [
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=2070&auto=format&fit=crop"
    ],
    category: Category.Icons,
    amenities: ["Rooftop Terrace", "Espresso Machine", "Workspace", "Art Gallery"]
  },
  {
    id: 'uk-3',
    title: "Lochside Highland Estate",
    location: "Fort William, Scotland",
    distance: "Highlands",
    dates: "Aug 15 - 22",
    price: 450,
    rating: 4.95,
    images: [
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop"
    ],
    category: Category.Lakefront,
    amenities: ["Private Pier", "Fishing", "Whisky Tasting Room", "Hot Tub"]
  },

  // ROMANIA
  {
    id: 'ro-1',
    title: "Dracula's Retreat: Transylvanian Manor",
    location: "Bran, Romania",
    distance: "Near Bran Castle",
    dates: "Oct 28 - Nov 2",
    price: 180,
    rating: 4.96,
    images: [
      "https://images.unsplash.com/photo-1628625692344-0c58a36c934c?q=80&w=2073&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop"
    ],
    category: Category.Omg,
    amenities: ["Castle Views", "Gothic Decor", "Secret Passage", "Wine Cellar"]
  },
  {
    id: 'ro-2',
    title: "Bucharest Old Town Penthouse",
    location: "Bucharest, Romania",
    distance: "City Center",
    dates: "Dec 1 - 5",
    price: 110,
    rating: 4.82,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1620332372374-f108c5cb60cc?q=80&w=2070&auto=format&fit=crop"
    ],
    category: Category.Icons,
    amenities: ["Panoramic View", "Smart Home", "Walk to Clubs", "Jacuzzi"]
  },
  {
    id: 'ro-3',
    title: "Carpathian Wild Glamping",
    location: "Nucșoara, Romania",
    distance: "Fagaras Mountains",
    dates: "Jul 20 - 25",
    price: 140,
    rating: 4.99,
    images: [
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop"
    ],
    category: Category.Camping,
    amenities: ["Stargazing Dome", "Outdoor Firepit", "Hiking Guide", "Eco-friendly"]
  },
  {
    id: 'ro-4',
    title: "Traditional Clay Cottage",
    location: "Sibiu, Romania",
    distance: "Transylvania",
    dates: "May 10 - 15",
    price: 95,
    rating: 4.91,
    images: [
      "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=2069&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2070&auto=format&fit=crop"
    ],
    category: Category.TinyHomes,
    amenities: ["Organic Garden", "Pottery Workshop", "Homemade Breakfast", "Quiet Area"]
  }
];
