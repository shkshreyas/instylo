import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import { StudyBuddySidebar } from "@/components/shared"; 
import Chatbot from "@/components/chatbot/Chatbot";

const RootLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1024);
  const [isStudySidebarCollapsed, setIsStudySidebarCollapsed] = useState(true);

  useEffect(() => {
    // Listen for sidebar toggle events
    const handleSidebarToggle = (e: CustomEvent) => {
      setIsSidebarCollapsed(e.detail);
    };

    window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    };
  }, []);

  const toggleStudySidebar = () => {
    setIsStudySidebarCollapsed(!isStudySidebarCollapsed);
    localStorage.setItem("studySidebarState", JSON.stringify(!isStudySidebarCollapsed));
    
    // Auto-collapse left sidebar when right sidebar opens
    if (isStudySidebarCollapsed && !isSidebarCollapsed) {
      setIsSidebarCollapsed(true);
      // Dispatch event to notify the LeftSidebar component
      window.dispatchEvent(
        new CustomEvent("sidebarToggle", { detail: true })
      );
    }
  };

  // Automatically collapse left sidebar when right sidebar is open
  const handleRightSidebarOpen = () => {
    if (!isSidebarCollapsed) {
      setIsSidebarCollapsed(true);
      // Dispatch event to notify the LeftSidebar component
      window.dispatchEvent(
        new CustomEvent("sidebarToggle", { detail: true })
      );
    }
  };

  // Load saved study sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem("studySidebarState");
    if (savedState) {
      setIsStudySidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <motion.section 
        initial={false}
        animate={{
          marginLeft: isSidebarCollapsed ? '0px' : '270px',
          marginRight: isStudySidebarCollapsed ? '0px' : '320px',
          width: `calc(100% - ${isSidebarCollapsed ? 0 : 270}px - ${isStudySidebarCollapsed ? 0 : 320}px)`
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        className="flex flex-1 h-full"
      >
        <Outlet />
      </motion.section>

      {/* Study Buddy Sidebar */}
      <StudyBuddySidebar 
        isCollapsed={isStudySidebarCollapsed}
        onToggle={toggleStudySidebar}
        onOpenRightSidebar={handleRightSidebarOpen}
      />

      <Bottombar />
      
      {/* Add AI Chatbot */}
      <Chatbot />
    </div>
  );
};

export default RootLayout;
