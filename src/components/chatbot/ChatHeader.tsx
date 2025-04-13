import React from 'react';
import { Brain, Bot, User, BookOpen, Zap, Sun, BarChart2, Volume2 } from 'lucide-react';

interface ChatHeaderProps {
  setShowConversationMemory: (show: boolean) => void;
  setShowPromptLibrary: (show: boolean) => void;
  setShowToneSelector: (show: boolean) => void;
  isSpeaking: boolean;
  toggleSpeech: () => void;
  conversationMemory: string[];
  detectedUserInfo: {
    name?: string;
    interests?: string[];
  } | null;
  selectedTone: string;
  onClose: () => void;
  isFullScreen: boolean;
  toggleFullScreen: () => void;
  toggleSettings: () => void;
  downloadPDF: () => void;
  toggleMemoryPanel: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  setShowConversationMemory,
  setShowPromptLibrary,
  setShowToneSelector,
  isSpeaking,
  toggleSpeech,
  conversationMemory,
  detectedUserInfo,
  selectedTone,
}) => {
  // Context strength calculation - based on memory points and detected info
  const getContextStrength = () => {
    let points = 0;
    if (conversationMemory.length > 0) points += Math.min(conversationMemory.length, 5);
    if (detectedUserInfo?.name) points += 2;
    if (detectedUserInfo?.interests?.length) points += Math.min(detectedUserInfo.interests.length, 3);
    
    if (points >= 7) return { level: 'High', color: 'text-success' };
    if (points >= 3) return { level: 'Medium', color: 'text-warning' };
    return { level: 'Low', color: 'text-error' };
  };
  
  const contextStrength = getContextStrength();
  
  // Get tone icon and label
  const getToneInfo = () => {
    switch(selectedTone) {
      case 'friendly': return { icon: <User className="w-3 h-3 mr-1" />, label: 'Friendly' };
      case 'professional': return { icon: <BookOpen className="w-3 h-3 mr-1" />, label: 'Professional' };
      case 'enthusiastic': return { icon: <Zap className="w-3 h-3 mr-1" />, label: 'Enthusiastic' };
      case 'simple': return { icon: <Sun className="w-3 h-3 mr-1" />, label: 'Simple' };
      case 'expert': return { icon: <BarChart2 className="w-3 h-3 mr-1" />, label: 'Expert' };
      default: return { icon: <User className="w-3 h-3 mr-1" />, label: 'Friendly' };
    }
  };
  
  const toneInfo = getToneInfo();
  
  return (
    <div className="flex justify-between items-center p-4 border-b border-base-300">
      <div className="flex items-center">
        <div className="avatar placeholder mr-3">
          <div className="bg-primary text-primary-content rounded-full w-10">
            <span className="text-xl"><Bot /></span>
          </div>
        </div>
        <div>
          <h2 className="font-bold">Instylo Assistant</h2>
          <div className="flex items-center gap-2 text-xs opacity-70">
            <div className="flex items-center">
              <Brain className="w-3 h-3 mr-1" />
              <span>Context:</span> 
              <span className={`ml-1 font-medium ${contextStrength.color}`}>{contextStrength.level}</span>
            </div>
            {detectedUserInfo?.name && (
              <div className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                <span>{detectedUserInfo.name}</span>
              </div>
            )}
            <div 
              className="flex items-center cursor-pointer hover:text-primary"
              onClick={() => setShowToneSelector(true)}
            >
              {toneInfo.icon}
              <span>{toneInfo.label}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => setShowConversationMemory(true)}
          className="btn btn-sm btn-ghost"
          title="View Conversation Memory"
        >
          <Brain className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setShowPromptLibrary(true)}
          className="btn btn-sm btn-ghost"
          title="Prompt Library"
        >
          <BookOpen className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setShowToneSelector(true)}
          className="btn btn-sm btn-ghost"
          title="Change AI Tone"
        >
          <Zap className="w-5 h-5" />
        </button>
        <button 
          onClick={toggleSpeech} 
          className={`btn btn-sm ${isSpeaking ? 'btn-primary' : 'btn-ghost'}`}
          title="Text-to-Speech"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;