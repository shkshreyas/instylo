import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Clock, Users, Book, Send, Paperclip, FileText, 
  Timer, ChevronLeft, Zap, Brain, Download,
  MicOff, Mic, Video, VideoOff, MoreVertical, Share, Save
} from "lucide-react";

import { Button } from "@/components/ui";

// Sample data for demo
const SESSION_DATA = {
  id: "new",
  title: "Calculus Final Exam Prep",
  subject: "Mathematics",
  buddy: {
    name: "Alex",
    avatar: "/assets/icons/buddy-1.svg"
  },
  startTime: new Date(),
  duration: 60, // minutes
};

const SAMPLE_MESSAGES = [
  {
    id: 1,
    sender: "system",
    text: "Study session started. Your study buddy Alex is here to help you with Calculus.",
    timestamp: new Date().setMinutes(new Date().getMinutes() - 15)
  },
  {
    id: 2,
    sender: "buddy",
    text: "Hi there! I'm Alex, your study buddy for Calculus. What specific topics would you like to focus on today?",
    timestamp: new Date().setMinutes(new Date().getMinutes() - 14)
  },
  {
    id: 3,
    sender: "user",
    text: "Hi Alex! I'm preparing for my final exam and need help with integration techniques.",
    timestamp: new Date().setMinutes(new Date().getMinutes() - 12)
  },
  {
    id: 4,
    sender: "buddy",
    text: "Great choice! Integration is often challenging. Let's start with the basic techniques: substitution, integration by parts, and partial fractions. Which one would you like to begin with?",
    timestamp: new Date().setMinutes(new Date().getMinutes() - 10)
  }
];

const FOCUS_TECHNIQUES = [
  { id: 1, name: "Pomodoro", workMinutes: 25, breakMinutes: 5, icon: <Timer className="w-5 h-5" /> },
  { id: 2, name: "Deep Work", workMinutes: 90, breakMinutes: 15, icon: <Brain className="w-5 h-5" /> },
  { id: 3, name: "50/10", workMinutes: 50, breakMinutes: 10, icon: <Zap className="w-5 h-5" /> },
];

const StudySession = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [notes, setNotes] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState(FOCUS_TECHNIQUES[0]);
  const [timeRemaining, setTimeRemaining] = useState(selectedTechnique.workMinutes * 60);
  const [isBreak, setIsBreak] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up - switch between work and break
            const audio = new Audio("/assets/sounds/timer-end.mp3");
            audio.play();
            setIsBreak(!isBreak);
            return isBreak 
              ? selectedTechnique.workMinutes * 60 
              : selectedTechnique.breakMinutes * 60;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive, isBreak, selectedTechnique]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      // Generate AI response
      let response;
      const lowerMessage = inputMessage.toLowerCase();
      
      if (lowerMessage.includes("integral") || lowerMessage.includes("integration")) {
        response = "For integration by parts, remember the formula: ∫u(x)v'(x)dx = u(x)v(x) - ∫v(x)u'(x)dx. The key is choosing u and v wisely. Try applying this to ∫x·ln(x)dx by setting u = ln(x) and v' = x.";
      } else if (lowerMessage.includes("derivative") || lowerMessage.includes("differentiation")) {
        response = "Remember that the power rule for differentiation is d/dx(xⁿ) = n·xⁿ⁻¹. For composite functions like sin(x²), use the chain rule: d/dx[sin(x²)] = cos(x²)·d/dx(x²) = 2x·cos(x²).";
      } else if (lowerMessage.includes("limit")) {
        response = "When dealing with limits, especially indeterminate forms like 0/0 or ∞/∞, L'Hôpital's rule is very useful. It states that lim[f(x)/g(x)] = lim[f'(x)/g'(x)] when both f(x) and g(x) approach 0 or ∞.";
      } else if (lowerMessage.includes("thank")) {
        response = "You're welcome! Is there anything else you'd like to review about calculus?";
      } else {
        response = "That's a good question about calculus. Let's break it down step by step. Would you like me to show you some example problems related to this concept?";
      }

      const buddyMessage = {
        id: messages.length + 2,
        sender: "buddy",
        text: response,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, buddyMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Add file message
    const fileMessage = {
      id: messages.length + 1,
      sender: "user",
      text: `Shared file: ${file.name}`,
      file: {
        name: file.name,
        type: file.type,
        size: file.size
      },
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, fileMessage]);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Simulate response to file
    setIsLoading(true);
    setTimeout(() => {
      const buddyMessage = {
        id: messages.length + 2,
        sender: "buddy",
        text: `I've received your file "${file.name}". Let me take a look at it. Is there anything specific you'd like me to explain from this document?`,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, buddyMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setIsBreak(false);
    setTimeRemaining(selectedTechnique.workMinutes * 60);
  };

  const changeTechnique = (technique: typeof FOCUS_TECHNIQUES[0]) => {
    setSelectedTechnique(technique);
    setTimeRemaining(technique.workMinutes * 60);
    setIsBreak(false);
    setTimerActive(false);
  };

  const saveNotes = () => {
    // In a real app, this would save to a database
    alert("Notes saved successfully!");
  };

  return (
    <div className="flex flex-1 flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="bg-dark-2 p-4 border-b border-dark-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/study-buddy')}
            className="p-2 rounded-full hover:bg-dark-4 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-light-2" />
          </button>
          <div>
            <h2 className="h3-bold text-light-1">{SESSION_DATA.title}</h2>
            <div className="flex items-center gap-4 text-light-3 text-sm">
              <div className="flex items-center gap-1">
                <Book className="w-4 h-4" /> 
                {SESSION_DATA.subject}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> 
                {SESSION_DATA.duration} minutes
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" /> 
                With {SESSION_DATA.buddy.name}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-2 rounded-full ${isVideoOn ? 'bg-primary-500 text-white' : 'bg-dark-4 text-light-2'} hover:opacity-80 transition-all`}
            title={isVideoOn ? "Turn off video" : "Turn on video"}
          >
            {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2 rounded-full ${isRecording ? 'bg-primary-500 text-white' : 'bg-dark-4 text-light-2'} hover:opacity-80 transition-all`}
            title={isRecording ? "Mute" : "Unmute"}
          >
            {isRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <button 
            className="p-2 rounded-full bg-dark-4 text-light-2 hover:opacity-80 transition-all"
            title="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-dark-3 px-4 border-b border-dark-4">
            <div className="flex max-w-md">
              <button 
                className={`py-3 px-4 font-medium transition-all border-b-2 ${activeTab === 'chat' ? 'border-primary-500 text-primary-500' : 'border-transparent text-light-3'}`}
                onClick={() => setActiveTab('chat')}
              >
                Chat
              </button>
              <button 
                className={`py-3 px-4 font-medium transition-all border-b-2 ${activeTab === 'notes' ? 'border-primary-500 text-primary-500' : 'border-transparent text-light-3'}`}
                onClick={() => setActiveTab('notes')}
              >
                Notes
              </button>
              <button 
                className={`py-3 px-4 font-medium transition-all border-b-2 ${activeTab === 'resources' ? 'border-primary-500 text-primary-500' : 'border-transparent text-light-3'}`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
            </div>
          </div>

          {/* Chat content */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.sender !== 'user' && message.sender !== 'system' && (
                      <img 
                        src={SESSION_DATA.buddy.avatar} 
                        alt="Buddy"
                        className="w-8 h-8 rounded-full mr-2 mt-1"
                      />
                    )}
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-primary-500 text-white' 
                          : message.sender === 'system'
                            ? 'bg-dark-3 text-light-3 max-w-full text-center text-sm py-2'
                            : 'bg-dark-3 text-light-1'
                      }`}
                    >
                      {message.text}
                      {'file' in message && (
                        <div className="mt-2 p-2 bg-dark-4 rounded flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">{(message as any).file.name}</span>
                        </div>
                      )}
                      <div className="text-xs mt-1 opacity-70 text-right">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <img 
                      src={SESSION_DATA.buddy.avatar} 
                      alt="Buddy"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div className="bg-dark-3 p-3 rounded-lg">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-light-3 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-light-3 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-light-3 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 border-t border-dark-4 bg-dark-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleFileUpload}
                    className="p-2 rounded-full bg-dark-4 text-light-2 hover:bg-dark-3 transition-all"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-dark-3 border border-dark-4 rounded-lg px-4 py-2 text-light-1 focus:outline-none focus:border-primary-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-500/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notes content */}
          {activeTab === 'notes' && (
            <div className="flex-1 p-4 flex flex-col">
              <div className="mb-4 flex justify-between">
                <h3 className="text-light-1 font-semibold">Session Notes</h3>
                <div className="flex gap-2">
                  <Button 
                    className="bg-dark-4 hover:bg-dark-3 text-light-1 flex items-center gap-1 px-3 py-1 rounded text-sm"
                    onClick={saveNotes}
                  >
                    <Save className="w-4 h-4" /> Save
                  </Button>
                  <Button className="bg-dark-4 hover:bg-dark-3 text-light-1 flex items-center gap-1 px-3 py-1 rounded text-sm">
                    <Download className="w-4 h-4" /> Export
                  </Button>
                  <Button className="bg-dark-4 hover:bg-dark-3 text-light-1 flex items-center gap-1 px-3 py-1 rounded text-sm">
                    <Share className="w-4 h-4" /> Share
                  </Button>
                </div>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Take notes during your study session here..."
                className="flex-1 bg-dark-3 border border-dark-4 rounded-lg p-4 text-light-1 focus:outline-none focus:border-primary-500 resize-none"
              />
            </div>
          )}

          {/* Resources content */}
          {activeTab === 'resources' && (
            <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="text-light-1 font-semibold mb-4">Study Resources</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-dark-3 p-4 rounded-lg border border-dark-4 hover:border-primary-500 transition-all cursor-pointer">
                  <h4 className="font-bold text-light-1">Calculus Cheat Sheet</h4>
                  <p className="text-light-3 text-sm mt-1">Essential formulas and concepts for integration and differentiation</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-light-3">PDF • 2 pages</span>
                    <Button className="bg-dark-4 hover:bg-dark-3 text-light-1 flex items-center gap-1 px-2 py-1 rounded text-xs">
                      <Download className="w-3 h-3" /> Download
                    </Button>
                  </div>
                </div>
                
                <div className="bg-dark-3 p-4 rounded-lg border border-dark-4 hover:border-primary-500 transition-all cursor-pointer">
                  <h4 className="font-bold text-light-1">Integration Practice Problems</h4>
                  <p className="text-light-3 text-sm mt-1">50 practice problems with step-by-step solutions</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-light-3">PDF • 10 pages</span>
                    <Button className="bg-dark-4 hover:bg-dark-3 text-light-1 flex items-center gap-1 px-2 py-1 rounded text-xs">
                      <Download className="w-3 h-3" /> Download
                    </Button>
                  </div>
                </div>
              </div>
              
              <h4 className="font-semibold text-light-2 mb-3">Recommended Videos</h4>
              <div className="space-y-3">
                <div className="bg-dark-3 p-3 rounded-lg border border-dark-4 hover:border-primary-500 transition-all flex gap-3 cursor-pointer">
                  <div className="w-24 h-16 bg-dark-4 rounded flex-shrink-0 flex items-center justify-center">
                    <Video className="w-6 h-6 text-light-3" />
                  </div>
                  <div>
                    <h5 className="font-medium text-light-1">Integration by Parts Explained</h5>
                    <p className="text-light-3 text-xs mt-1">Learn the technique with clear examples</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-light-3">12:45</span>
                      <span className="text-xs text-light-3">•</span>
                      <span className="text-xs text-light-3">Khan Academy</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-dark-3 p-3 rounded-lg border border-dark-4 hover:border-primary-500 transition-all flex gap-3 cursor-pointer">
                  <div className="w-24 h-16 bg-dark-4 rounded flex-shrink-0 flex items-center justify-center">
                    <Video className="w-6 h-6 text-light-3" />
                  </div>
                  <div>
                    <h5 className="font-medium text-light-1">Partial Fractions Decomposition</h5>
                    <p className="text-light-3 text-xs mt-1">Master this powerful integration technique</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-light-3">18:22</span>
                      <span className="text-xs text-light-3">•</span>
                      <span className="text-xs text-light-3">Professor Leonard</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="w-72 border-l border-dark-4 bg-dark-2 flex flex-col">
          {/* Focus Timer */}
          <div className="p-4 border-b border-dark-4">
            <h3 className="text-light-1 font-semibold mb-4">Focus Timer</h3>
            <div className="flex justify-center mb-4">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center text-2xl font-bold 
                ${isBreak ? 'bg-green-900/20 text-green-500' : 'bg-primary-500/20 text-primary-500'}`}>
                {formatTime(timeRemaining)}
              </div>
            </div>
            <div className="text-center mb-3">
              <span className={`text-sm font-medium ${isBreak ? 'text-green-500' : 'text-primary-500'}`}>
                {isBreak ? 'Break Time' : 'Focus Time'}
              </span>
            </div>
            <div className="flex justify-center gap-2 mb-4">
              <Button 
                className={`px-4 py-1 rounded ${timerActive 
                  ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                  : 'bg-primary-500 text-white hover:bg-primary-500/80'}`}
                onClick={toggleTimer}
              >
                {timerActive ? 'Pause' : 'Start'}
              </Button>
              <Button 
                className="px-3 py-1 rounded bg-dark-4 text-light-2 hover:bg-dark-3"
                onClick={resetTimer}
              >
                Reset
              </Button>
            </div>
            
            <div className="space-y-2">
              {FOCUS_TECHNIQUES.map(technique => (
                <div 
                  key={technique.id}
                  className={`p-2 rounded flex items-center gap-2 cursor-pointer transition-all
                    ${selectedTechnique.id === technique.id 
                      ? 'bg-primary-500/20 text-primary-500' 
                      : 'bg-dark-3 text-light-3 hover:bg-dark-4'}`}
                  onClick={() => changeTechnique(technique)}
                >
                  <div className={`p-1 rounded ${selectedTechnique.id === technique.id ? 'bg-primary-500/20' : 'bg-dark-4'}`}>
                    {technique.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{technique.name}</div>
                    <div className="text-xs opacity-80">{technique.workMinutes}m work / {technique.breakMinutes}m break</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Study Buddy */}
          <div className="p-4 border-b border-dark-4">
            <h3 className="text-light-1 font-semibold mb-3">Your Study Buddy</h3>
            <div className="flex flex-col items-center">
              <img 
                src={SESSION_DATA.buddy.avatar} 
                alt={SESSION_DATA.buddy.name} 
                className="w-16 h-16 rounded-full mb-2"
              />
              <h4 className="font-medium text-light-1">{SESSION_DATA.buddy.name}</h4>
              <p className="text-light-3 text-sm">Calculus Expert</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500">★★★★</span>
                <span className="text-yellow-500/50">★</span>
                <span className="text-light-3 text-xs ml-1">4.8</span>
              </div>
            </div>
          </div>
          
          {/* Session Progress */}
          <div className="p-4">
            <h3 className="text-light-1 font-semibold mb-3">Session Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-light-3">Time Elapsed</span>
                  <span className="text-sm text-light-1">15:24</span>
                </div>
                <div className="h-2 bg-dark-4 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-light-3">Focus Sessions</span>
                  <span className="text-sm text-light-1">2/4</span>
                </div>
                <div className="h-2 bg-dark-4 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-light-3">Topics Covered</span>
                  <span className="text-sm text-light-1">1/3</span>
                </div>
                <div className="h-2 bg-dark-4 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySession; 