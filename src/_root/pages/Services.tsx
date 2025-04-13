import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Heart as HandHeart, BadgeHelp, Trophy, Award, ArrowRight, Search, Filter, Users, AlertCircle, MapPin, Calendar, CircleDollarSign, Sparkles } from "lucide-react";

import { Button } from "@/components/ui";

// Define types
interface ServiceCategory {
  id: number;
  name: string;
  icon: JSX.Element;
  count: number;
  color: string;
}

interface ServicePost {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  points: number;
  author: {
    name: string;
    avatar: string;
  };
  urgent: boolean;
}

interface ActivityItem {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  service: string;
  points: number;
  time: string;
}

interface TopHelper {
  id: number;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  badge: string;
}

// Define service categories
const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 1, name: "Tutoring", icon: <Gift className="w-5 h-5" />, count: 42, color: "from-blue-500 to-cyan-400" },
  { id: 2, name: "Donations", icon: <Heart className="w-5 h-5" />, count: 28, color: "from-rose-500 to-pink-400" },
  { id: 3, name: "Volunteering", icon: <HandHeart className="w-5 h-5" />, count: 35, color: "from-green-500 to-emerald-400" },
  { id: 4, name: "Tech Help", icon: <BadgeHelp className="w-5 h-5" />, count: 19, color: "from-purple-500 to-indigo-400" },
  { id: 5, name: "Community Events", icon: <Users className="w-5 h-5" />, count: 23, color: "from-amber-500 to-yellow-400" },
];

// Featured services
const FEATURED_SERVICES: ServicePost[] = [
  {
    id: 1,
    title: "Math Tutoring for Elementary Students",
    description: "Help young students with basic math skills. Virtual sessions available twice a week.",
    category: "Tutoring",
    location: "Virtual / Online",
    date: "Flexible Schedule",
    points: 150,
    author: {
      name: "Emily Chen",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg"
    },
    urgent: false
  },
  {
    id: 2,
    title: "Emergency Food Drive Donations",
    description: "Local food bank needs non-perishable items for families affected by recent flooding.",
    category: "Donations",
    location: "Downtown Community Center",
    date: "This Weekend",
    points: 75,
    author: {
      name: "Marcus Johnson",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    urgent: true
  },
  {
    id: 3,
    title: "Senior Technology Assistance",
    description: "Help seniors learn to use smartphones and video calling to connect with family members.",
    category: "Tech Help",
    location: "Sunshine Retirement Home",
    date: "Weekday Afternoons",
    points: 200,
    author: {
      name: "Sophia Williams",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    urgent: false
  }
];

// Recent activity
const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: 1,
    user: {
      name: "David Kim",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    action: "completed",
    service: "Math tutoring sessions for 3 students",
    points: 120,
    time: "2 hours ago"
  },
  {
    id: 2,
    user: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    action: "donated to",
    service: "Winter Coat Drive for Children",
    points: 50,
    time: "Yesterday"
  },
  {
    id: 3,
    user: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    action: "volunteered at",
    service: "Community Garden Project",
    points: 85,
    time: "2 days ago"
  }
];

// Top helpers leaderboard
const TOP_HELPERS: TopHelper[] = [
  {
    id: 1,
    name: "Jessica Martinez",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    points: 2450,
    rank: 1,
    badge: "Diamond Helper"
  },
  {
    id: 2,
    name: "Robert Chen",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    points: 2280,
    rank: 2,
    badge: "Platinum Helper"
  },
  {
    id: 3,
    name: "Emily Johnson",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    points: 1950,
    rank: 3,
    badge: "Gold Helper"
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    points: 1680,
    rank: 4,
    badge: "Silver Helper"
  },
  {
    id: 5,
    name: "Sophia Williams",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    points: 1540,
    rank: 5,
    badge: "Bronze Helper"
  }
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userPoints] = useState<number>(750);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService] = useState<any>(null);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);

  const handleJoinService = (serviceId: number) => {
    // Mock implementation - in real app would call API
    console.log(`Joining service ${serviceId}`);
    // Show success notification
    const toast = document.getElementById('toast');
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 3000);
    }
    setShowServiceModal(false);
  };

  return (
    <div className="flex flex-col gap-10 py-8 px-5 md:px-8 lg:px-14">
      {/* Header with Points Display */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <h1 className="h1-bold text-light-1">Community Services</h1>
            <p className="body-regular text-light-3 mt-2">
              Help others, donate, volunteer, and earn rewards
            </p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center justify-center bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm p-4 rounded-xl border border-primary-500/20 min-w-[200px]"
          >
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              <span className="h2-bold text-light-1">{userPoints}</span>
            </div>
            <p className="small-regular text-light-3 mt-1">Your Service Points</p>
            <div className="mt-2 text-xs text-light-3">
              Ranked <span className="text-primary-500 font-bold">#42</span> on the leaderboard
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="w-full">
        <h2 className="h3-bold text-light-1 mb-6">Service Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl flex flex-col items-center gap-3 
              ${activeCategory === 'All' 
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/20' 
                : 'bg-dark-3 text-light-2 hover:bg-dark-4 border border-dark-4'}`}
            onClick={() => setActiveCategory('All')}
          >
            <div className={`p-3 rounded-full ${activeCategory === 'All' ? 'bg-white/20' : 'bg-dark-2'}`}>
              <Award className="w-6 h-6" />
            </div>
            <span className="small-medium">All Services</span>
            <span className="tiny-medium text-light-3">{SERVICE_CATEGORIES.reduce((acc, cat) => acc + cat.count, 0)} opportunities</span>
          </motion.button>

          {SERVICE_CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl flex flex-col items-center gap-3 
                ${activeCategory === category.name 
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                  : 'bg-dark-3 text-light-2 hover:bg-dark-4 border border-dark-4'}`}
              onClick={() => setActiveCategory(category.name)}
            >
              <div className={`p-3 rounded-full ${activeCategory === category.name ? 'bg-white/20' : 'bg-dark-2'}`}>
                {category.icon}
              </div>
              <span className="small-medium">{category.name}</span>
              <span className="tiny-medium text-light-3">{category.count} opportunities</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Search and Filter */}
      <section className="w-full">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-3 w-5 h-5" />
            <input
              type="text"
              placeholder="Search service opportunities..."
              className="w-full bg-dark-3 border border-dark-4 rounded-lg py-3 pl-10 pr-4 text-light-1 placeholder:text-light-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-dark-3 text-light-2 border border-dark-4 px-4 gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </Button>
        </div>
      </section>

      {/* Featured Services */}
      <section className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="h3-bold text-light-1">Featured Opportunities</h2>
          <Button variant="ghost" className="text-primary-500 gap-2">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_SERVICES.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -5 }}
              className="bg-dark-3 rounded-xl overflow-hidden border border-dark-4 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10"
            >
              <div className={`p-5 ${service.urgent ? 'border-l-4 border-l-red-500' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="base-semibold text-light-1">{service.title}</h3>
                  {service.urgent && (
                    <div className="bg-red-500/20 text-red-500 text-xs font-bold py-1 px-2 rounded-full flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Urgent
                    </div>
                  )}
                </div>
                <p className="small-regular text-light-3 mb-4">{service.description}</p>
                
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary-500/20 text-primary-500">
                      {service.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-light-3">
                    <MapPin className="w-4 h-4" />
                    <span className="tiny-medium">{service.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-light-3">
                    <Calendar className="w-4 h-4" />
                    <span className="tiny-medium">{service.date}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-dark-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src={service.author.avatar} 
                      alt={service.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="tiny-medium text-light-2">{service.author.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-primary-500/20 text-primary-500 py-1 px-2 rounded-full">
                    <Award className="w-3 h-3" />
                    <span className="tiny-bold">{service.points} pts</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-2 p-3 flex justify-center">
                <Button className="bg-primary-500 hover:bg-primary-600 text-white w-full">
                  Sign Up to Help
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Two Column Layout for Activity and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <section className="lg:col-span-2 bg-dark-3 rounded-xl p-5 border border-dark-4">
          <h2 className="h3-bold text-light-1 mb-4">Recent Activity</h2>
          
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-dark-2 p-4 rounded-lg border border-dark-4"
              >
                <div className="flex items-start gap-3">
                  <img 
                    src={activity.user.avatar} 
                    alt={activity.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="small-medium text-light-2">
                      <span className="text-primary-500">{activity.user.name}</span> {activity.action} <span className="text-secondary-500">{activity.service}</span>
                    </p>
                    <div className="flex items-center mt-1 gap-2">
                      <div className="flex items-center gap-1 text-green-400">
                        <Award className="w-3 h-3" />
                        <span className="tiny-medium">+{activity.points} points earned</span>
                      </div>
                      <span className="tiny-medium text-light-3">• {activity.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <Button variant="ghost" className="w-full text-primary-500">
              View More Activity
            </Button>
          </div>
        </section>

        {/* Top Helpers Leaderboard */}
        <section className="bg-dark-3 rounded-xl p-5 border border-dark-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="h3-bold text-light-1">Top Helpers</h2>
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          
          <div className="space-y-4">
            {TOP_HELPERS.map((helper, index) => (
              <motion.div
                key={helper.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-dark-2 p-3 rounded-lg border ${index === 0 ? 'border-yellow-500/50' : index === 1 ? 'border-gray-400/50' : index === 2 ? 'border-amber-700/50' : 'border-dark-4'}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-500/20 text-primary-500 font-bold text-sm">
                    {helper.rank}
                  </div>
                  
                  <img 
                    src={helper.avatar} 
                    alt={helper.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-dark-1"
                  />
                  
                  <div className="flex-1">
                    <h4 className="small-semibold text-light-1">{helper.name}</h4>
                    <div className="flex items-center gap-1">
                      <Badge className={`${
                        index === 0 ? 'bg-yellow-500/20 text-yellow-500' : 
                        index === 1 ? 'bg-gray-400/20 text-gray-400' : 
                        index === 2 ? 'bg-amber-700/20 text-amber-700' : 
                        'bg-primary-500/20 text-primary-500'
                      } tiny-medium`}>
                        {helper.badge}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-primary-500">
                    <Award className="w-4 h-4" />
                    <span className="small-semibold">{helper.points}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <Button variant="ghost" className="w-full text-primary-500">
              View Full Leaderboard
            </Button>
          </div>
        </section>
      </div>

      {/* How It Works */}
      <section className="w-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl p-6 border border-primary-500/20">
        <h2 className="h3-bold text-light-1 text-center mb-6">How Service Rewards Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-dark-2/80 backdrop-blur-sm p-5 rounded-xl border border-dark-4"
          >
            <div className="bg-primary-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <CircleDollarSign className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="base-semibold text-light-1 mb-2">Earn Points</h3>
            <p className="small-regular text-light-3">
              Complete service opportunities and donations to earn reward points. Different activities award varying point values.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-dark-2/80 backdrop-blur-sm p-5 rounded-xl border border-dark-4"
          >
            <div className="bg-primary-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="base-semibold text-light-1 mb-2">Climb the Ranks</h3>
            <p className="small-regular text-light-3">
              As you accumulate points, unlock achievement badges and rise through the helper ranks from Bronze to Diamond.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-dark-2/80 backdrop-blur-sm p-5 rounded-xl border border-dark-4"
          >
            <div className="bg-primary-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="base-semibold text-light-1 mb-2">Redeem Rewards</h3>
            <p className="small-regular text-light-3">
              Use your points to redeem exclusive app features, digital goods, or convert them to real-world charitable donations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Create Service Opportunity CTA */}
      <section className="w-full">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h2 className="h3-bold text-white mb-2">Create Your Own Service Opportunity</h2>
            <p className="small-regular text-white/80">
              Have a cause that needs support? Create a service opportunity and rally the community to help.
            </p>
          </div>
          
          <Button className="bg-white text-primary-500 hover:bg-white/90 min-w-[200px] gap-2">
            <Sparkles className="w-5 h-5" />
            Create Opportunity
          </Button>
        </motion.div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {showServiceModal && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowServiceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-dark-2 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={selectedService.author.avatar} 
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-2 to-transparent"></div>
                <button 
                  className="absolute top-3 right-3 p-1.5 bg-dark-1/80 rounded-full text-light-3 hover:text-light-1"
                  onClick={() => setShowServiceModal(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="p-5">
                <div className="mb-4">
                  <div className="flex gap-2 mb-2">
                    <span className="badge badge-sm bg-primary-500 text-white border-none">
                      {SERVICE_CATEGORIES.find(cat => cat.name === selectedService.category)?.name}
                    </span>
                    <span className="badge badge-sm bg-dark-4 text-light-2 border-none">
                      {selectedService.urgent ? 'Urgent' : 'Open'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-light-1">{selectedService.title}</h3>
                  <p className="text-light-3 text-sm">Posted by {selectedService.author.name}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-bold text-light-1 mb-2">Description</h4>
                  <p className="text-light-2 mb-4">{selectedService.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-dark-3 rounded-lg p-3">
                      <p className="text-xs text-light-3">Location</p>
                      <p className="text-light-1 font-medium">{selectedService.location}</p>
                    </div>
                    <div className="bg-dark-3 rounded-lg p-3">
                      <p className="text-xs text-light-3">Reward Points</p>
                      <p className="text-primary-500 font-bold flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        {selectedService.points} points
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-light-1 mb-2">Participants</h4>
                    <div className="flex -space-x-2 overflow-hidden">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <img
                          key={i}
                          className="inline-block h-8 w-8 rounded-full ring-2 ring-dark-2"
                          src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`}
                          alt="Participant"
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-6">
                    {selectedService.tags.map((tag: string, i: number) => (
                      <span 
                        key={i} 
                        className="text-sm py-1 px-3 bg-dark-4 text-light-2 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-dark-4 text-light-1 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-dark-4/80"
                    onClick={() => setShowServiceModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                    onClick={() => handleJoinService(selectedService.id)}
                  >
                    <HandHeart className="w-4 h-4" />
                    Participate
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Create New Request Form Modal */}
      <AnimatePresence>
        {showNewRequestForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewRequestForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-dark-2 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-light-1">Create Help Request</h3>
                  <button 
                    className="p-1.5 bg-dark-3 rounded-full text-light-3 hover:text-light-1"
                    onClick={() => setShowNewRequestForm(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-light-2 text-sm font-medium mb-1">Title</label>
                    <input 
                      type="text"
                      placeholder="Enter a clear title for your request"
                      className="w-full bg-dark-3 border border-dark-4 rounded-lg p-3 text-light-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-light-2 text-sm font-medium mb-1">Category</label>
                    <select className="w-full bg-dark-3 border border-dark-4 rounded-lg p-3 text-light-1 focus:outline-none focus:ring-1 focus:ring-primary-500">
                      <option value="">Select a category</option>
                      {SERVICE_CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-light-2 text-sm font-medium mb-1">Description</label>
                    <textarea 
                      rows={4}
                      placeholder="Describe what kind of help you need"
                      className="w-full bg-dark-3 border border-dark-4 rounded-lg p-3 text-light-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-light-2 text-sm font-medium mb-1">Location</label>
                    <input 
                      type="text"
                      placeholder="Enter location or 'Remote'"
                      className="w-full bg-dark-3 border border-dark-4 rounded-lg p-3 text-light-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-light-2 text-sm font-medium mb-1">Point Reward (optional)</label>
                    <input 
                      type="number"
                      placeholder="How many points to reward helpers"
                      className="w-full bg-dark-3 border border-dark-4 rounded-lg p-3 text-light-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                    <p className="text-xs text-light-3 mt-1">You have 750 points available</p>
                  </div>
                  
                  <div>
                    <label className="block text-light-2 text-sm font-medium mb-1">Tags (comma separated)</label>
                    <input 
                      type="text"
                      placeholder="e.g. technology, design, moving"
                      className="w-full bg-dark-3 border border-dark-4 rounded-lg p-3 text-light-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1 bg-dark-4 text-light-1 py-3 rounded-lg"
                      onClick={() => setShowNewRequestForm(false)}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white py-3 rounded-lg"
                      type="button"
                      onClick={() => {
                        // Mock form submission
                        setShowNewRequestForm(false);
                        // Show success notification
                        const toast = document.getElementById('toast');
                        if (toast) {
                          toast.classList.remove('hidden');
                          setTimeout(() => toast.classList.add('hidden'), 3000);
                        }
                      }}
                    >
                      Submit Request
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Success Toast */}
      <div id="toast" className="toast toast-top toast-center hidden">
        <div className="alert alert-success shadow-lg">
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Success! Your request has been submitted.</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// Badge component for service categories and statuses
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${className}`}>
      {children}
    </div>
  );
};

export default Services; 