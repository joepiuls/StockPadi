import { LayoutDashboard, Zap, PieChart, Warehouse, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../store/useAuthStore";

const DashboardContent = () => {
  const [greeting, setGreeting] = useState("");
  const { user } = useAuthStore();
  const userRole = user?.role;
  const location = useLocation();

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"
    );
  }, []);

  const isOnDashboardHome = location.pathname === "/dashboard";

  const features = [
    {
      icon: Zap,
      title: "Real-time Analytics",
      description: "Monitor business performance with live updates"
    },
    {
      icon: PieChart,
      title: "Sales Overview",
      description: "Track revenue streams and product performance"
    },
    {
      icon: Warehouse,
      title: "Inventory Control",
      description: "Manage stock levels and supplier orders"
    },
    ...(userRole === "admin" ? [{
      icon: Shield,
      title: "Admin Tools",
      description: "Manage users and system settings"
    }] : [])
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50/50 to-brand-blue/5 dark:from-gray-900 dark:to-gray-800/50">
      <AnimatePresence mode="wait">
        {isOnDashboardHome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full flex flex-1 flex-col items-center justify-center p-4 md:p-10"
          >
            <div className="max-w-3xl w-full text-center space-y-8">
              {/* Animated Icon Section */}
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="inline-block p-6 bg-gradient-to-br from-brand-blue to-blue-600 dark:from-blue-800 dark:to-blue-900 rounded-2xl shadow-xl"
              >
                <LayoutDashboard className="w-12 h-12 text-white" />
              </motion.div>

              {/* Greeting Section */}
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
                >
                  {greeting}, {user?.name?.split(' ')[0] || (userRole === "admin" ? "Admin" : "User")}
                  <span className="ml-3 animate-wave origin-[70%_70%] inline-block">👋</span>
                </motion.h1>
                
                <div className="inline-flex items-center gap-2 bg-brand-blue/10 dark:bg-brand-blue/20 px-4 py-1.5 rounded-full text-sm text-brand-blue dark:text-brand-blue-light font-medium">
                  {userRole === "admin" ? "Administrator" : "Staff Member"}
                  <div className="w-2 h-2 bg-brand-blue dark:bg-brand-blue-light rounded-full animate-pulse" />
                </div>
              </div>

              {/* Feature Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-brand-blue/20 dark:hover:border-brand-blue-light/30 transition-all"
                  >
                    <feature.icon className="w-8 h-8 text-brand-blue dark:text-brand-blue-light mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Stats Bar */}
              <motion.div 
                className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-wrap gap-6 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">₦254K</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">1.2K</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">89%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Stock Availability</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="outlet"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardContent;