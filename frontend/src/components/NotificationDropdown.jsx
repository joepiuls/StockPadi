import { X, CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useNotificationStore from "../store/useNotificationStore";

const NotificationsDropdown = ({ isOpen, closeDropdown }) => {
  const {
    notifications,
    unreadCount,
    fetchNotifications,
    addNotification,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
    simulateNotification,
  } = useNotificationStore();

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-2 top-14 sm:right-0 sm:top-10 w-72 sm:w-80 bg-white rounded-xl shadow-lg border overflow-hidden z-30"
        >
          <div className="flex justify-between items-center p-3 border-b bg-gray-50" ref={dropdownRef}>
            <h4 className="font-semibold text-brand-blue text-sm">Notifications</h4>
            <button
              onClick={clearNotifications}
              className="text-xs text-gray-400 hover:text-red-500 transition"
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
                    className="flex justify-between items-center p-3 text-sm hover:bg-gray-100"
                  >
                    <div>
                      <div className={`font-medium ${notification.isRead ? 'text-gray-500' : 'text-brand-dark'}`}>
                        {notification.title}
                      </div>
                      <div className="text-xs text-gray-400">{notification.message}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-300 hover:text-red-500 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center p-2 border-t bg-gray-50">
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 text-xs text-brand-dark hover:text-brand-blue transition"
                >
                  <CheckCircle size={14} /> Mark All as Read
                </button>
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-gray-400 text-sm">
              {import.meta.env.DEV && (
                <div className="flex justify-center p-2">
                  <button
                    onClick={simulateNotification}
                    className="text-xs text-green-500 hover:underline"
                  >
                    + Add Test Notification
                  </button>
                </div>
              )}
              No Notifications
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsDropdown;
