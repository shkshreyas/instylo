import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Book, Clock, Brain, 
  BookOpen, ChevronRight, ChevronLeft, Award,
  Users, Shield, Sparkles, Globe, Heart, Activity,
  Gift, BadgeHelp, ShoppingBag, MapPin, Tag, 
  Compass, Truck, TrendingUp, Zap, Coffee,
  Newspaper, RefreshCw, Search, ExternalLink,
  Bookmark, Gamepad
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";

// Define the subjects available for study
const SUBJECTS = [
  { id: 1, name: "Mathematics", icon: "🧮", progress: 65 },
  { id: 2, name: "Computer Science", icon: "💻", progress: 80 },
  { id: 3, name: "Physics", icon: "⚛️", progress: 35 },
  { id: 4, name: "Chemistry", icon: "🧪", progress: 20 },
];

// Define the AI study buddies
const AI_BUDDIES = [
  { id: 1, name: "Alex", avatar: "https://xsgames.co/randomusers/assets/avatars/male/45.jpg", subject: "Mathematics", rating: 4.8 },
  { id: 2, name: "Morgan", avatar: "https://xsgames.co/randomusers/assets/avatars/female/32.jpg", subject: "Computer Science", rating: 4.9 },
];

// Define real user study buddies with fake profile photos
const USER_BUDDIES = [
  { 
    id: 3, 
    name: "Sophia Kim", 
    avatar: "https://randomuser.me/api/portraits/women/44.jpg", 
    subject: "Biology", 
    rating: 4.7,
    online: true 
  },
  { 
    id: 4, 
    name: "Marcus Chen", 
    avatar: "https://randomuser.me/api/portraits/men/32.jpg", 
    subject: "Physics", 
    rating: 4.6,
    online: false
  },
];

// Define upcoming study sessions
const UPCOMING_SESSIONS = [
  { 
    id: 1, 
    title: "Calculus Review", 
    time: "Today, 3:00 PM", 
    buddy: "Alex",
    subject: "Mathematics"
  },
  { 
    id: 2, 
    title: "Python Workshop", 
    time: "Tomorrow, 5:00 PM", 
    buddy: "Morgan",
    subject: "Computer Science"
  }
];

// Define popular communities
const POPULAR_COMMUNITIES = [
  { id: 1, name: "Addiction Recovery", icon: <Heart className="w-4 h-4" />, members: 15874, color: "from-red-500 to-orange-400" },
  { id: 2, name: "Fitness & Wellness", icon: <Activity className="w-4 h-4" />, members: 24692, color: "from-green-500 to-emerald-400" },
  { id: 3, name: "Spirituality", icon: <Sparkles className="w-4 h-4" />, members: 9328, color: "from-purple-500 to-indigo-400" },
  { id: 4, name: "Parenting", icon: <Shield className="w-4 h-4" />, members: 12483, color: "from-blue-500 to-cyan-400" },
];

// Define service opportunities
const SERVICE_OPPORTUNITIES = [
  { id: 1, name: "Tutoring", icon: <Book className="w-4 h-4" />, rewards: 150, color: "from-blue-500 to-cyan-400" },
  { id: 2, name: "Food Donation", icon: <Gift className="w-4 h-4" />, rewards: 50, color: "from-green-500 to-emerald-400" },
  { id: 3, name: "Tech Support", icon: <BadgeHelp className="w-4 h-4" />, rewards: 300, color: "from-purple-500 to-indigo-400" },
  { id: 4, name: "Gardening", icon: <Heart className="w-4 h-4" />, rewards: 100, color: "from-amber-500 to-yellow-400" },
];

// Define marketplace items
const MARKETPLACE_ITEMS = [
  { 
    id: 1, 
    name: "Wireless Noise-Cancelling Headphones", 
    price: 89.99, 
    discount: 15, 
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80", 
    seller: "TechWorldShop", 
    distance: "0.8 mi",
    rating: 4.7
  },
  { 
    id: 2, 
    name: "Premium Coffee Beans (1lb)", 
    price: 19.99, 
    discount: 10, 
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80", 
    seller: "Barista's Choice", 
    distance: "1.2 mi",
    rating: 4.9
  },
  { 
    id: 3, 
    name: "Ergonomic Desk Chair", 
    price: 249.99, 
    discount: 20, 
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80", 
    seller: "Comfort Furniture", 
    distance: "2.5 mi",
    rating: 4.5
  },
];

// Define reward coupons
const REWARD_COUPONS = [
  { 
    id: 1, 
    brand: "Spotify", 
    discount: "50% OFF", 
    description: "Premium Subscription (3 months)", 
    pointsCost: 250, 
    color: "from-green-500 to-emerald-400",
    logo: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png"
  },
  { 
    id: 2, 
    brand: "Coursera", 
    discount: "FREE", 
    description: "Professional Certificate Course", 
    pointsCost: 500, 
    color: "from-blue-500 to-indigo-400",
    logo: "https://infostride.com/wp-content/uploads/2024/06/Thumbnail_508fa1.png?w=1024"
  },
  { 
    id: 3, 
    brand: "Grubhub", 
    discount: "$15 OFF", 
    description: "Food Delivery", 
    pointsCost: 150, 
    color: "from-red-500 to-orange-400",
    logo: "https://i.ebayimg.com/images/g/yuEAAOSwnWth5vV-/s-l500.jpg"
  },
];

interface StudyBuddySidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  onOpenRightSidebar?: () => void;
}

const StudyBuddySidebar = ({ 
  isCollapsed = false, 
  onToggle,
  onOpenRightSidebar 
}: StudyBuddySidebarProps) => {
  const navigate = useNavigate();
  const [showSessions, setShowSessions] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"study" | "communities" | "services" | "marketplace" | "news" | "games">("study");
  const [newsCategory, setNewsCategory] = useState<string>("technology");
  const [newsLoading, setNewsLoading] = useState<boolean>(false);

  // Mock news data for the sidebar preview
  const [newsItems] = useState([
    {
      id: 1,
      title: "Artificial Intelligence Breakthrough: New Model Outperforms Humans",
      source: "TechCrunch",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Study Finds Regular Exercise Improves Memory and Cognitive Function",
      source: "Science Daily",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      time: "5 hours ago"
    },
    {
      id: 3,
      title: "Global Climate Summit Reaches Historic Agreement on Emissions",
      source: "Environment News",
      image: "https://media.npr.org/assets/img/2021/11/13/gettyimages-1236538614_custom-e44f698c99e5b27f3513b65c4f43bce4afda42be.jpg?s=1200&c=85&f=webp",
      time: "Yesterday"
    }
  ]);

  // Handle navigation to study buddy page
  const goToStudyBuddy = () => {
    navigate("/study-buddy");
  };

  // Handle navigation to communities page
  const goToCommunities = () => {
    navigate("/communities");
    setActiveTab("communities");
  };

  // Handle navigation to services page
  const goToServices = () => {
    navigate("/services");
    setActiveTab("services");
  };
  
  // Handle navigation to marketplace page
  const goToMarketplace = () => {
    navigate("/marketplace");
    setActiveTab("marketplace");
  };

  // Handle navigation to news page
  const goToNews = () => {
    navigate("/news");
    setActiveTab("news");
  };

  // Handle navigation to games page
  const goToGames = () => {
    navigate("/games");
    setActiveTab("games");
  };

  // Handle navigation to a specific study session
  const goToSession = (sessionId: number) => {
    navigate(`/study-session/${sessionId}`);
  };

  // Simulate refreshing news
  const refreshNews = () => {
    setNewsLoading(true);
    // In a real implementation, this would fetch from NewsAPI
    setTimeout(() => {
      setNewsLoading(false);
    }, 1000);
  };

  // Change news category
  const changeNewsCategory = (category: string) => {
    setNewsCategory(category);
    setNewsLoading(true);
    // In a real implementation, this would fetch from NewsAPI with the new category
    setTimeout(() => {
      setNewsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={onToggle}
        initial={false}
        animate={{
          right: isCollapsed ? "1rem" : "320px",
          rotate: isCollapsed ? 0 : 180,
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        className={`fixed top-32 z-50 p-3 rounded-full 
          bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/20
          transition-all duration-300 hidden lg:flex`}
        whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(94, 53, 177, 0.5)" }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ 
            scale: isCollapsed ? [1, 1.1, 1] : 1,
          }}
          transition={{ 
            duration: 2,
            repeat: isCollapsed ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          <ChevronLeft
            className="w-6 h-6 text-light-1"
          />
        </motion.div>
      </motion.button>

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? "0px" : "320px",
          opacity: isCollapsed ? 0 : 1,
          x: isCollapsed ? "100%" : 0,
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        className="fixed right-0 top-0 h-screen bg-dark-2 border-l border-dark-4 
          overflow-hidden z-40 hidden lg:block"
        onAnimationComplete={() => {
          // When right sidebar opens, signal to close left sidebar
          if (!isCollapsed && onOpenRightSidebar) {
            onOpenRightSidebar();
          }
        }}
      >
        <div className="flex flex-col h-full p-6 w-[320px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {activeTab === "study" ? (
                <BookOpen className="w-6 h-6 text-primary-500" />
              ) : activeTab === "communities" ? (
                <Globe className="w-6 h-6 text-primary-500" />
              ) : activeTab === "marketplace" ? (
                <ShoppingBag className="w-6 h-6 text-primary-500" />
              ) : activeTab === "news" ? (
                <Newspaper className="w-6 h-6 text-primary-500" />
              ) : activeTab === "games" ? (
                <Gamepad className="w-6 h-6 text-primary-500" />
              ) : (
                <Gift className="w-6 h-6 text-primary-500" />
              )}
              <h2 className="h3-bold text-light-1">
                {activeTab === "study" ? "Study Hub" : 
                 activeTab === "communities" ? "Communities" : 
                 activeTab === "marketplace" ? "Marketplace" : 
                 activeTab === "news" ? "Latest News" : 
                 activeTab === "games" ? "Play Games" : "Services"}
              </h2>
            </div>
            <Button 
              variant="ghost" 
              className="hover:bg-primary-500/20"
              onClick={
                activeTab === "study" ? goToStudyBuddy : 
                activeTab === "communities" ? goToCommunities : 
                activeTab === "marketplace" ? goToMarketplace : 
                activeTab === "news" ? goToNews : 
                activeTab === "games" ? goToGames : goToServices
              }
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Tab Buttons - 3x2 Grid */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                activeTab === "study" 
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                  : "bg-dark-3 text-light-2 hover:bg-dark-4"
              }`}
              onClick={() => setActiveTab("study")}
            >
              <Book className="w-4 h-4" />
              <span className="text-xs font-medium">Study</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                activeTab === "communities" 
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                  : "bg-dark-3 text-light-2 hover:bg-dark-4"
              }`}
              onClick={() => setActiveTab("communities")}
            >
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Community</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                activeTab === "services" 
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                  : "bg-dark-3 text-light-2 hover:bg-dark-4"
              }`}
              onClick={() => setActiveTab("services")}
            >
              <Gift className="w-4 h-4" />
              <span className="text-xs font-medium">Services</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                activeTab === "marketplace" 
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                  : "bg-dark-3 text-light-2 hover:bg-dark-4"
              }`}
              onClick={() => setActiveTab("marketplace")}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-medium">Market</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                activeTab === "news" 
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                  : "bg-dark-3 text-light-2 hover:bg-dark-4"
              }`}
              onClick={() => setActiveTab("news")}
            >
              <Newspaper className="w-4 h-4" />
              <span className="text-xs font-medium">News</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                activeTab === "games" 
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                  : "bg-dark-3 text-light-2 hover:bg-dark-4"
              }`}
              onClick={() => setActiveTab("games")}
            >
              <Gamepad className="w-4 h-4" />
              <span className="text-xs font-medium">Games</span>
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "study" && (
              <motion.div
                key="study-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-8"
              >
                {/* Study Buddy Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mb-6"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-light-1 flex items-center justify-center gap-3 py-6 shadow-lg shadow-primary-500/20 rounded-xl border border-primary-500/20"
                    onClick={goToStudyBuddy}
                  >
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Book className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-bold">Study Buddy</span>
                      <span className="text-xs text-white/80">AI-powered learning assistant</span>
                    </div>
                  </Button>
                </motion.div>

                {/* Subject Progress */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Subject Progress</h3>
                  <div className="space-y-3">
                    {SUBJECTS.map((subject) => (
                      <div key={subject.id} className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="small-medium text-light-2">
                            {subject.icon} {subject.name}
                          </span>
                          <span className="tiny-medium text-light-3">{subject.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-dark-4 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${subject.progress}%` }}
                            transition={{ duration: 1, delay: 0.2 * subject.id }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Sessions */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Upcoming Sessions</h3>
                  <div className="space-y-3">
                    {UPCOMING_SESSIONS.map((session) => (
                      <motion.div 
                        key={session.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-dark-2 p-3 rounded-lg border border-dark-4 cursor-pointer hover:border-primary-500 transition-all"
                        onClick={() => goToSession(session.id)}
                      >
                        <h4 className="small-semibold text-light-1">{session.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-light-3" />
                          <span className="tiny-medium text-light-3">{session.time}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="tiny-medium text-primary-500">{session.subject}</span>
                          <span className="tiny-medium text-light-3">with {session.buddy}</span>
                        </div>
                      </motion.div>
                    ))}
                    <Button
                      className="w-full text-xs bg-dark-4 hover:bg-dark-4/80 text-light-2"
                      variant="ghost"
                      onClick={() => setShowSessions(!showSessions)}
                    >
                      {showSessions ? "Hide Sessions" : "View All Sessions"}
                    </Button>
                  </div>
                </div>

                {/* Study Buddies - Combined AI and human users */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Study Buddies</h3>
                  <div className="space-y-3">
                    {/* AI Buddies */}
                    {AI_BUDDIES.map((buddy) => (
                      <motion.div 
                        key={buddy.id} 
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                      >
                        <div className="relative">
                          <img 
                            src={buddy.avatar} 
                            alt={buddy.name}
                            className="w-10 h-10 rounded-full object-cover border border-primary-500"
                          />
                          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-[8px] rounded-full px-1 py-0.5">
                            AI
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="small-semibold text-light-1">{buddy.name}</h4>
                          <p className="tiny-medium text-light-3">{buddy.subject} Expert</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-xs">★</span>
                          <span className="tiny-medium text-light-2 ml-1">{buddy.rating}</span>
                        </div>
                      </motion.div>
                    ))}

                    {/* Divider */}
                    <div className="border-t border-dark-4 my-2"></div>

                    {/* User Buddies */}
                    {USER_BUDDIES.map((buddy) => (
                      <motion.div 
                        key={buddy.id} 
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                      >
                        <div className="relative">
                          <img 
                            src={buddy.avatar} 
                            alt={buddy.name}
                            className="w-10 h-10 rounded-full object-cover border border-secondary-500"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-dark-2 ${buddy.online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        </div>
                        <div className="flex-1">
                          <h4 className="small-semibold text-light-1">{buddy.name}</h4>
                          <p className="tiny-medium text-light-3">{buddy.subject} Expert</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-xs">★</span>
                          <span className="tiny-medium text-light-2 ml-1">{buddy.rating}</span>
                        </div>
                      </motion.div>
                    ))}
                    
                    <Button
                      className="w-full text-xs bg-dark-4 hover:bg-dark-4/80 text-light-2"
                      variant="ghost"
                      onClick={goToStudyBuddy}
                    >
                      Find More Buddies
                    </Button>
                  </div>
                </div>

                {/* Focus Status */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Focus Status</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="small-medium text-light-1">Today's Focus Time</span>
                      <span className="body-bold text-primary-500">2h 45m</span>
                    </div>
                    <div className="p-2 bg-primary-500/20 rounded-lg">
                      <Brain className="w-6 h-6 text-primary-500" />
                    </div>
                  </div>
                  <div className="w-full h-2 bg-dark-4 rounded-full overflow-hidden mt-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-primary-500 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="tiny-medium text-light-3">Goal: 4h</span>
                    <span className="tiny-medium text-primary-500">65%</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="bg-primary-500/20 hover:bg-primary-500/30 text-primary-500 text-xs h-auto py-2"
                      onClick={() => navigate("/study-session/new")}
                    >
                      New Session
                    </Button>
                    <Button
                      className="bg-dark-4 hover:bg-dark-4/80 text-light-2 text-xs h-auto py-2"
                      variant="ghost"
                      onClick={goToStudyBuddy}
                    >
                      Find Buddy
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "communities" && (
              <motion.div
                key="communities-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-8"
              >
                {/* Communities Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mb-6"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-light-1 flex items-center justify-center gap-3 py-6 shadow-lg shadow-indigo-500/20 rounded-xl border border-indigo-500/20"
                    onClick={goToCommunities}
                  >
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-bold">Communities</span>
                      <span className="text-xs text-white/80">Connect with like-minded people</span>
                    </div>
                  </Button>
                </motion.div>

                {/* Popular Communities */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Popular Communities</h3>
                  <div className="space-y-3">
                    {POPULAR_COMMUNITIES.map((community, index) => (
                      <motion.div 
                        key={community.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className={`bg-gradient-to-r ${community.color} p-4 rounded-lg cursor-pointer shadow-md`}
                        onClick={() => navigate(`/communities/${community.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded-full">
                            {community.icon}
                          </div>
                          <div>
                            <h4 className="small-semibold text-white">{community.name}</h4>
                            <p className="tiny-medium text-white/70">{community.members.toLocaleString()} members</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="bg-dark-2 p-3 rounded-lg border border-dark-4">
                      <div className="flex items-start gap-3">
                        <img 
                          src="https://randomuser.me/api/portraits/women/67.jpg" 
                          alt="User" 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="tiny-medium text-light-2">
                            <span className="text-primary-500">Emma Davis</span> posted in <span className="text-secondary-500">Fitness & Wellness</span>
                          </p>
                          <p className="small-regular text-light-1 mt-1">Just completed my first 10K run! The training plan from this community was perfect. Thanks everyone for the support!</p>
                          <p className="tiny-medium text-light-3 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-dark-2 p-3 rounded-lg border border-dark-4">
                      <div className="flex items-start gap-3">
                        <img 
                          src="https://randomuser.me/api/portraits/men/54.jpg" 
                          alt="User" 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="tiny-medium text-light-2">
                            <span className="text-primary-500">James Wilson</span> started a new discussion in <span className="text-secondary-500">Addiction Recovery</span>
                          </p>
                          <p className="small-regular text-light-1 mt-1">Tips for staying strong during holiday gatherings?</p>
                          <p className="tiny-medium text-light-3 mt-1">5 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended For You */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Recommended For You</h3>
                  <div className="space-y-3">
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-gradient-to-r from-pink-500 to-rose-400 p-4 rounded-lg cursor-pointer shadow-md"
                      onClick={() => navigate("/communities/creativity")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="small-semibold text-white">Creative Arts</h4>
                          <p className="tiny-medium text-white/70">8,345 members</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 p-4 rounded-lg cursor-pointer shadow-md"
                      onClick={() => navigate("/communities/mindfulness")}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                          <Brain className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="small-semibold text-white">Mindfulness & Meditation</h4>
                          <p className="tiny-medium text-white/70">12,678 members</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "services" && (
              <motion.div
                key="services-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-8"
              >
                {/* Services Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mb-6"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-light-1 flex items-center justify-center gap-3 py-6 shadow-lg shadow-green-500/20 rounded-xl border border-green-500/20"
                    onClick={goToServices}
                  >
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-bold">Services</span>
                      <span className="text-xs text-white/80">Help others, earn rewards</span>
                    </div>
                  </Button>
                </motion.div>

                {/* Service Opportunities */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Popular Opportunities</h3>
                  <div className="space-y-3">
                    {SERVICE_OPPORTUNITIES.map((service, index) => (
                      <motion.div 
                        key={service.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className={`bg-gradient-to-r ${service.color} p-4 rounded-lg cursor-pointer shadow-md`}
                        onClick={() => navigate(`/services`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded-full">
                            {service.icon}
                          </div>
                          <div>
                            <h4 className="small-semibold text-white">{service.name}</h4>
                            <div className="flex items-center">
                              <Award className="w-3 h-3 text-yellow-300 mr-1" />
                              <p className="tiny-medium text-white/70">{service.rewards} points reward</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Your Points */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Your Points Balance</h3>
                  <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm p-4 rounded-xl border border-primary-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-6 h-6 text-yellow-400" />
                        <span className="text-2xl font-bold text-light-1">750</span>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-primary-500 text-xs"
                        onClick={goToServices}
                      >
                        View History
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-light-3">
                      You're ranked <span className="text-primary-500 font-bold">#42</span> on the leaderboard
                    </div>
                  </div>
                </div>

                {/* Recent Services */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="bg-dark-2 p-3 rounded-lg border border-dark-4">
                      <div className="flex items-start gap-3">
                        <img 
                          src="https://randomuser.me/api/portraits/women/32.jpg" 
                          alt="User" 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="tiny-medium text-light-2">
                            <span className="text-primary-500">Sarah Johnson</span> completed <span className="text-secondary-500">After-school tutoring session</span>
                          </p>
                          <div className="flex items-center mt-1">
                            <Award className="w-3 h-3 text-green-400 mr-1" />
                            <p className="tiny-medium text-green-400">+50 points earned</p>
                          </div>
                          <p className="tiny-medium text-light-3 mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-dark-2 p-3 rounded-lg border border-dark-4">
                      <div className="flex items-start gap-3">
                        <img 
                          src="https://randomuser.me/api/portraits/men/44.jpg" 
                          alt="User" 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="tiny-medium text-light-2">
                            <span className="text-primary-500">Michael Chen</span> donated to <span className="text-secondary-500">Food Drive for Homeless Shelter</span>
                          </p>
                          <div className="flex items-center mt-1">
                            <Award className="w-3 h-3 text-green-400 mr-1" />
                            <p className="tiny-medium text-green-400">+25 points earned</p>
                          </div>
                          <p className="tiny-medium text-light-3 mt-1">3 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="bg-primary-500/20 hover:bg-primary-500/30 text-primary-500 text-xs h-auto py-2"
                      onClick={() => navigate("/services")}
                    >
                      Browse Services
                    </Button>
                    <Button
                      className="bg-dark-4 hover:bg-dark-4/80 text-light-2 text-xs h-auto py-2"
                      variant="ghost"
                      onClick={() => navigate("/services")}
                    >
                      Request Help
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "marketplace" && (
              <motion.div
                key="marketplace-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-8"
              >
                {/* Marketplace Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mb-6"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-light-1 flex items-center justify-center gap-3 py-6 shadow-lg shadow-amber-500/20 rounded-xl border border-amber-500/20"
                    onClick={goToMarketplace}
                  >
                    <div className="bg-white/20 p-2 rounded-lg">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-bold">Marketplace</span>
                      <span className="text-xs text-white/80">Shop with study points & explore local deals</span>
                    </div>
                  </Button>
                </motion.div>

                {/* Reward Points Summary */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Your Rewards</h3>
                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm p-4 rounded-xl border border-amber-500/20 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-6 h-6 text-amber-400" />
                        <span className="text-2xl font-bold text-light-1">750</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="ghost"
                          className="text-amber-500 text-xs font-semibold px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20"
                          onClick={goToMarketplace}
                        >
                          Earn More
                          <TrendingUp className="w-3 h-3 ml-1" />
                        </Button>
                      </motion.div>
                    </div>
                    <div className="mt-2 text-xs text-light-3">
                      You can redeem points for <span className="text-amber-500 font-bold">exclusive rewards</span>
                    </div>
                  </div>
                </div>
                
                {/* Exclusive Discount Coupons */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="small-semibold text-light-1">Discount Coupons</h3>
                    <span className="text-xs text-primary-500">5 available</span>
                  </div>
                  <div className="space-y-3">
                    {REWARD_COUPONS.map((coupon, index) => (
                      <motion.div 
                        key={coupon.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -3 }}
                        className="relative overflow-hidden group"
                      >
                        <div className={`bg-gradient-to-r ${coupon.color} p-4 rounded-lg shadow-lg`}>
                          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full"></div>
                          <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-white/10 rounded-full"></div>
                          
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-16 bg-white rounded flex items-center justify-center p-1">
                              <img 
                                src={coupon.logo} 
                                alt={coupon.brand} 
                                className="h-full object-contain" 
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-base">{coupon.discount}</h4>
                              <p className="text-white/80 text-xs">{coupon.brand}</p>
                            </div>
                          </div>
                          
                          <p className="text-white/90 text-xs mb-3">{coupon.description}</p>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5">
                              <Award className="w-3 h-3 text-white" />
                              <span className="text-white text-xs font-medium">{coupon.pointsCost} points</span>
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-white/90 text-xs font-semibold px-3 py-1 rounded-full text-gray-800 hover:bg-white"
                            >
                              Redeem
                            </motion.button>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </motion.div>
                    ))}
                    
                    <Button
                      className="w-full text-xs flex items-center justify-center gap-1 bg-dark-4 hover:bg-dark-4/80 text-light-2 py-2"
                      variant="ghost"
                      onClick={goToMarketplace}
                    >
                      <Tag className="w-3 h-3" /> View All Coupons
                    </Button>
                  </div>
                </div>
                
                {/* Nearby Marketplace */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="small-semibold text-light-1">Nearby Marketplace</h3>
                    <div className="flex items-center gap-1 text-xs text-light-3">
                      <MapPin className="w-3 h-3" /> 
                      <span>Cambridge, MA</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {MARKETPLACE_ITEMS.map((item) => (
                      <motion.div 
                        key={item.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="bg-dark-2 p-3 rounded-lg border border-dark-4 cursor-pointer hover:border-amber-500/50 transition-all"
                      >
                        <div className="flex gap-3">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium text-light-1 text-sm line-clamp-1">{item.name}</h4>
                              {item.discount > 0 && (
                                <span className="text-xs font-bold bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded">-{item.discount}%</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-yellow-500 text-xs">★</span>
                              <span className="text-xs text-light-3">{item.rating}</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <div>
                                <span className="font-semibold text-light-1">${item.price.toFixed(2)}</span>
                                {item.discount > 0 && (
                                  <span className="text-light-3 text-xs line-through ml-1">
                                    ${(item.price * (1 + item.discount/100)).toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-light-3">
                                <MapPin className="w-3 h-3" />
                                <span>{item.distance}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    <Button
                      className="w-full text-xs flex items-center justify-center gap-1 bg-dark-4 hover:bg-dark-4/80 text-light-2 py-2"
                      variant="ghost"
                      onClick={goToMarketplace}
                    >
                      <Compass className="w-3 h-3" /> Explore More Items
                    </Button>
                  </div>
                </div>
                
                {/* Trending Categories */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Popular Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.div 
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-3 rounded-lg cursor-pointer border border-blue-500/20 hover:border-blue-500/50 transition-all"
                    >
                      <div className="flex flex-col items-center text-center">
                        <Book className="w-6 h-6 text-blue-400 mb-1" />
                        <h4 className="text-sm font-medium text-light-1">Study Supplies</h4>
                        <p className="text-xs text-light-3 mt-1">30+ items</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg cursor-pointer border border-purple-500/20 hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex flex-col items-center text-center">
                        <Brain className="w-6 h-6 text-purple-400 mb-1" />
                        <h4 className="text-sm font-medium text-light-1">Productivity</h4>
                        <p className="text-xs text-light-3 mt-1">25+ items</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 p-3 rounded-lg cursor-pointer border border-amber-500/20 hover:border-amber-500/50 transition-all"
                    >
                      <div className="flex flex-col items-center text-center">
                        <Coffee className="w-6 h-6 text-amber-400 mb-1" />
                        <h4 className="text-sm font-medium text-light-1">Coffee & Snacks</h4>
                        <p className="text-xs text-light-3 mt-1">15+ items</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-3 rounded-lg cursor-pointer border border-green-500/20 hover:border-green-500/50 transition-all"
                    >
                      <div className="flex flex-col items-center text-center">
                        <Zap className="w-6 h-6 text-green-400 mb-1" />
                        <h4 className="text-sm font-medium text-light-1">Tech Gadgets</h4>
                        <p className="text-xs text-light-3 mt-1">40+ items</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 text-xs h-auto py-2 flex items-center gap-1 justify-center"
                      onClick={goToMarketplace}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      Browse Store
                    </Button>
                    <Button
                      className="bg-dark-4 hover:bg-dark-4/80 text-light-2 text-xs h-auto py-2 flex items-center gap-1 justify-center"
                      variant="ghost"
                      onClick={goToMarketplace}
                    >
                      <Truck className="w-3 h-3" />
                      My Orders
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* New News Tab */}
            {activeTab === "news" && (
              <motion.div
                key="news-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-8"
              >
                {/* News Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mb-6"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-light-1 flex items-center justify-center gap-3 py-6 shadow-lg shadow-blue-500/20 rounded-xl border border-blue-500/20"
                    onClick={goToNews}
                  >
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Newspaper className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-bold">News Feed</span>
                      <span className="text-xs text-white/80">Stay updated with current events</span>
                    </div>
                  </Button>
                </motion.div>

                {/* News Categories */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="small-semibold text-light-1">Categories</h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className={`p-2 rounded-full ${newsLoading ? 'animate-spin' : ''}`}
                      onClick={refreshNews}
                      disabled={newsLoading}
                    >
                      <RefreshCw className="w-4 h-4 text-light-3" />
                    </motion.button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["technology", "science", "business", "health", "sports", "entertainment"].map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          newsCategory === category 
                            ? "bg-blue-500 text-white" 
                            : "bg-dark-4 text-light-2 hover:bg-dark-5"
                        }`}
                        onClick={() => changeNewsCategory(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* News Feed */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Today's Headlines</h3>
                  {newsLoading ? (
                    <div className="flex justify-center py-10">
                      <div className="w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {newsItems.map((news, index) => (
                        <motion.div 
                          key={news.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group cursor-pointer"
                          onClick={() => navigate("/news")}
                        >
                          <div className="relative overflow-hidden rounded-lg">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                            <motion.img 
                              src={news.image} 
                              alt={news.title}
                              className="w-full h-40 object-cover transition-transform"
                              whileHover={{ scale: 1.05 }}
                            />
                            <div className="absolute bottom-0 left-0 p-3 z-20">
                              <p className="text-white font-medium line-clamp-2">{news.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-blue-300">{news.source}</span>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span className="text-xs text-gray-300">{news.time}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      <Button
                        className="w-full text-xs flex items-center justify-center gap-1 bg-dark-4 hover:bg-dark-4/80 text-light-2 py-2"
                        variant="ghost"
                        onClick={goToNews}
                      >
                        <ExternalLink className="w-3 h-3" /> View All News
                      </Button>
                    </div>
                  )}
                </div>

                {/* Search News */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Search News</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-3" />
                    <input 
                      type="text" 
                      placeholder="Search for topics..." 
                      className="w-full bg-dark-4 border border-dark-4 rounded-lg pl-10 pr-3 py-2 text-sm text-light-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Button
                    className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white text-sm"
                    onClick={goToNews}
                  >
                    Search
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 text-xs h-auto py-2 flex items-center gap-1 justify-center"
                      onClick={goToNews}
                    >
                      <Compass className="w-3 h-3" />
                      Explore News
                    </Button>
                    <Button
                      className="bg-dark-4 hover:bg-dark-4/80 text-light-2 text-xs h-auto py-2 flex items-center gap-1 justify-center"
                      variant="ghost"
                      onClick={() => navigate("/news/saved")}
                    >
                      <Bookmark className="w-3 h-3" />
                      Saved Articles
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Add Games Tab */}
            {activeTab === "games" && (
              <motion.div
                key="games-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-8"
              >
                {/* Games Button */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mb-6"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-light-1 flex items-center justify-center gap-3 py-6 shadow-lg shadow-purple-500/20 rounded-xl border border-purple-500/20"
                    onClick={goToGames}
                  >
                    <div className="bg-white/20 p-2 rounded-lg">
                      <Gamepad className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-bold">Game Center</span>
                      <span className="text-xs text-white/80">Take a break with fun games</span>
                    </div>
                  </Button>
                </motion.div>

                {/* Featured Games */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Featured Games</h3>
                  <div className="space-y-3">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg border border-purple-500/30 cursor-pointer hover:border-purple-500/60 transition-all"
                      onClick={() => goToGames()}
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 overflow-hidden rounded-md bg-dark-4 flex items-center justify-center">
                          <img 
                            src="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974&auto=format&fit=crop" 
                            alt="2048"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-light-1">2048</h4>
                          <p className="text-xs text-light-3 mt-1">Merge tiles to reach 2048 in this addictive puzzle game</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">Puzzle</span>
                            <span className="text-xs text-light-3">• 2 min</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-3 rounded-lg border border-blue-500/30 cursor-pointer hover:border-blue-500/60 transition-all"
                      onClick={() => goToGames()}
                    >
                      <div className="flex gap-3">
                        <div className="w-16 h-16 overflow-hidden rounded-md bg-dark-4 flex items-center justify-center">
                          <img 
                            src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=1974&auto=format&fit=crop" 
                            alt="Snake"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-light-1">Snake</h4>
                          <p className="text-xs text-light-3 mt-1">Classic snake game! Eat food, grow longer, don't hit the walls</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full">Arcade</span>
                            <span className="text-xs text-light-3">• 5 min</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <Button
                    className="w-full text-xs mt-3 bg-dark-4 hover:bg-dark-4/80 text-light-2"
                    variant="ghost"
                    onClick={goToGames}
                  >
                    View All Games
                  </Button>
                </div>

                {/* Popular Games Categories */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-3 rounded-lg cursor-pointer border border-purple-500/20 hover:border-purple-500/50 transition-all"
                      onClick={goToGames}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-2">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-sm font-medium text-light-1">Puzzle</h4>
                        <p className="text-xs text-light-3 mt-1">10+ games</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-3 rounded-lg cursor-pointer border border-blue-500/20 hover:border-blue-500/50 transition-all"
                      onClick={goToGames}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-2">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-sm font-medium text-light-1">Arcade</h4>
                        <p className="text-xs text-light-3 mt-1">8+ games</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-3 rounded-lg cursor-pointer border border-green-500/20 hover:border-green-500/50 transition-all"
                      onClick={goToGames}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-2">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-sm font-medium text-light-1">Multiplayer</h4>
                        <p className="text-xs text-light-3 mt-1">5+ games</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-3 rounded-lg cursor-pointer border border-red-500/20 hover:border-red-500/50 transition-all"
                      onClick={goToGames}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-2">
                          <Coffee className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-sm font-medium text-light-1">Casual</h4>
                        <p className="text-xs text-light-3 mt-1">12+ games</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-dark-3 rounded-xl p-4 border border-dark-4">
                  <h3 className="small-semibold text-light-1 mb-3">Quick Play</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs h-auto py-2 flex items-center gap-1 justify-center"
                      onClick={goToGames}
                    >
                      <Gamepad className="w-3 h-3" />
                      Random Game
                    </Button>
                    <Button
                      className="bg-dark-4 hover:bg-dark-4/80 text-light-2 text-xs h-auto py-2 flex items-center gap-1 justify-center"
                      variant="ghost"
                      onClick={goToGames}
                    >
                      <Tag className="w-3 h-3" />
                      Top Rated
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
};

export default StudyBuddySidebar; 