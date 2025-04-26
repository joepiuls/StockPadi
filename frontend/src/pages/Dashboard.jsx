import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ChevronDown, ChevronUp, Menu, X, Building2, Boxes, ShoppingCart, Users, BarChart2, Brain, UserCog, PlusSquare, ClipboardList, BarChart } from "lucide-react";
import { sidebarGroups } from "./sidebarlinks";
import { useSidebarStore } from "../store/sidebarStore";
import DashboardContent from "../components/DashboardContent";
import logo1 from '../assets/logo1.png'
import Topbar from "../components/Topbar";

// All icons available
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

  const { badges, setBadges } = useSidebarStore();

  const userRole = "admin"; // Example (you can replace this from Zustand auth store)

  const handleSidebarToggle = () => {
    const newState = !isMobileOpen;
    setIsMobileOpen(newState);
    localStorage.setItem("stockpadi_sidebar_open", JSON.stringify(newState));
  };

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  // Fetch badges from API
  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const res = await fetch("/api/dashboard/badges"); // Your API
        const data = await res.json();
        setBadges(data);
      } catch (error) {
        console.error("Failed fetching badges", error);
      }
    };

    fetchBadges();

    const interval = setInterval(fetchBadges, 60000); // refresh every 1 min
    return () => clearInterval(interval); // clean up interval
  }, [setBadges]);

  return (
    <div className="flex h-screen relative">
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`bg-white border-r w-64 md:block fixed md:relative z-30 h-full shadow-lg transform transition-transform ease-in-out duration-500 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b font-bold text-lg flex justify-between items-center">
          <div className="flex flex-row justify-center">
          <img src={logo1} alt="logo" className='w-[30px] h-[28px]' />
          <span className="text-brand-blue">StockPadi</span>
          </div>
          <button className="md:hidden" onClick={() => setIsMobileOpen(false)}>
            <X className="w-6 h-6 text-brand-blue" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-2 space-y-2 text-brand-dark">
          {sidebarGroups.map((group, idx) => (
            group.role.includes(userRole) && (
              <div key={idx}>
                {/* Group Title */}
                <button
                  onClick={() => toggleDropdown(group.title)}
                  className={`flex justify-between items-center w-full px-3 py-2 text-left font-medium rounded transition ${openDropdown === group.title ? "bg-indigo-100 text-brand-blue" : "hover:bg-gray-100 text-brand-dark"}`}
                >
                  <div className="flex items-center gap-2">
                    {(() => {
                      const IconComponent = icons[group.icon];
                      return IconComponent ? <IconComponent size={20} className="text-brand-dark" /> : null;
                    })()}
                    <span>{group.title}</span>
                  </div>
                  {openDropdown === group.title ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {/* Group Links */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === group.title ? "max-h-screen" : "max-h-0"}`}>
                  <ul className="ml-2 mt-1 space-y-1 border-l border-brand-blue pl-2">
                    {group.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <NavLink
                          to={link.path}
                          onClick={() => {
                            if (window.innerWidth < 768) {
                              handleSidebarToggle(); // Auto close on mobile
                            }
                          }}
                          className={({ isActive }) => `flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition relative ${isActive ? "bg-indigo-100 text-brand-blue font-semibold" : "hover:bg-gray-100 text-brand-dark"}`}
                        >
                          {({ isActive }) => (
                            <>
                              {/* Active line */}
                              <span className={`absolute left-0 top-0 h-full w-1 rounded-r-full transition-all ${isActive ? "bg-brand-blue" : "bg-transparent"}`} />
                              
                              {/* Icon */}
                              {icons[link.icon] && (
                                <span className="flex items-center">
                                  {React.createElement(icons[link.icon], { size: 16 })}
                                </span>
                              )}

                              {/* Name */}
                              <span>{link.name}</span>

                              {/* Badge */}
                              {link.badgeKey && badges[link.badgeKey] > 0 && (
                                <span className="ml-auto bg-brand-blue text-white text-xs px-2 py-0.5 rounded-full">
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
        <div className="flex justify-between items-center px-4 py-4 border-b bg-white shadow-sm">
          <button className="md:hidden" onClick={() => setIsMobileOpen(true)}>
            <Menu className="text-brand-blue" />
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
