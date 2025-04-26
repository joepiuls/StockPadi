import { LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const DashboardContent = () => {
  const [greeting, setGreeting] = useState("");
  const userRole = "admin"; // Later replace with Zustand or actual user data
  const location = useLocation();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  // Check if the user is on the main /dashboard page (no child route)
  const isOnDashboardHome = location.pathname === "/dashboard";

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-base-100/50">
      {isOnDashboardHome ? (
        // Welcome screen
        <div className="w-full flex flex-1 flex-col items-center justify-center p-10">
          <div className="max-w-md text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center gap-4 mb-4">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center 
                  justify-center animate-bounce"
                >
                  <LayoutDashboard className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Greeting */}
            <h1 className="text-2xl text-brand-dark font-bold">
              {greeting}, {userRole === "admin" ? "Admin" : "Staff"} 👋
            </h1>

            {/* Subtext */}
            <p className="text-base-content/60 text-brand-dark text-sm">
              {userRole === "admin"
                ? "Manage your entire business operations with ease."
                : "Access the tools you need to manage sales and inventory effortlessly."}
            </p>
          </div>
        </div>
      ) : (
        // Otherwise show the child page
        <Outlet />
      )}
    </div>
  );
};

export default DashboardContent;
