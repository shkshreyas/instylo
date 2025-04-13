import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Activity, Sparkles, Shield, Book, Globe, 
  Coffee, Code, Camera, Search, Users, Plus,
  ChevronRight, Star,
  MapPin, Bookmark, Check, X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui";
import { Loader } from "@/components/shared";

// Define community categories
const COMMUNITY_CATEGORIES = [
  { 
    id: "health", 
    name: "Health & Wellness",
    description: "Communities focused on physical and mental wellbeing",
    icon: <Activity className="w-6 h-6" />,
    color: "from-green-500 to-emerald-400",
    count: 124
  },
  { 
    id: "recovery", 
    name: "Recovery & Support",
    description: "Supportive spaces for those overcoming challenges",
    icon: <Heart className="w-6 h-6" />,
    color: "from-red-500 to-orange-400",
    count: 87
  },
  { 
    id: "spirituality", 
    name: "Spirituality & Mindfulness",
    description: "Communities for spiritual growth and mindful living",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-400",
    count: 56
  },
  { 
    id: "parenting", 
    name: "Parenting & Family",
    description: "Support networks for parents and families",
    icon: <Shield className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-400",
    count: 73
  },
  { 
    id: "education", 
    name: "Education & Skills",
    description: "Learning communities for knowledge and skills",
    icon: <Book className="w-6 h-6" />,
    color: "from-amber-500 to-yellow-400",
    count: 102
  },
  { 
    id: "creativity", 
    name: "Creativity & Arts",
    description: "Express yourself through creative pursuits",
    icon: <Camera className="w-6 h-6" />,
    color: "from-pink-500 to-rose-400",
    count: 84
  },
  { 
    id: "tech", 
    name: "Technology & Digital",
    description: "Communities for tech enthusiasts and digital creators",
    icon: <Code className="w-6 h-6" />,
    color: "from-slate-500 to-zinc-400",
    count: 93
  },
  { 
    id: "hobbies", 
    name: "Hobbies & Interest",
    description: "Connect with people who share your passions",
    icon: <Coffee className="w-6 h-6" />,
    color: "from-brown-500 to-amber-400",
    count: 115
  },
];

// Featured communities
const FEATURED_COMMUNITIES = [
  {
    id: 1,
    name: "Mindful Meditation",
    category: "spirituality",
    description: "Daily meditation practices and mindfulness discussions",
    members: 8742,
    posts: 3452,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=300&h=200&auto=format&fit=crop",
    isVerified: true
  },
  {
    id: 2,
    name: "Tech for Good",
    category: "tech",
    description: "Using technology to create positive social impact",
    members: 6214,
    posts: 2871,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=300&h=200&auto=format&fit=crop",
    isVerified: true
  },
  {
    id: 3,
    name: "Addiction Recovery",
    category: "recovery",
    description: "Support for those recovering from addiction",
    members: 15278,
    posts: 28434,
    image: "https://images.unsplash.com/photo-1573495804683-641191e042ea?q=80&w=300&h=200&auto=format&fit=crop",
    isVerified: true
  },
  {
    id: 4,
    name: "Fitness Journey",
    category: "health",
    description: "Supporting each other on our fitness journeys",
    members: 24683,
    posts: 19824,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=300&h=200&auto=format&fit=crop",
    isVerified: false
  },
];

// Recent community activity
const RECENT_ACTIVITY = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    community: "Mindful Meditation",
    action: "started a discussion",
    title: "Morning meditation routine suggestions?",
    time: "1 hour ago",
    likes: 24,
    comments: 8
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    community: "Tech for Good",
    action: "shared a resource",
    title: "Free AI courses for nonprofit workers",
    time: "3 hours ago",
    likes: 42,
    comments: 14
  },
  {
    id: 3,
    user: {
      name: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    community: "Addiction Recovery",
    action: "posted a milestone",
    title: "One year sober today! Thank you everyone for the support",
    time: "5 hours ago",
    likes: 128,
    comments: 47
  },
];

const Communities = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeCommunities, setActiveCommunities] = useState(FEATURED_COMMUNITIES);
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([]);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<any>(null);

  useEffect(() => {
    // Filter communities by search query and category
    const filtered = FEATURED_COMMUNITIES.filter(community => {
      const matchesSearch = searchQuery === "" || 
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesCategory = selectedCategory === null || 
        community.category === selectedCategory;
        
      return matchesSearch && matchesCategory;
    });
    
    setActiveCommunities(filtered);
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === categoryId ? null : categoryId
    );
  };
  
  const handleCreateCommunity = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/communities/create");
    }, 800);
  };

  const handleJoinCommunity = (community: any, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    setSelectedCommunity(community);
    setShowJoinModal(true);
  };
  
  const confirmJoin = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setJoinedCommunities(prev => {
        if (prev.includes(selectedCommunity.id)) {
          return prev.filter(id => id !== selectedCommunity.id);
        } else {
          return [...prev, selectedCommunity.id];
        }
      });
      setIsLoading(false);
      setShowJoinModal(false);
    }, 800);
  };

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex flex-col items-start w-full max-w-7xl">
          {/* Header */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h1 className="h2-bold text-light-1">Communities</h1>
              </div>
              <p className="text-light-3 mt-1 max-w-xl">
                Connect with like-minded people in supportive communities focused on shared interests, goals, and experiences.
              </p>
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-3 w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Search communities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-dark-3 border border-dark-4 text-light-1 rounded-lg pl-10 pr-4 py-2 w-full lg:w-60 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
              
              <Button 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 gap-2"
                onClick={handleCreateCommunity}
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Community
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Category Navigation */}
          <div className="w-full mb-8">
            <h2 className="h4-medium text-light-1 mb-4">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {COMMUNITY_CATEGORIES.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`bg-gradient-to-r ${category.color} p-4 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all
                    ${selectedCategory === category.id ? 'ring-2 ring-white' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{category.name}</h3>
                      <div className="flex items-center text-white/70 text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {category.count} communities
                      </div>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mt-2 line-clamp-2">{category.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Featured Communities */}
          <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="h4-medium text-light-1">Featured Communities</h2>
              <Button variant="ghost" className="text-light-2 gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {activeCommunities.length > 0 ? (
                activeCommunities.map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-dark-3 rounded-xl overflow-hidden border border-dark-4 hover:border-primary-500 transition-all"
                  >
                    <div className="relative h-32 w-full overflow-hidden">
                      <img 
                        src={community.image} 
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                      {community.isVerified && (
                        <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Verified
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-light-1 mb-1">{community.name}</h3>
                      <p className="text-light-3 text-sm line-clamp-2 h-10">{community.description}</p>
                      <div className="flex justify-between mt-3">
                        <div className="text-xs text-light-2">
                          <span className="text-primary-500 font-medium">{community.members.toLocaleString()}</span> members
                        </div>
                        <div className="text-xs text-light-2">
                          <span className="text-secondary-500 font-medium">{community.posts.toLocaleString()}</span> posts
                        </div>
                      </div>
                      <Button 
                        className={`w-full mt-3 bg-dark-4 hover:bg-dark-4/80 text-light-1 ${
                          joinedCommunities.includes(community.id) 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-primary-500 hover:bg-primary-600'}`}
                        onClick={(e) => handleJoinCommunity(community, e)}
                      >
                        {joinedCommunities.includes(community.id) ? (
                          <>
                            <Check className="w-3 h-3" />
                            Joined
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            Join
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-10 bg-dark-3 rounded-xl">
                  <Search className="w-10 h-10 text-light-3 mb-2" />
                  <p className="text-light-1 font-medium">No matching communities found</p>
                  <p className="text-light-3 text-sm">Try different search terms or categories</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="w-full mb-8">
            <h2 className="h4-medium text-light-1 mb-4">Community Activity</h2>
            <div className="space-y-4">
              {RECENT_ACTIVITY.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-dark-3 rounded-xl p-4 border border-dark-4 hover:border-primary-500 transition-all"
                >
                  <div className="flex gap-3">
                    <img 
                      src={activity.user.avatar} 
                      alt={activity.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-light-2">
                        <span className="text-primary-500 font-medium">{activity.user.name}</span>
                        {' '}{activity.action} in{' '}
                        <span className="text-secondary-500 font-medium">{activity.community}</span>
                      </p>
                      <p className="text-light-1 font-medium mt-1">{activity.title}</p>
                      <div className="flex justify-between mt-2">
                        <div className="text-xs text-light-3">{activity.time}</div>
                        <div className="flex gap-3 text-xs text-light-3">
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" /> {activity.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> {activity.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Join Community Modal */}
      <AnimatePresence>
        {showJoinModal && selectedCommunity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowJoinModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-dark-2 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-40 relative overflow-hidden">
                <img 
                  src={selectedCommunity.image} 
                  alt={selectedCommunity.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-2 to-transparent"></div>
                <button 
                  className="absolute top-3 right-3 p-1.5 bg-dark-1/80 rounded-full text-light-3 hover:text-light-1"
                  onClick={() => setShowJoinModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="h3-bold text-light-1">{selectedCommunity.name}</h3>
                    <p className="text-light-3 text-sm">{selectedCommunity.category}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-light-1 font-medium">{selectedCommunity.rating}</span>
                  </div>
                </div>
                
                <p className="text-light-2 mb-6">{selectedCommunity.description}</p>
                
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-dark-3 rounded-lg p-3 text-center">
                    <span className="text-2xl font-bold text-light-1">{selectedCommunity.members.toLocaleString()}</span>
                    <p className="text-xs text-light-3 mt-1">Members</p>
                  </div>
                  <div className="bg-dark-3 rounded-lg p-3 text-center">
                    <span className="text-2xl font-bold text-light-1">
                      {Math.floor(selectedCommunity.members * 0.42).toLocaleString()}
                    </span>
                    <p className="text-xs text-light-3 mt-1">Active Users</p>
                  </div>
                  <div className="bg-dark-3 rounded-lg p-3 text-center">
                    <span className="text-2xl font-bold text-light-1">
                      {Math.floor(selectedCommunity.members * 0.28).toLocaleString()}
                    </span>
                    <p className="text-xs text-light-3 mt-1">Events/month</p>
                  </div>
                </div>
                
                <h4 className="font-bold text-light-1 mb-2">Available Locations</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCommunity.locations.map((location: string, i: number) => (
                    <div key={i} className="flex items-center gap-1 bg-dark-3 py-1 px-2 rounded-md text-sm">
                      <MapPin className="w-3 h-3 text-primary-500" />
                      <span className="text-light-2">{location}</span>
                    </div>
                  ))}
                </div>
                
                <h4 className="font-bold text-light-1 mb-2">Topics</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCommunity.tags.map((tag: string, i: number) => (
                    <span 
                      key={i} 
                      className="text-sm py-1 px-3 bg-dark-4 text-light-2 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center gap-3 mt-4">
                  <Button 
                    className="flex-1 bg-dark-4 text-light-1 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-dark-4/80"
                    onClick={() => setShowJoinModal(false)}
                  >
                    <Bookmark className="w-4 h-4" />
                    Save for Later
                  </Button>
                  <Button 
                    className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 ${
                      joinedCommunities.includes(selectedCommunity.id) 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-primary-500 hover:bg-primary-600 text-white'}`}
                    onClick={confirmJoin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader />
                    ) : joinedCommunities.includes(selectedCommunity.id) ? (
                      <>
                        <Check className="w-4 h-4" />
                        Joined
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4" />
                        Join Community
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Communities; 