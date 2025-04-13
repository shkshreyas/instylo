import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Maximize2, Minimize2 } from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  ChatComponent: React.LazyExoticComponent<React.ComponentType>;
}

const LoadingIndicator = () => (
  <div className="flex flex-col justify-center items-center h-48 space-y-4">
    <div className="relative flex items-center justify-center">
      <div className="absolute w-16 h-16 rounded-full border-4 border-primary opacity-20 animate-ping"></div>
      <Loader2 size={40} className="animate-spin text-primary" />
    </div>
    <p className="text-base-content animate-pulse font-medium">Loading your Instylo assistant...</p>
    <div className="text-xs text-base-content/60 max-w-xs text-center">
      Preparing to help you connect with communities and build meaningful relationships
    </div>
  </div>
);

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, ChatComponent }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Prevent scrolling of background content when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    
    window.addEventListener('keydown', handleEscapeKey);
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, isFullscreen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 ${isFullscreen ? 'p-0' : ''}`}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div 
            className={`relative ${isFullscreen ? 'w-full h-full' : 'w-full max-w-4xl'} bg-base-100 rounded-xl overflow-hidden flex flex-col`}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            layout
          >
            {/* Header with control buttons */}
            <div className="bg-base-300 px-4 py-2 flex justify-between items-center">
              <h3 className="font-semibold"></h3>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="btn btn-sm btn-ghost"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? 
                    <Minimize2 className="h-4 w-4" /> : 
                    <Maximize2 className="h-4 w-4" />
                  }
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="btn btn-sm btn-ghost text-error"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
            
            {/* Chat content */}
            <div className="flex-1 overflow-hidden">
              <Suspense fallback={<LoadingIndicator />}>
                <div className={`${isFullscreen ? 'h-[calc(100vh-40px)] flex flex-col justify-between' : 'h-[calc(80vh-40px)] max-h-[660px]'}`}>
                  <ChatComponent />
                </div>
              </Suspense>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;