import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";

const Dashboard = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const userRole = "admin"; // or "staff" (replace with Zustand state if needed)

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const sidebarGroups = [
    {
      title: "Business",
      role: ["admin"],
      links: [
        { name: "Overview", path: "/overview" },
        { name: "Billing", path: "/billing" },
        { name: "Subscription", path: "/subscription" },
        { name: "Settings", path: "/settings" },
      ],
    },
    {
      title: "Inventory",
      role: ["admin", "staff"],
      links: [
        { name: "Product List", path: "/products" },
        { name: "Add Product", path: "/add-product" },
        { name: "Update Product", path: "/update-product" },
        { name: "Delete Product", path: "/delete-product" },
      ],
    },
    {
      title: "Sales & Finance",
      role: ["admin", "staff"],
      links: [
        { name: "Sales Reports", path: "/sales" },
        { name: "Financial Projections", path: "/projections" },
        { name: "Payments", path: "/payments" },
      ],
    },
    {
      title: "Staff Management",
      role: ["admin"],
      links: [
        { name: "Staff List", path: "/staff" },
        { name: "Add Staff", path: "/add-staff" },
        { name: "Remove Staff", path: "/remove-staff" },
      ],
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-white border-r w-64 md:block ${isMobileOpen ? "block" : "hidden"} md:relative absolute z-20 h-full`}>
        <div className="p-4 border-b font-bold text-lg">StockPadi</div>
        <nav className="p-2 space-y-2">
          {sidebarGroups.map((group, idx) => (
            group.role.includes(userRole) && (
              <div key={idx}>
                <button
                  onClick={() => toggleDropdown(group.title)}
                  className="flex justify-between items-center w-full px-3 py-2 text-left font-medium hover:bg-gray-100 rounded"
                >
                  {group.title}
                  {openDropdown === group.title ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openDropdown === group.title && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {group.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          to={link.path}
                          className="block px-2 py-1 text-sm hover:bg-indigo-100 rounded"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          ))}
        </nav>
      </div>

      {/* Top Nav */}
      <div className="flex-1">
        <div className="flex justify-between items-center px-4 py-3 border-b bg-white shadow-sm">
          <button
            className="md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <Menu />
          </button>
          <div className="flex items-center space-x-3">
            <span>Hi! Admin</span>
            <button className="text-sm border px-3 py-1 rounded-full">Logout</button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-xl font-semibold">Welcome to your dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
