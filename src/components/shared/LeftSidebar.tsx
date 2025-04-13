import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = window.innerWidth < 1024; // Check for mobile view

  const { mutate: signOut } = useSignOutAccount();

  useEffect(() => {
    // Set collapsed state based on device
    setIsCollapsed(isMobile);
    
    const savedState = localStorage.getItem("sidebarState");
    if (savedState && !isMobile) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) return; // Prevent toggling on mobile
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarState", JSON.stringify(newState));
    window.dispatchEvent(
      new CustomEvent("sidebarToggle", { detail: newState })
    );
  };

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <>
      {/* Only show toggle button on desktop */}
      {!isMobile && (
        <motion.button
          onClick={toggleSidebar}
          initial={false}
          animate={{
            left: isCollapsed ? "1rem" : "270px",
            rotate: isCollapsed ? 180 : 0,
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="fixed top-8 z-50 p-3 glass-effect rounded-full 
            hover:bg-primary-500/20 hover:shadow-premium-hover
            transition-all duration-300 hidden lg:flex"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}>
          <img
            src="/assets/icons/chevron-left.svg"
            alt="collapse"
            className="w-6 h-6 text-light-1"
          />
        </motion.button>
      )}

      <motion.nav
        initial={false}
        animate={{
          width: isCollapsed ? "0px" : "270px",
          opacity: isCollapsed ? 0 : 1,
          x: isCollapsed ? "-100%" : 0,
        }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        className="leftsidebar hidden lg:flex">
        <div className="flex flex-col h-full min-w-[270px]">
          <div className="flex-none mb-6">
            <Link to="/" className="flex gap-3 items-center">
              <h1 className="gradient-text text-2xl">Instylo</h1>
            </Link>
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="profile-section flex-none mb-6">
                {isLoading || !user.email ? (
                  <div className="h-14">
                    <Loader />
                  </div>
                ) : (
                  <Link
                    to={`/profile/${user.id}`}
                    className="flex gap-3 items-center group hover:bg-dark-4 rounded-xl p-4 
                      transition-all duration-300 hover:scale-105">
                    <img
                      src={
                        user.imageUrl || "/assets/icons/profile-placeholder.svg"
                      }
                      alt="profile"
                      className="h-14 w-14 rounded-full object-cover group-hover:ring-2 
                        ring-primary-500 transition-all duration-300"
                    />
                    <div className="flex flex-col">
                      <p className="body-bold">{user.name}</p>
                      <p className="small-regular text-light-3">
                        @{user.username}
                      </p>
                    </div>
                  </Link>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <ul className="flex flex-col gap-6 pb-6">
              {sidebarLinks.map((link: INavLink, index) => {
                const isActive = pathname === link.route;

                return (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ x: 10 }}
                    className={`leftsidebar-link ${isActive ? "active" : ""}`}>
                    <NavLink to={link.route} className="nav-item">
                      <img
                        src={link.imgURL}
                        alt={link.label}
                        className={`w-6 h-6 transition-all duration-300
                          ${isActive ? "filter-primary-500" : ""}`}
                      />
                      <span className="gradient-text">{link.label}</span>
                    </NavLink>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <div className="flex-none pt-4 mt-6 border-t border-dark-4/30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              <Button
                variant="ghost"
                className="premium-hover w-full"
                onClick={handleSignOut}>
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p className="text-light-2">Logout</p>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default LeftSidebar;
