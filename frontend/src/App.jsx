import React, { useEffect, useState } from 'react';
import LoginPage from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import useAuthStore from './store/useAuthStore';
import DevTools from './pages/add';
import StaffList from './pages/StaffManagement/StaffList';
import AddStaff from './pages/StaffManagement/addStaff';
import LoadingSpinner from './components/LoadingSpinner'; // Create this component
import 'react-toastify/dist/ReactToastify.css';
import Overview from './pages/bussiness/Overview';
import ProductCatalog from './pages/inventory/ProductCatalogue';
import PointOfSale from './pages/Sales&POS/PointofSale';
import BillingDashboard from './pages/bussiness/Billing&Subscription';
import BranchesManagement from './pages/bussiness/Branches';
import BatchTracker from './pages/inventory/ExpiryTracker';
import SalesForecast from './pages/AISmartTools/SalesForcasting';
import TaxReports from './pages/FinancialReports/Tax';
import LoyaltyProgram from './pages/customers/LoyalityProgram';
import PurchaseOrders from './pages/Sales&POS/SalesOrders';
import BarcodeScanner from './pages/inventory/QRScanner';
import RolePermissions from './pages/StaffManagement/RolesAndPermission';
import CustomerInsights from './pages/AISmartTools/CustomerInsight';
import BusinessSettings from './pages/bussiness/Settings';
import ReturnsManager from './pages/Sales&POS/ReturnsAndRefunds';
import DiscountManager from './pages/Sales&POS/DiscountAndCoupons';
import Inventory from './pages/inventory/AddProducts';
import PurchaseOrder from './pages/inventory/PurchaseOrder';
import StaffManagement from './pages/StaffManagement/addStaff';

const App = () => {
  const { user, checkAutoLogin, loading } = useAuthStore();
  const [appReady, setAppReady] = useState(false);

  const updateNetworkStatus = () => {
    setIsOffline(!navigator.onLine);
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await checkAutoLogin();
        useAuthStore.getState().initNetworkListener();
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setAppReady(true);
      }
    };

    initializeApp();

    return () => {
      // Cleanup network listener if needed
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, [checkAutoLogin]);

  if (!appReady || loading) {
    return <LoadingSpinner fullScreen />;
  }

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const PublicRoute = ({ children }) => {
    if (user) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route
            index
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="staff" element={<StaffList />} />
            <Route path="add-staff" element={<AddStaff />} />
            <Route path="overview" element={<Overview />} />
            <Route path="products" element={<ProductCatalog />} />
            <Route path="pos" element={<PointOfSale />} />
            <Route path="billing" element={<BillingDashboard />} />
            <Route path="branches" element={<BranchesManagement />} />
            <Route path="batch-expiry" element={<BatchTracker />} />
            <Route path="sales-forecast" element={<SalesForecast />} />
            <Route path="tax-reports" element={<TaxReports />} />
            <Route path="loyalty" element={<LoyaltyProgram />} />
            <Route path="sales-orders" element={<PurchaseOrders/>} />
            <Route path="barcode-scanner" element={<BarcodeScanner />} />
            <Route path="roles-permissions" element={<RolePermissions />} />
            <Route path="customer-insights" element={<CustomerInsights />} />
            <Route path="settings" element={<BusinessSettings />} />
            <Route path="returns" element={<ReturnsManager />} />
            <Route path="discounts" element={<DiscountManager />} />
            <Route path="add-product" element={<Inventory />} />
            <Route path="purchase-orders" element={<PurchaseOrder />} />
            <Route path="add-staff" element={<StaffManagement />} />
          </Route>
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
        </Routes>
      </Router>
      <DevTools />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;