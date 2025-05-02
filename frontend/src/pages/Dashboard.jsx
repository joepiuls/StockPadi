import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ChevronDown, ChevronUp, Menu, X, Building2, Boxes, 
         ShoppingCart, Users, BarChart2, Brain, UserCog, 
         PlusSquare, ClipboardList, BarChart } from "lucide-react";
import { sidebarGroups } from "./sidebarlinks";
import { useSidebarStore } from "../store/sidebarStore";
import DashboardContent from "../components/DashboardContent";
import Topbar from "../components/Topbar";
import useAuthStore from "../store/useAuthStore";
import LoadingSpinner from "../components/LoadingSpinner";
import stockpadilogo from '../assets/stockpadi_logo.png';

const icons = {
  Building2,
  Boxes,
  ShoppingCart,
  Users,
  BarChart2,
  Brain,
  UserCog,
  PlusSquare,
  ClipboardList,
  BarChart,
};

const Dashboard = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(() => {
    const savedState = localStorage.getItem("stockpadi_sidebar_open");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const { user, loading } = useAuthStore();
  const { badges, setBadges } = useSidebarStore();
  const userRole = user?.role;

  const handleSidebarToggle = () => {
    const newState = !isMobileOpen;
    setIsMobileOpen(newState);
    localStorage.setItem("stockpadi_sidebar_open", JSON.stringify(newState));
  };

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await fetch("/api/dashboard/badges");
        const data = await res.json();
        setBadges(data);
      } catch (error) {
        console.error("Failed fetching badges", error);
      }
    };

    fetchBadges();
    const interval = setInterval(fetchBadges, 60000);
    return () => clearInterval(interval);
  }, [setBadges]);

  return (
    <div className="flex h-screen relative bg-gray-50 dark:bg-gray-900">
      {loading && <LoadingSpinner />}

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-gray-800/80 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 md:block fixed md:relative z-30 h-full shadow-xl transform transition-transform ease-in-out duration-300 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}>

        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-brand-blue rounded-lg px-3">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
            <span className="text-brand-blue dark:text-brand-blue-light font-bold text-2xl">
              StockPadi
            </span>
          </div>
          <button 
            className="md:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-2 space-y-1">
          {sidebarGroups.map((group, idx) => (
            group.role.includes(userRole) && (
              <div key={idx}>
                {/* Group Title */}
                <button
                  onClick={() => toggleDropdown(group.title)}
                  className={`flex justify-between items-center w-full px-3 py-2.5 text-left font-medium rounded-lg transition-colors ${
                    openDropdown === group.title 
                      ? "bg-brand-blue/10 text-brand-blue dark:bg-gray-700 dark:text-white" 
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {icons[group.icon] && React.createElement(icons[group.icon], {
                      size: 20,
                      className: `${
                        openDropdown === group.title 
                          ? "text-brand-blue dark:text-white" 
                          : "text-gray-500 dark:text-gray-400"
                      }`
                    })}
                    <span className="text-sm">{group.title}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`transform transition-transform ${
                      openDropdown === group.title ? "rotate-180" : ""
                    } text-gray-400 dark:text-gray-500`}
                  />
                </button>

                {/* Group Links */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openDropdown === group.title ? "max-h-screen" : "max-h-0"
                }`}>
                  <ul className="ml-3 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-600 pl-3">
                    {group.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <NavLink
                          to={link.path}
                          onClick={() => window.innerWidth < 768 && handleSidebarToggle()}
                          className={({ isActive }) => `flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors relative ${
                            isActive 
                              ? "bg-brand-blue/10 text-brand-blue dark:bg-gray-700 dark:text-white" 
                              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          }`}
                        >
                          {({ isActive }) => (
                            <>
                              <span className={`absolute left-0 top-0 h-full w-1 rounded-r-full transition-all ${
                                isActive ? "bg-brand-blue dark:bg-brand-blue-light" : "bg-transparent"
                              }`} />
                              
                              {icons[link.icon] && React.createElement(icons[link.icon], {
                                size: 16,
                                className: `flex-shrink-0 ${
                                  isActive 
                                    ? "text-brand-blue dark:text-brand-blue-light" 
                                    : "text-gray-500 dark:text-gray-400"
                                }`
                              })}

                              <span className="truncate">{link.name}</span>

                              {link.badgeKey && badges[link.badgeKey] > 0 && (
                                <span className="ml-auto bg-brand-blue dark:bg-brand-blue-light text-white text-xs px-2 py-1 rounded-full min-w-[24px] flex items-center justify-center">
                                  {badges[link.badgeKey]}
                                </span>
                              )}
                            </>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <button 
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <Topbar role={userRole} />
        </div>

        {/* Page Content */}
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;