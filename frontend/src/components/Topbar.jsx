import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import avatar from "../assets/avatar.svg";
import { useNotificationStore } from "../store/useNotificationStore";
import { useState } from "react";
import NotificationsDropdown from "./NotificationDropdown";

const Topbar = ({ role }) => {
const [showNotifications, setShowNotifications] = useState(false);
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const {notifications} = useNotificationStore();

  return (
    <div className="flex justify-between items-center w-full">
      {/* Left Side (optional mobile menu button in future) */}
      <div />

      {/* Right Side */}
      <div className="flex items-center gap-6 ml-auto">
        {/* Today's Date */}
        <span className="text-sm text-brand-dark hidden md:block">{today}</span>

        {/* Notification Bell */}
        <div className="relative">
          <div
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative cursor-pointer hover:bg-gray-100 rounded-full p-2 transition"
          >
            <Bell className="text-brand-blue w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {notifications.length}
            </span>
          </div>

          {/* Dropdown */}
          <NotificationsDropdown
            isOpen={showNotifications}
            closeDropdown={()=>setShowNotifications(false)}
          />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt="Profile"
            className="w-9 h-9 rounded-full bg-brand-dark object-cover"
          />
          <div className="flex flex-col text-right">
            <p className="text-sm font-semibold text-brand-blue">
              Hi, {role === "admin" ? "Admin" : "Staff"}
            </p>
            <button className="text-xs text-brand-dark hover:text-brand-blue transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
