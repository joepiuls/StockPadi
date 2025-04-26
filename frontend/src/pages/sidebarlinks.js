export const sidebarGroups = [
    {
      title: "Business",
      role: ["admin"],
      icon: "Building2",
      links: [
        { name: "Dashboard Overview", path: "/overview", icon: "Building2" },
        { name: "Billing & Subscription", path: "/billing", icon: "BarChart" },
        { name: "Settings", path: "/settings", icon: "UserCog" },
        { name: "Branches/Outlets", path: "/branches", icon: "Building2", badgeKey: "branches" },
      ],
    },
    {
      title: "Inventory Management",
      role: ["admin", "staff"],
      icon: "Boxes",
      links: [
        { name: "Product Catalog", path: "/products", icon: "Boxes", badgeKey: "products" },
        { name: "Add New Product", path: "/add-product", icon: "PlusSquare" },
        { name: "Stock Levels", path: "/stock-levels", icon: "BarChart" },
        { name: "Purchase Orders", path: "/purchase-orders", icon: "ClipboardList", badgeKey: "purchaseOrders" },
        { name: "Batch/Expiry Tracker", path: "/batch-expiry", icon: "Clock" },
        { name: "Barcode/QR Code Scanner", path: "/barcode-scanner", icon: "ScanBarcode" },
      ],
    },
    {
      title: "Sales & POS",
      role: ["admin", "staff"],
      icon: "ShoppingCart",
      links: [
        { name: "Point of Sale", path: "/pos", icon: "ShoppingCart" },
        { name: "Sales Orders", path: "/sales-orders", icon: "ClipboardList" },
        { name: "Invoices & Receipts", path: "/invoices", icon: "ClipboardList" },
        { name: "Discounts & Coupons", path: "/discounts", icon: "BarChart" },
        { name: "Returns & Refunds", path: "/returns", icon: "ClipboardList" },
      ],
    },
    {
      title: "Customers (CRM)",
      role: ["admin", "staff"],
      icon: "Users",
      links: [
        { name: "Customer List", path: "/customers", icon: "Users" },
        { name: "Loyalty Program", path: "/loyalty", icon: "Users" },
        { name: "SMS/Email Notifications", path: "/notifications", icon: "Users" },
      ],
    },
    {
      title: "Financials & Reports",
      role: ["admin"],
      icon: "BarChart2",
      links: [
        { name: "Sales Reports", path: "/sales-reports", icon: "BarChart2" },
        { name: "Inventory Reports", path: "/inventory-reports", icon: "BarChart2" },
        { name: "Profit & Loss Statement", path: "/profit-loss", icon: "BarChart2" },
        { name: "Tax/VAT Reports", path: "/tax-reports", icon: "BarChart2" },
      ],
    },
    {
      title: "AI Smart Tools",
      role: ["admin"],
      icon: "Brain",
      links: [
        { name: "Sales Forecasting", path: "/sales-forecast", icon: "Brain" },
        { name: "Smart Reorder Alerts", path: "/smart-reorder", icon: "Brain", badgeKey: "smartReorderAlerts" },
        { name: "Customer Insights", path: "/customer-insights", icon: "Brain" },
      ],
    },
    {
      title: "Staff Management",
      role: ["admin"],
      icon: "UserCog",
      links: [
        { name: "Staff List", path: "/staff", icon: "Users" },
        { name: "Add Staff", path: "/add-staff", icon: "UserCog" },
        { name: "Remove Staff", path: "/remove-staff", icon: "UserCog" },
        { name: "Role & Permissions", path: "/roles-permissions", icon: "UserCog" },
      ],
    },
  ];
  