import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Topbar from "@/components/shared/Topbar";
import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Chatbot from "@/components/chatbot";

const RootLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1024);

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

  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <motion.section 
        initial={false}
        animate={{
          marginLeft: isSidebarCollapsed ? '0px' : '270px',
          width: isSidebarCollapsed ? '100%' : 'calc(100% - 270px)'
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        className="flex flex-1 h-full ml-0 lg:ml-[270px]"
      >
        <Outlet />
      </motion.section>

      <Bottombar />
      
      {/* Add AI Chatbot */}
      <Chatbot />
    </div>
  );
};

export default RootLayout;
