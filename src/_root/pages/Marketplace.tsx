import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Award, MapPin, Search, Filter, Truck, Heart, 
  Star, ChevronDown, ArrowUpRight, Coffee, Book, 
  Brain, Zap, Clock, Check
} from "lucide-react";

import { Button } from "@/components/ui";

// Define types
interface MarketplaceItem {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  seller: {
    name: string;
    rating: number;
    verified: boolean;
  };
  location: string;
  distance: string;
  delivery: boolean;
  pickup: boolean;
  favorite?: boolean;
  new?: boolean;
  trending?: boolean;
}

interface Category {
  id: number;
  name: string;
  icon: JSX.Element;
  count: number;
  color: string;
}

interface Coupon {
  id: number;
  brand: string;
  logo: string;
  discount: string;
  description: string;
  code: string;
  expiresIn: string;
  pointsCost: number;
  color: string;
  backgroundColor: string;
}

// Sample marketplace items
const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 1,
    name: "Noise-Cancelling Headphones",
    description: "Perfect for deep focus studying sessions with high-quality audio and comfortable design",
    price: 89.99,
    discount: 15,
    originalPrice: 105.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    category: "Tech Gadgets",
    rating: 4.7,
    reviewCount: 128,
    seller: {
      name: "TechWorldShop",
      rating: 4.8,
      verified: true
    },
    location: "Cambridge, MA",
    distance: "0.8 miles",
    delivery: true,
    pickup: true,
    trending: true
  },
  {
    id: 2,
    name: "Premium Coffee Beans (1lb)",
    description: "Ethically sourced, freshly roasted beans for the perfect study fuel",
    price: 19.99,
    discount: 10,
    originalPrice: 22.99,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    category: "Coffee & Snacks",
    rating: 4.9,
    reviewCount: 75,
    seller: {
      name: "Barista's Choice",
      rating: 4.9,
      verified: true
    },
    location: "Boston, MA",
    distance: "1.2 miles",
    delivery: true,
    pickup: true,
    new: true
  },
  {
    id: 3,
    name: "Ergonomic Desk Chair",
    description: "Support your back during long study sessions with this comfortable, adjustable chair",
    price: 249.99,
    discount: 20,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    category: "Study Supplies",
    rating: 4.5,
    reviewCount: 56,
    seller: {
      name: "Comfort Furniture",
      rating: 4.6,
      verified: true
    },
    location: "Brookline, MA",
    distance: "2.5 miles",
    delivery: true,
    pickup: false
  },
  {
    id: 4,
    name: "Smart Desk Lamp with Wireless Charging",
    description: "Adjustable brightness, color temperature, and built-in wireless charger",
    price: 45.99,
    discount: 0,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    category: "Tech Gadgets",
    rating: 4.6,
    reviewCount: 42,
    seller: {
      name: "Modern Essentials",
      rating: 4.5,
      verified: false
    },
    location: "Cambridge, MA",
    distance: "1.5 miles",
    delivery: true,
    pickup: true,
    new: true
  },
  {
    id: 5,
    name: "Digital Note-Taking Tablet",
    description: "Paper-like screen for digital notes with cloud sync and organization features",
    price: 329.99,
    discount: 10,
    originalPrice: 369.99,
    image: "https://images.unsplash.com/photo-1519219788971-8d9797e0928e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    category: "Tech Gadgets",
    rating: 4.8,
    reviewCount: 63,
    seller: {
      name: "Digital Study Tools",
      rating: 4.7,
      verified: true
    },
    location: "Boston, MA",
    distance: "3.1 miles",
    delivery: true,
    pickup: false,
    trending: true
  },
  {
    id: 6,
    name: "Productivity Planner Bundle",
    description: "Weekly planner, habit tracker, and goal-setting journal in one package",
    price: 34.99,
    discount: 5,
    originalPrice: 36.99,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    category: "Study Supplies",
    rating: 4.7,
    reviewCount: 89,
    seller: {
      name: "Organized Mind",
      rating: 4.8,
      verified: true
    },
    location: "Cambridge, MA",
    distance: "0.9 miles",
    delivery: true,
    pickup: true
  }
];

// Categories
const CATEGORIES: Category[] = [
  { id: 1, name: "Study Supplies", icon: <Book className="w-5 h-5" />, count: 42, color: "from-blue-500 to-indigo-500" },
  { id: 2, name: "Tech Gadgets", icon: <Zap className="w-5 h-5" />, count: 38, color: "from-green-500 to-emerald-500" },
  { id: 3, name: "Coffee & Snacks", icon: <Coffee className="w-5 h-5" />, count: 25, color: "from-amber-500 to-yellow-500" },
  { id: 4, name: "Productivity", icon: <Brain className="w-5 h-5" />, count: 31, color: "from-purple-500 to-pink-500" },
  { id: 5, name: "Local Services", icon: <MapPin className="w-5 h-5" />, count: 17, color: "from-red-500 to-orange-500" }
];

// Reward coupons
const REWARD_COUPONS: Coupon[] = [
  {
    id: 1,
    brand: "Spotify",
    logo: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png",
    discount: "50% OFF",
    description: "Premium Subscription (3 months)",
    code: "STUDY50",
    expiresIn: "30 days",
    pointsCost: 250,
    color: "green",
    backgroundColor: "from-green-500 to-emerald-400"
  },
  {
    id: 2,
    brand: "Coursera",
    logo: "https://infostride.com/wp-content/uploads/2024/06/Thumbnail_508fa1.png?w=1024",
    discount: "FREE",
    description: "Professional Certificate Course",
    code: "LEARN2023",
    expiresIn: "45 days",
    pointsCost: 500,
    color: "blue",
    backgroundColor: "from-blue-500 to-indigo-400"
  },
  {
    id: 3,
    brand: "Grubhub",
    logo: "https://i.ebayimg.com/images/g/yuEAAOSwnWth5vV-/s-l500.jpg",
    discount: "$15 OFF",
    description: "Food Delivery",
    code: "STUDY15",
    expiresIn: "14 days",
    pointsCost: 150,
    color: "red",
    backgroundColor: "from-red-500 to-orange-400"
  }
];

const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("Featured");
  const [userPoints] = useState<number>(750);
  const [range, setRange] = useState<number>(10);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const handleToggleFavorite = (itemId: number) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  const handleRedeemCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setShowCouponModal(true);
  };

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredItems = MARKETPLACE_ITEMS.filter(item => 
    (activeCategory === "All" || item.category === activeCategory) &&
    (searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (activeFilter === "Price: Low to High") return a.price - b.price;
    if (activeFilter === "Price: High to Low") return b.price - a.price;
    if (activeFilter === "Distance") return parseFloat(a.distance) - parseFloat(b.distance);
    if (activeFilter === "Rating") return b.rating - a.rating;
    // Default: Featured
    return (b.trending ? 2 : 0) + (b.new ? 1 : 0) - ((a.trending ? 2 : 0) + (a.new ? 1 : 0));
  });

  return (
    <div className="flex flex-col gap-10 py-8 px-5 md:px-8 lg:px-14">
      {/* Header with Points Display */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <h1 className="h1-bold text-light-1">Marketplace</h1>
            <p className="body-regular text-light-3 mt-2">
              Shop with study points, support local businesses, and find student discounts
            </p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center justify-center bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm p-4 rounded-xl border border-amber-500/20 min-w-[200px]"
          >
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              <span className="h2-bold text-light-1">{userPoints}</span>
            </div>
            <p className="small-regular text-light-3 mt-1">Your Reward Points</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 text-xs bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full border border-amber-500/30 font-medium"
            >
              View History
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Exclusive Coupons Section */}
      <section className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="h3-bold text-light-1">Exclusive Reward Coupons</h2>
          <Button 
            variant="ghost" 
            className="text-primary-500 flex items-center gap-1"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REWARD_COUPONS.map((coupon) => (
            <motion.div 
              key={coupon.id}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative overflow-hidden group"
            >
              <div className={`bg-gradient-to-r ${coupon.backgroundColor} p-5 rounded-xl shadow-lg`}>
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full"></div>
                <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-white/10 rounded-full"></div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-20 bg-white rounded flex items-center justify-center p-1">
                    <img 
                      src={coupon.logo} 
                      alt={coupon.brand} 
                      className="h-full object-contain" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{coupon.discount}</h4>
                    <p className="text-white/80 text-sm">{coupon.brand}</p>
                  </div>
                </div>
                
                <p className="text-white/90 text-sm mb-4">{coupon.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5">
                      <Award className="w-3 h-3 text-white" />
                      <span className="text-white text-xs font-medium">{coupon.pointsCost} points</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/70 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>Expires in {coupon.expiresIn}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    onClick={() => handleRedeemCoupon(coupon)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/90 text-sm font-semibold px-4 py-1.5 rounded-full text-gray-800 hover:bg-white"
                  >
                    Redeem
                  </motion.button>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search & Filters */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-3" />
            <input
              type="text"
              placeholder="Search products, categories, sellers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-3 rounded-lg border border-dark-4 pl-10 pr-4 py-3 text-light-1 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-dark-3 text-light-1 border-dark-4"
                onClick={() => {}}
              >
                <Filter className="w-4 h-4" />
                Filter
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-dark-3 text-light-1 border-dark-4"
                onClick={() => handleFilterChange("Featured")}
              >
                {activeFilter}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full">
        <h2 className="h3-bold text-light-1 mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`p-4 rounded-xl flex flex-col items-center gap-3 
              ${activeCategory === 'All' 
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/20' 
                : 'bg-dark-3 text-light-2 hover:bg-dark-4 border border-dark-4'}`}
            onClick={() => setActiveCategory('All')}
          >
            <div className={`p-3 rounded-full ${activeCategory === 'All' ? 'bg-white/20' : 'bg-dark-2'}`}>
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="text-center">
              <div className="font-medium">All Items</div>
              <div className="text-xs opacity-80">{MARKETPLACE_ITEMS.length} items</div>
            </div>
          </motion.button>
          
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`p-4 rounded-xl flex flex-col items-center gap-3 
                ${activeCategory === category.name 
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-${category.color.split(' ')[1]}/20` 
                  : 'bg-dark-3 text-light-2 hover:bg-dark-4 border border-dark-4'}`}
              onClick={() => setActiveCategory(category.name)}
            >
              <div className={`p-3 rounded-full ${activeCategory === category.name ? 'bg-white/20' : 'bg-dark-2'}`}>
                {category.icon}
              </div>
              <div className="text-center">
                <div className="font-medium">{category.name}</div>
                <div className="text-xs opacity-80">{category.count} items</div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Location Slider */}
      <section className="w-full bg-dark-3 p-4 rounded-xl border border-dark-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary-500" />
            <span className="text-light-1 font-medium">Items within {range} miles of Cambridge, MA</span>
          </div>
          
          <div className="w-full md:w-1/2 flex items-center gap-3">
            <span className="text-light-3 text-sm">1</span>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={range} 
              onChange={(e) => setRange(parseInt(e.target.value))}
              className="w-full accent-primary-500 cursor-pointer"
            />
            <span className="text-light-3 text-sm">50</span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="h3-bold text-light-1">
            {activeCategory === "All" ? "All Items" : activeCategory}
            <span className="text-light-3 text-base font-normal ml-2">({sortedItems.length} items)</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-dark-3 rounded-xl border border-dark-4 overflow-hidden hover:border-amber-500/50 transition-all"
            >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button 
                  onClick={() => handleToggleFavorite(item.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-dark-2/80 hover:bg-dark-2 transition-all"
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-light-3'}`} 
                  />
                </button>
                
                {(item.trending || item.new) && (
                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.trending && (
                      <div className="bg-amber-500 text-dark-1 text-xs font-bold px-2 py-1 rounded">
                        TRENDING
                      </div>
                    )}
                    {item.new && (
                      <div className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded">
                        NEW
                      </div>
                    )}
                  </div>
                )}
                
                {item.discount > 0 && (
                  <div className="absolute bottom-3 left-3 bg-green-500 text-white text-sm font-bold px-2 py-1 rounded">
                    {item.discount}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-light-1 text-lg">{item.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="text-light-2 text-sm">{item.rating}</span>
                  </div>
                </div>
                
                <p className="text-light-3 text-sm mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-end gap-1">
                    <span className="text-light-1 font-bold text-xl">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-light-3 text-sm line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-light-3" />
                    <span className="text-light-3 text-sm">{item.distance}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="text-xs bg-dark-4 text-light-2 px-2 py-1 rounded">
                    {item.category}
                  </div>
                  
                  {item.delivery && (
                    <div className="text-xs bg-dark-4 text-light-2 px-2 py-1 rounded flex items-center gap-1">
                      <Truck className="w-3 h-3" /> Delivery
                    </div>
                  )}
                  
                  {item.pickup && (
                    <div className="text-xs bg-dark-4 text-light-2 px-2 py-1 rounded flex items-center gap-1">
                      <Check className="w-3 h-3" /> Pickup
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-dark-1"
                  >
                    View Item
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="border-amber-500 text-amber-500 hover:bg-amber-500/10"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coupon Redemption Modal */}
      <AnimatePresence>
        {showCouponModal && selectedCoupon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCouponModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-dark-2 rounded-xl max-w-md w-full p-6 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="h3-bold text-light-1">Redeem Coupon</h3>
                  <p className="text-light-3 text-sm">Use your points to get this discount</p>
                </div>
                <button
                  className="text-light-3 hover:text-light-1"
                  onClick={() => setShowCouponModal(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className={`bg-gradient-to-r ${selectedCoupon.backgroundColor} p-5 rounded-xl mb-4`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-20 bg-white rounded flex items-center justify-center p-1">
                    <img 
                      src={selectedCoupon.logo} 
                      alt={selectedCoupon.brand} 
                      className="h-full object-contain" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{selectedCoupon.discount}</h4>
                    <p className="text-white/80 text-sm">{selectedCoupon.brand}</p>
                  </div>
                </div>
                
                <p className="text-white/90 text-sm mb-2">{selectedCoupon.description}</p>
                
                <div className="bg-white/20 p-2 rounded text-center mb-2">
                  <span className="text-white font-mono font-bold text-lg tracking-wider">{selectedCoupon.code}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>Expires in {selectedCoupon.expiresIn}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5">
                    <Award className="w-3 h-3 text-white" />
                    <span className="text-white text-xs font-medium">{selectedCoupon.pointsCost} points</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-dark-3 rounded-lg mb-4">
                <Award className="w-5 h-5 text-amber-500" />
                <div className="flex-1">
                  <p className="text-light-1">Your current balance</p>
                  <p className="text-light-3 text-sm">After redemption: {userPoints - selectedCoupon.pointsCost} points</p>
                </div>
                <span className="text-xl font-bold text-light-1">{userPoints}</span>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  className="flex-1 border-dark-4 text-light-2 hover:bg-dark-3"
                  onClick={() => setShowCouponModal(false)}
                >
                  Cancel
                </Button>
                
                <Button 
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-dark-1"
                  onClick={() => {
                    alert(`Coupon ${selectedCoupon.code} redeemed successfully!`);
                    setShowCouponModal(false);
                  }}
                >
                  Redeem for {selectedCoupon.pointsCost} points
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace; 