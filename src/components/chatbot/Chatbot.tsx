import React, { useState, lazy } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatModal from './ChatModal';

// Lazy load the InteractiveAIChatbot component
const InteractiveAIChatbot = lazy(() => import('./InteractiveAIChatbot'));

// Main Chatbot component for the social media app
const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button to open the chat */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 bg-primary text-white rounded-full shadow-lg z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat modal with lazy-loaded InteractiveAIChatbot */}
      <ChatModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ChatComponent={InteractiveAIChatbot}
      />
    </>
  );
};

export default Chatbot; 