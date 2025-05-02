import { X, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useNotificationStore from "../store/useNotificationStore";

const NotificationsDropdown = () => {
  const {
    notifications,
    fetchNotifications,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
    simulateNotification,
    isOpen, setIsOpen
  } = useNotificationStore();

  const dropdownRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);


  const DropdownContent = (
    <div
      className="w-72 sm:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl border dark:border-gray-700 overflow-hidden z-30"
    >
      <div className="flex justify-between items-center p-3 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h4 className="font-semibold text-brand-blue dark:text-brand-blue-light text-sm">
          Notifications
        </h4>
        <button
          onClick={clearNotifications}
          className="text-xs text-gray-400 dark:text-gray-300 hover:text-red-500 transition"
        >
          Clear All
        </button>
      </div>

      {notifications.length > 0 ? (
        <>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="flex justify-between items-center p-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div>
                  <div
                    className={`font-medium ${
                      notification.isRead 
                        ? "text-gray-500 dark:text-gray-400" 
                        : "text-brand-dark dark:text-gray-100"
                    }`}
                  >
                    {notification.title}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {notification.message}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.isRead && (
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-300 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-center p-2 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 text-xs text-brand-dark dark:text-gray-200 hover:text-brand-blue dark:hover:text-brand-blue-light transition"
            >
              <CheckCircle size={14} /> Mark All as Read
            </button>
          </div>
        </>
      ) : (
        <div className="p-4 text-center text-gray-400 dark:text-gray-500 text-sm">
          {import.meta.env.DEV && (
            <div className="flex justify-center p-2">
              <button
                onClick={simulateNotification}
                className="text-xs text-green-500 hover:underline dark:hover:text-green-400"
              >
                + Add Test Notification
              </button>
            </div>
          )}
          No Notifications
        </div>
      )}
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          drag={isMobile}
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={(event, info) => {
            if (isMobile && info.offset.y > 100) {
              closeDropdown();
            }
          }}
          className={`${
            isMobile
              ? "fixed top-20 left-4 right-4 z-[100]"
              : "absolute right-2 top-14 sm:right-0 sm:top-10"
          }`}
        >
          {DropdownContent}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsDropdown;