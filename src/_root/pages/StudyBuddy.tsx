import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Clock, Users, Book, Calendar, Search,
  FileText, Timer, Brain, ArrowRight, Plus,
  Shield, CheckCircle
} from "lucide-react";

import { Button } from "@/components/ui";
import { Loader } from "@/components/shared";

const SUBJECTS = [
  { id: 1, name: "Mathematics", icon: "🧮" },
  { id: 2, name: "Computer Science", icon: "💻" },
  { id: 3, name: "Physics", icon: "⚛️" },
  { id: 4, name: "Chemistry", icon: "🧪" },
  { id: 5, name: "Biology", icon: "🧬" },
  { id: 6, name: "Literature", icon: "📚" },
  { id: 7, name: "History", icon: "🏛️" },
  { id: 8, name: "Geography", icon: "🌍" },
  { id: 9, name: "Economics", icon: "📈" },
  { id: 10, name: "Psychology", icon: "🧠" },
  { id: 11, name: "Languages", icon: "🗣️" },
  { id: 12, name: "Art", icon: "🎨" },
];

const AI_BUDDIES = [
  { 
    id: 1, 
    name: "Alex Kim", 
    avatar: "https://randomuser.me/api/portraits/men/45.jpg", 
    subject: "Mathematics", 
    rating: 4.8,
    isAI: true,
    students: 245,
    sessions: 1243
  },
  { 
    id: 2, 
    name: "Morgan Chen", 
    avatar: "https://randomuser.me/api/portraits/women/32.jpg", 
    subject: "Computer Science", 
    rating: 4.9,
    isAI: true,
    students: 312,
    sessions: 1578
  },
  { 
    id: 3, 
    name: "Jamie Singh", 
    avatar: "https://randomuser.me/api/portraits/men/23.jpg", 
    subject: "Physics", 
    rating: 4.7,
    isAI: true,
    students: 187,
    sessions: 876
  },
  { 
    id: 4, 
    name: "Taylor Patel", 
    avatar: "https://randomuser.me/api/portraits/women/19.jpg", 
    subject: "Chemistry", 
    rating: 4.6,
    isAI: true,
    students: 156,
    sessions: 721
  },
];

const HUMAN_BUDDIES = [
  { 
    id: 5, 
    name: "Sophia Rodriguez", 
    avatar: "https://randomuser.me/api/portraits/women/44.jpg", 
    subject: "Biology", 
    rating: 4.5,
    isAI: false,
    availability: "Weekends",
    experience: "Med student, 3+ years tutoring"
  },
  { 
    id: 6, 
    name: "Marcus Johnson", 
    avatar: "https://randomuser.me/api/portraits/men/32.jpg", 
    subject: "Computer Science", 
    rating: 4.7,
    isAI: false,
    availability: "Evenings",
    experience: "Software engineer, ML specialist"
  },
  { 
    id: 7, 
    name: "Emma Davis", 
    avatar: "https://randomuser.me/api/portraits/women/67.jpg", 
    subject: "Literature", 
    rating: 4.9,
    isAI: false,
    availability: "Flexible",
    experience: "PhD candidate in English"
  },
  { 
    id: 8, 
    name: "Jamal Wilson", 
    avatar: "https://randomuser.me/api/portraits/men/54.jpg", 
    subject: "Economics", 
    rating: 4.8,
    isAI: false,
    availability: "Weekdays",
    experience: "Finance professional, 5 years teaching"
  },
];

const FOCUS_TECHNIQUES = [
  { id: 1, name: "Pomodoro Technique", description: "25 minutes focus, 5 minutes break", icon: <Timer className="w-6 h-6" /> },
  { id: 2, name: "Deep Work", description: "90 minutes of uninterrupted focus", icon: <Brain className="w-6 h-6" /> },
  { id: 3, name: "Time Blocking", description: "Schedule specific tasks in blocks", icon: <Calendar className="w-6 h-6" /> },
];

const StudyBuddy = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [activeTab, setActiveTab] = useState("find");
  const [isLoading, setIsLoading] = useState(false);
  const [joinedBuddies, setJoinedBuddies] = useState<number[]>([]);

  const handleFindBuddy = (buddyId: number) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/study-session/new", { state: { buddyId } });
    }, 1000);
  };

  const handleJoinBuddy = (buddyId: number) => {
    setJoinedBuddies(prev => {
      if (prev.includes(buddyId)) {
        return prev.filter(id => id !== buddyId);
      } else {
        return [...prev, buddyId];
      }
    });
  };

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex justify-between items-center w-full max-w-5xl mb-8">
          <div className="flex-start gap-3 justify-start">
            <Book className="w-8 h-8 text-primary-500" />
            <h2 className="h3-bold md:h2-bold text-left w-full">Study Buddy</h2>
          </div>
          <Button 
            className="shad-button_primary flex items-center gap-2"
            onClick={() => navigate("/study-session/new")}
          >
            <Plus className="w-4 h-4" />
            New Session
          </Button>
        </div>

        {/* Tabs */}
        <div className="bg-dark-3 rounded-lg p-2 flex w-full max-w-md mb-8">
          <button 
            className={`flex-1 py-2 px-4 rounded-md transition-all ${activeTab === 'find' ? 'bg-primary-500 text-light-1' : 'text-light-2 hover:text-light-1'}`}
            onClick={() => setActiveTab('find')}
          >
            Find Buddy
          </button>
          <button 
            className={`flex-1 py-2 px-4 rounded-md transition-all ${activeTab === 'my' ? 'bg-primary-500 text-light-1' : 'text-light-2 hover:text-light-1'}`}
            onClick={() => setActiveTab('my')}
          >
            My Sessions
          </button>
          <button 
            className={`flex-1 py-2 px-4 rounded-md transition-all ${activeTab === 'notes' ? 'bg-primary-500 text-light-1' : 'text-light-2 hover:text-light-1'}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
        </div>

        {activeTab === 'find' && (
          <div className="w-full max-w-5xl">
            {/* Search and filter section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 flex gap-2 p-2 border border-dark-4 rounded-lg bg-dark-3">
                <Search className="w-6 h-6 text-light-3" />
                <input 
                  type="text"
                  placeholder="Search by subject or exam..."
                  className="bg-transparent border-none outline-none text-light-1 w-full"
                />
              </div>
              <select 
                className="p-2 rounded-lg bg-dark-3 border border-dark-4 text-light-1 outline-none"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">All Subjects</option>
                {SUBJECTS.map(subject => (
                  <option key={subject.id} value={subject.name}>{subject.name}</option>
                ))}
              </select>
            </div>

            {/* AI Study Buddies */}
            <h3 className="h4-medium mb-4 text-light-1 flex items-center gap-2">
              AI Study Buddies
              <span className="text-xs py-1 px-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full">
                Enhanced with AI
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {AI_BUDDIES.map(buddy => (
                <motion.div 
                  key={buddy.id}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-dark-3 rounded-xl p-4 flex flex-col items-center cursor-pointer border border-dark-4 hover:border-primary-500 transition-all"
                >
                  <div className="relative">
                    <img 
                      src={buddy.avatar} 
                      alt={buddy.name}
                      className="w-24 h-24 rounded-full mb-3 object-cover border-2 border-primary-500"
                    />
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs rounded-full px-2 py-1">
                      AI
                    </div>
                  </div>
                  <h4 className="font-bold text-light-1 text-lg">{buddy.name}</h4>
                  <p className="text-light-3 text-sm">{buddy.subject} Expert</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-light-2 ml-1">{buddy.rating}</span>
                    <span className="text-light-3 text-xs ml-2">({buddy.students} students)</span>
                  </div>
                  
                  <div className="w-full border-t border-dark-4 my-3"></div>
                  
                  <div className="flex justify-between w-full text-xs text-light-3 mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {buddy.students} students
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {buddy.sessions} sessions
                    </span>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-light-1 py-2 rounded-lg flex items-center justify-center gap-2 hover:from-primary-600 hover:to-secondary-600"
                    onClick={() => handleFindBuddy(buddy.id)}
                  >
                    Study Together
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Human Study Buddies */}
            <h3 className="h4-medium mb-4 text-light-1 flex items-center gap-2">
              Peer Study Buddies
              <span className="text-xs py-1 px-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-full">
                Real Students
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {HUMAN_BUDDIES.map(buddy => (
                <motion.div 
                  key={buddy.id}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-dark-3 rounded-xl p-4 flex flex-col items-center border border-dark-4 hover:border-secondary-500 transition-all"
                >
                  <div className="relative">
                    <img 
                      src={buddy.avatar} 
                      alt={buddy.name}
                      className="w-24 h-24 rounded-full mb-3 object-cover border-2 border-secondary-500"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-dark-2 ${
                      buddy.id % 2 === 0 ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
                  <h4 className="font-bold text-light-1 text-lg">{buddy.name}</h4>
                  <p className="text-light-3 text-sm">{buddy.subject} Specialist</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">★</span>
                    <span className="text-light-2 ml-1">{buddy.rating}</span>
                  </div>
                  
                  <div className="w-full border-t border-dark-4 my-3"></div>
                  
                  <div className="w-full text-xs text-light-3 mb-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Clock className="w-3 h-3" /> Available: {buddy.availability}
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" /> {buddy.experience}
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      joinedBuddies.includes(buddy.id)
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-dark-4 hover:bg-dark-4/80"
                    } text-light-1 py-2 rounded-lg flex items-center justify-center gap-2 transition-all`}
                    onClick={() => handleJoinBuddy(buddy.id)}
                  >
                    {joinedBuddies.includes(buddy.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Connected
                      </>
                    ) : (
                      <>
                        Connect
                        <Users className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Focus Techniques */}
            <h3 className="h4-medium mb-4 text-light-1">Deep Work Focus Techniques</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {FOCUS_TECHNIQUES.map(technique => (
                <motion.div 
                  key={technique.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-dark-3 rounded-xl p-4 border border-dark-4 hover:border-primary-500 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary-500/20 rounded-lg text-primary-500">
                      {technique.icon}
                    </div>
                    <h4 className="font-bold text-light-1">{technique.name}</h4>
                  </div>
                  <p className="text-light-3 text-sm">{technique.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Find a study buddy form */}
            <div className="bg-dark-3 rounded-xl p-6 border border-dark-4 mb-8">
              <h3 className="h4-medium mb-4 text-light-1">Find a Study Buddy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-light-2 mb-2">Subject</label>
                  <select 
                    className="w-full p-2 rounded-lg bg-dark-2 border border-dark-4 text-light-1 outline-none"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">Select Subject</option>
                    {SUBJECTS.map(subject => (
                      <option key={subject.id} value={subject.name}>{subject.icon} {subject.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-light-2 mb-2">Study Goal</label>
                  <input 
                    type="text"
                    placeholder="e.g., Calculus Exam Prep"
                    className="w-full p-2 rounded-lg bg-dark-2 border border-dark-4 text-light-1 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-light-2 mb-2">Preferred Time</label>
                  <input 
                    type="datetime-local"
                    className="w-full p-2 rounded-lg bg-dark-2 border border-dark-4 text-light-1 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-light-2 mb-2">Session Duration</label>
                  <select 
                    className="w-full p-2 rounded-lg bg-dark-2 border border-dark-4 text-light-1 outline-none"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>
              <Button 
                className="w-full shad-button_primary mt-4"
                onClick={() => handleFindBuddy(0)}
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Find Study Buddy"}
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'my' && (
          <div className="w-full max-w-5xl">
            <div className="bg-dark-3 rounded-xl p-6 border border-dark-4 mb-6">
              <h3 className="h4-medium mb-4 text-light-1">Upcoming Sessions</h3>
              <div className="space-y-4">
                <div className="bg-dark-2 p-4 rounded-lg border border-dark-4 hover:border-primary-500 transition-all flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-light-1">Calculus Final Exam Prep</h4>
                    <div className="flex items-center gap-3 mt-2 text-light-3 text-sm">
                      <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> Today, 3:00 PM</div>
                      <div className="flex items-center gap-1"><Users className="w-4 h-4" /> With Alex</div>
                    </div>
                  </div>
                  <Button className="shad-button_primary">Join</Button>
                </div>
                <div className="bg-dark-2 p-4 rounded-lg border border-dark-4 hover:border-primary-500 transition-all flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-light-1">Python Programming Group</h4>
                    <div className="flex items-center gap-3 mt-2 text-light-3 text-sm">
                      <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> Tomorrow, 5:00 PM</div>
                      <div className="flex items-center gap-1"><Users className="w-4 h-4" /> With Morgan & 2 others</div>
                    </div>
                  </div>
                  <Button className="shad-button_primary">Join</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="w-full max-w-5xl">
            <div className="bg-dark-3 rounded-xl p-6 border border-dark-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="h4-medium text-light-1">Study Notes</h3>
                <Button className="bg-primary-500 text-light-1 gap-2">
                  <FileText className="w-4 h-4" />
                  New Note
                </Button>
              </div>
              <div className="space-y-4">
                <div className="bg-dark-2 p-4 rounded-lg border border-dark-4 hover:border-primary-500 transition-all cursor-pointer">
                  <h4 className="font-bold text-light-1">Calculus Integration Techniques</h4>
                  <p className="text-light-3 text-sm mt-1 line-clamp-2">Notes from session with Alex covering substitution, integration by parts, and trigonometric integrals...</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-light-3 text-xs">Last edited: Yesterday</span>
                    <span className="text-primary-500 text-xs">8 pages</span>
                  </div>
                </div>
                <div className="bg-dark-2 p-4 rounded-lg border border-dark-4 hover:border-primary-500 transition-all cursor-pointer">
                  <h4 className="font-bold text-light-1">Python Data Structures</h4>
                  <p className="text-light-3 text-sm mt-1 line-clamp-2">Overview of lists, dictionaries, sets, and tuples with examples and performance characteristics...</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-light-3 text-xs">Last edited: 2 days ago</span>
                    <span className="text-primary-500 text-xs">5 pages</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyBuddy; 