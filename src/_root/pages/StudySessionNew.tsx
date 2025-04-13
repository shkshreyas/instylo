import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Clock, ArrowRight, Check, Search,
  Calendar, Brain, Timer, FileText,
  Play, Pause, RotateCcw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui";
import { Loader } from "@/components/shared";

const SUBJECTS = [
  { id: 1, name: "Mathematics", icon: "🧮", categories: ["Calculus", "Algebra", "Geometry", "Statistics"] },
  { id: 2, name: "Computer Science", icon: "💻", categories: ["Programming", "Algorithms", "Data Structures", "AI"] },
  { id: 3, name: "Physics", icon: "⚛️", categories: ["Mechanics", "Electricity", "Thermodynamics", "Quantum"] },
  { id: 4, name: "Chemistry", icon: "🧪", categories: ["Organic", "Inorganic", "Physical", "Biochemistry"] },
  { id: 5, name: "Biology", icon: "🧬", categories: ["Cellular", "Genetics", "Ecology", "Physiology"] },
  { id: 6, name: "Literature", icon: "📚", categories: ["Poetry", "Drama", "Fiction", "Essays"] },
];

const AI_BUDDIES = [
  { id: 1, name: "Alex", avatar: "https://randomuser.me/api/portraits/men/42.jpg", expertise: ["Mathematics", "Physics"], rating: 4.8 },
  { id: 2, name: "Morgan", avatar: "https://randomuser.me/api/portraits/women/32.jpg", expertise: ["Computer Science", "Mathematics"], rating: 4.9 },
  { id: 3, name: "Jamie", avatar: "https://randomuser.me/api/portraits/men/56.jpg", expertise: ["Physics", "Chemistry"], rating: 4.7 },
  { id: 4, name: "Taylor", avatar: "https://randomuser.me/api/portraits/women/63.jpg", expertise: ["Chemistry", "Biology"], rating: 4.6 },
  { id: 5, name: "Jordan", avatar: "https://randomuser.me/api/portraits/men/79.jpg", expertise: ["Literature", "History"], rating: 4.5 },
  { id: 6, name: "Riley", avatar: "https://randomuser.me/api/portraits/women/82.jpg", expertise: ["Mathematics", "Computer Science"], rating: 4.7 },
];

const FOCUS_TECHNIQUES = [
  { id: 1, name: "Pomodoro Technique", description: "25 minutes focus, 5 minutes break", icon: <Timer className="w-5 h-5" /> },
  { id: 2, name: "Deep Work", description: "90 minutes of uninterrupted focus", icon: <Brain className="w-5 h-5" /> },
  { id: 3, name: "Time Blocking", description: "Schedule specific tasks in blocks", icon: <Calendar className="w-5 h-5" /> },
];

const DURATIONS = [
  { id: 1, value: 30, label: "30 minutes" },
  { id: 2, value: 60, label: "1 hour" },
  { id: 3, value: 90, label: "1.5 hours" },
  { id: 4, value: 120, label: "2 hours" },
  { id: 5, value: 180, label: "3 hours" },
];

const StudySessionNew = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<typeof SUBJECTS[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [studyGoal, setStudyGoal] = useState("");
  const [selectedBuddy, setSelectedBuddy] = useState<typeof AI_BUDDIES[0] | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedTechnique, setSelectedTechnique] = useState<typeof FOCUS_TECHNIQUES[0] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // New states for session timer
  const [sessionStarted, setSessionStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        
        // Calculate progress percentage
        if (selectedDuration > 0) {
          const progressPercent = Math.min((seconds + 1) / (selectedDuration * 60) * 100, 100);
          setSessionProgress(progressPercent);
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, selectedDuration]);

  // Format time for display
  const formatTime = () => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle timer controls
  const startTimer = () => {
    setIsActive(true);
  };
  
  const pauseTimer = () => {
    setIsActive(false);
  };
  
  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
    setSessionProgress(0);
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleCreateSession();
    }
  };

  const handleBack = () => {
    if (sessionStarted) {
      if (window.confirm("Are you sure you want to end this study session?")) {
        setSessionStarted(false);
        resetTimer();
      }
    } else if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/study-buddy");
    }
  };

  const handleCreateSession = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSessionStarted(true);
      startTimer();
    }, 1500);
  };

  const isNextDisabled = () => {
    if (step === 1) return !selectedSubject || !selectedCategory;
    if (step === 2) return !selectedBuddy;
    if (step === 3) return !selectedTime || !selectedDuration;
    return false;
  };

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl mb-8">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-dark-4 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-light-2" />
          </button>
          <h2 className="h3-bold md:h2-bold text-left w-full">
            {sessionStarted ? "Active Study Session" : "Create Study Session"}
          </h2>
        </div>

        {!sessionStarted ? (
          <>
            {/* Progress bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex flex-col items-center relative">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10
                        ${s < step ? 'bg-primary-500 text-white' : 
                          s === step ? 'bg-primary-500 text-white' : 
                          'bg-dark-4 text-light-3'}`}
                    >
                      {s < step ? <Check className="w-5 h-5" /> : s}
                    </div>
                    <span className={`text-sm mt-2 ${s <= step ? 'text-light-1' : 'text-light-3'}`}>
                      {s === 1 ? 'Subject' : s === 2 ? 'Buddy' : s === 3 ? 'Scheduling' : 'Review'}
                    </span>
                    {s < 4 && (
                      <div className={`absolute top-5 left-10 w-[calc(100%-40px)] h-0.5 
                        ${s < step ? 'bg-primary-500' : 'bg-dark-4'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step content */}
            <div className="max-w-3xl mx-auto bg-dark-3 rounded-xl p-6 border border-dark-4">
              {/* Step 1: Subject Selection */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="h4-medium mb-4 text-light-1">What would you like to study?</h3>
                  
                  <div className="mb-6">
                    <label className="block text-light-2 mb-2">Select Subject</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {SUBJECTS.map((subject) => (
                        <div
                          key={subject.id}
                          className={`p-4 rounded-lg cursor-pointer border transition-all
                            ${selectedSubject?.id === subject.id 
                              ? 'bg-primary-500/20 border-primary-500' 
                              : 'bg-dark-4 border-dark-4 hover:border-primary-500/50'}`}
                          onClick={() => {
                            setSelectedSubject(subject);
                            setSelectedCategory("");
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{subject.icon}</span>
                            <span className="font-medium text-light-1">{subject.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedSubject && (
                    <div className="mb-6">
                      <label className="block text-light-2 mb-2">Select Category</label>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedSubject.categories.map((category) => (
                          <div
                            key={category}
                            className={`p-3 rounded-lg cursor-pointer border transition-all
                              ${selectedCategory === category 
                                ? 'bg-primary-500/20 border-primary-500' 
                                : 'bg-dark-4 border-dark-4 hover:border-primary-500/50'}`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            <span className="font-medium text-light-1">{category}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label className="block text-light-2 mb-2">Study Goal</label>
                    <input
                      type="text"
                      value={studyGoal}
                      onChange={(e) => setStudyGoal(e.target.value)}
                      placeholder="e.g., Prepare for calculus exam, learn React.js, etc."
                      className="w-full p-3 rounded-lg bg-dark-2 border border-dark-4 text-light-1 outline-none focus:border-primary-500"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Study Buddy Selection */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="h4-medium mb-4 text-light-1">Choose Your Study Buddy</h3>
                  
                  <div className="mb-4 flex gap-2 p-2 border border-dark-4 rounded-lg bg-dark-2">
                    <Search className="w-5 h-5 text-light-3" />
                    <input 
                      type="text"
                      placeholder="Search for buddies..."
                      className="bg-transparent border-none outline-none text-light-1 w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {AI_BUDDIES.filter(buddy => 
                      !selectedSubject || buddy.expertise.includes(selectedSubject.name)
                    ).map((buddy) => (
                      <div
                        key={buddy.id}
                        className={`p-4 rounded-lg cursor-pointer border transition-all
                          ${selectedBuddy?.id === buddy.id 
                            ? 'bg-primary-500/20 border-primary-500' 
                            : 'bg-dark-4 border-dark-4 hover:border-primary-500/50'}`}
                        onClick={() => setSelectedBuddy(buddy)}
                      >
                        <div className="flex flex-col items-center">
                          <img 
                            src={buddy.avatar} 
                            alt={buddy.name}
                            className="w-16 h-16 rounded-full mb-2"
                          />
                          <h4 className="font-bold text-light-1">{buddy.name}</h4>
                          <p className="text-light-3 text-xs mb-1">{buddy.expertise.join(", ")}</p>
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="text-light-2 ml-1">{buddy.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-light-3 text-sm mb-4">
                    {selectedSubject 
                      ? `Showing AI study buddies specialized in ${selectedSubject.name}.` 
                      : "All available AI study buddies."}
                  </p>
                </motion.div>
              )}

              {/* Step 3: Scheduling */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="h4-medium mb-4 text-light-1">Schedule Your Study Session</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-light-2 mb-2">Date & Time</label>
                      <input 
                        type="datetime-local"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full p-3 rounded-lg bg-dark-2 border border-dark-4 text-light-1 outline-none focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-light-2 mb-2">Duration</label>
                      <select 
                        className="w-full p-3 rounded-lg bg-dark-2 border border-dark-4 text-light-1 outline-none focus:border-primary-500"
                        value={selectedDuration}
                        onChange={(e) => setSelectedDuration(Number(e.target.value))}
                      >
                        {DURATIONS.map(duration => (
                          <option key={duration.id} value={duration.value}>{duration.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-light-2 mb-4">Focus Technique</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {FOCUS_TECHNIQUES.map((technique) => (
                        <div
                          key={technique.id}
                          className={`p-3 rounded-lg cursor-pointer border transition-all flex items-center gap-2
                            ${selectedTechnique?.id === technique.id 
                              ? 'bg-primary-500/20 border-primary-500' 
                              : 'bg-dark-4 border-dark-4 hover:border-primary-500/50'}`}
                          onClick={() => setSelectedTechnique(technique)}
                        >
                          <div className={`p-2 rounded-full ${selectedTechnique?.id === technique.id ? 'bg-primary-500/20' : 'bg-dark-3'}`}>
                            {technique.icon}
                          </div>
                          <div>
                            <div className="font-medium text-light-1">{technique.name}</div>
                            <div className="text-xs text-light-3">{technique.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-light-2 mb-2">Session Reminders</label>
                    <div className="flex items-center gap-2 mb-2">
                      <input 
                        type="checkbox" 
                        id="reminder-15" 
                        className="checkbox checkbox-primary"
                        defaultChecked
                      />
                      <label htmlFor="reminder-15" className="text-light-1">15 minutes before</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="reminder-calendar" 
                        className="checkbox checkbox-primary" 
                        defaultChecked
                      />
                      <label htmlFor="reminder-calendar" className="text-light-1">Add to calendar</label>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="h4-medium mb-4 text-light-1">Review & Confirm</h3>
                  
                  <div className="bg-dark-2 rounded-lg p-4 mb-6 border border-dark-4">
                    <h4 className="font-bold text-light-1 mb-3">Session Details</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-light-3">Subject:</span>
                        <span className="text-light-1 font-medium">
                          {selectedSubject?.name} - {selectedCategory}
                        </span>
                      </div>
                      
                      {studyGoal && (
                        <div className="flex justify-between">
                          <span className="text-light-3">Goal:</span>
                          <span className="text-light-1 font-medium">{studyGoal}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-light-3">Study Buddy:</span>
                        <span className="text-light-1 font-medium">{selectedBuddy?.name || "None"}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-light-3">Date & Time:</span>
                        <span className="text-light-1 font-medium">
                          {selectedTime ? new Date(selectedTime).toLocaleString() : "Not set"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-light-3">Duration:</span>
                        <span className="text-light-1 font-medium">
                          {selectedDuration === 60 
                            ? "1 hour" 
                            : selectedDuration < 60 
                              ? `${selectedDuration} minutes` 
                              : `${selectedDuration / 60} hours`}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-light-3">Focus Technique:</span>
                        <span className="text-light-1 font-medium">{selectedTechnique?.name || "None"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-dark-2 rounded-lg p-4 mb-6 border border-dark-4">
                    <h4 className="font-bold text-light-1 mb-3">Prepare for Your Session</h4>
                    <ul className="space-y-2 text-light-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary-500 mt-1" />
                        <span>Find a quiet, distraction-free environment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary-500 mt-1" />
                        <span>Prepare any necessary materials or books</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary-500 mt-1" />
                        <span>Have water and snacks nearby for breaks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary-500 mt-1" />
                        <span>Turn off notifications on other devices</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  className="shad-button_dark_4"
                  onClick={handleBack}
                >
                  {step === 1 ? "Cancel" : "Back"}
                </Button>
                <Button
                  className="shad-button_primary flex items-center gap-2"
                  onClick={handleNext}
                  disabled={isNextDisabled() || isLoading}
                >
                  {isLoading ? <Loader /> : (
                    <>
                      {step === 4 ? "Start Session" : "Continue"}
                      {!isLoading && <ArrowRight className="w-4 h-4" />}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto bg-dark-3 rounded-xl p-6 border border-dark-4"
            >
              {/* Active Session UI */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-500/20 rounded-full">
                    <Clock className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-light-1">Study Session in Progress</h3>
                    <p className="text-sm text-light-3">
                      {selectedSubject?.name} - {selectedCategory} with {selectedBuddy?.name}
                    </p>
                  </div>
                </div>
                <div className="bg-dark-4 px-3 py-1 rounded-full text-xs text-light-2">
                  {selectedTechnique?.name || "Focus Mode"}
                </div>
              </div>

              {/* Stopwatch Display */}
              <div className="flex flex-col items-center justify-center py-10">
                {/* Timer Circle */}
                <div className="relative w-64 h-64 mb-6">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#2A2C33"
                      strokeWidth="8"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#7857FF"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * sessionProgress) / 100}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-light-1">{formatTime()}</span>
                    <span className="text-light-3 text-sm mt-2">
                      {Math.floor(seconds / 60)} minutes of {selectedDuration} minutes
                    </span>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex gap-4">
                  <Button
                    className="bg-dark-4 hover:bg-dark-4/80 p-3 rounded-full"
                    onClick={resetTimer}
                  >
                    <RotateCcw className="w-5 h-5 text-light-1" />
                  </Button>
                  {isActive ? (
                    <Button
                      className="bg-primary-500 hover:bg-primary-600 p-3 rounded-full"
                      onClick={pauseTimer}
                    >
                      <Pause className="w-5 h-5 text-light-1" />
                    </Button>
                  ) : (
                    <Button
                      className="bg-primary-500 hover:bg-primary-600 p-3 rounded-full"
                      onClick={startTimer}
                    >
                      <Play className="w-5 h-5 text-light-1" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Session Details */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-dark-2 p-4 rounded-lg">
                  <h4 className="text-sm text-light-3 mb-1">Study Goal</h4>
                  <p className="text-light-1 font-medium">{studyGoal || "General Study Session"}</p>
                </div>
                <div className="bg-dark-2 p-4 rounded-lg">
                  <h4 className="text-sm text-light-3 mb-1">Focus Technique</h4>
                  <p className="text-light-1 font-medium">{selectedTechnique?.name || "Standard Focus"}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-between mt-8">
                <Button
                  className="shad-button_dark_4"
                  onClick={handleBack}
                >
                  End Session
                </Button>
                <Button
                  className="shad-button_primary flex items-center gap-2"
                  onClick={() => navigate("/study-buddy")}
                >
                  Take Notes
                  <FileText className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default StudySessionNew; 