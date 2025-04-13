import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Book, Clock, Brain, 
  BookOpen, ChevronRight, ChevronLeft, Award,
  Users, Shield, Sparkles, Globe, Heart, Activity,
  Gift, BadgeHelp
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
  const [activeTab, setActiveTab] = useState<"study" | "communities" | "services">("study");

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

  // Handle navigation to a specific study session
  const goToSession = (sessionId: number) => {
    navigate(`/study-session/${sessionId}`);
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
              ) : (
                <Gift className="w-6 h-6 text-primary-500" />
              )}
              <h2 className="h3-bold text-light-1">
                {activeTab === "study" ? "Study Hub" : 
                 activeTab === "communities" ? "Communities" : "Services"}
              </h2>
            </div>
            <Button 
              variant="ghost" 
              className="hover:bg-primary-500/20"
              onClick={
                activeTab === "study" ? goToStudyBuddy : 
                activeTab === "communities" ? goToCommunities : goToServices
              }
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2 mb-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 p-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                activeTab === "study" 
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                  : "bg-dark-3 text-light-2 hover:bg-dark-4"
              }`}
              onClick={() => setActiveTab("study")}
            >
              <Book className="w-5 h-5" />
              <span className="text-xs font-medium">Study</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 p-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                activeTab === "communities" 
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                  : "bg-dark-3 text-light-2 hover:bg-dark-4"
              }`}
              onClick={() => setActiveTab("communities")}
            >
              <Users className="w-5 h-5" />
              <span className="text-xs font-medium">Communities</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 p-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                activeTab === "services" 
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md"
                  : "bg-dark-3 text-light-2 hover:bg-dark-4"
              }`}
              onClick={() => setActiveTab("services")}
            >
              <Gift className="w-5 h-5" />
              <span className="text-xs font-medium">Services</span>
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
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
};

export default StudyBuddySidebar; 