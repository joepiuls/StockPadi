import { Bell, Settings, CalendarDays, LogOut, User, Keyboard, Moon, Sun } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NotificationsDropdown from "./NotificationDropdown";
import useAuthStore from "../store/useAuthStore";
import LoadingSpinner from "./LoadingSpinner";
import { useNotificationStore } from "../store/useNotificationStore";
import avatar from '../assets/avatar.svg'
import useThemeStore from "../store/useThemeStore";
import { FaCircleUser, FaUserLarge } from "react-icons/fa6";

const Topbar = ({ role }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logOut } = useAuthStore();
  const { isDark, toggleTheme, initializeTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initializeTheme();
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [isDark, mounted]);

  const navigate = useNavigate();
  const userMenuRef = useRef();
  const bellRef = useRef();
  const { notifications, fetchNotifications, isOpen, setIsOpen } = useNotificationStore();

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logOut();
    navigate('/');
  };

  useEffect(()=>{
    fetchNotifications()
  })



  return (
    <div className="flex justify-between items-center w-full">
      {/* Left Side - Quick Actions */}
      <div className="flex items-center gap-4">
        <button 
          className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
          onClick={() => navigate('/settings')}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
          <CalendarDays size={16} />
          <span>{today}</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          <motion.div
            key={isDark ? 'moon' : 'sun'}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </motion.div>
        </button>

        {/* Keyboard Shortcuts Button */}
        <button
          className="hidden md:flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 transition-colors"
          onClick={() => navigate('/shortcuts')}
        >
          <Keyboard size={16} />
          <span>Ctrl + K</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            ref={bellRef}
            onClick={() => setIsOpen(!isOpen)}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full transform translate-x-1 -translate-y-1">
                {notifications.length}
              </span>
            )}
          </button>

          {isOpen && <NotificationsDropdown />}
        </div>

        {/* User Profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              {user?.photoURL?<img
                src={user?.photoURL}
                alt="Profile"
                className="w-10 h-10  rounded-full border-2 border-gray-800 dark:border-white shadow-sm object-cover"
              />: <FaCircleUser size={35} className="border-gray-800 dark:border-white"  />}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {user?.displayName || 'Unknown User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {role}
              </p>
            </div>
          </button>

          {/* User Menu Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-50"
              >
                <div className="py-2">
                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user?.displayName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/profile')}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <User size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    {isLoggingOut ? (
                      <LoadingSpinner size={16} />
                    ) : (
                      <>
                        <LogOut size={16} />
                        <span>Log Out</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Topbar;