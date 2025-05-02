import React, { useState } from 'react';
import { Building2, MapPin, Hash, Save, Undo, Plus, CreditCard, RefreshCw, Trash2, CheckCircle, AlertCircle, Bell, MessageSquare, Mail } from 'lucide-react';

const BusinessSettings = () => {
  // Tab State
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile Tab State
  const [profileData, setProfileData] = useState({
    businessName: 'StockPadi Enterprises',
    cacNumber: 'BN-123456789',
    businessAddress: '14 Marina Road, Lagos Island',
    email: 'contact@stockpadi.com',
    phone: '+234 801 234 5678',
    industry: 'Retail'
  });
  const [profileErrors, setProfileErrors] = useState({});
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isProfileSaved, setIsProfileSaved] = useState(false);
  
  // Payments Tab State
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'flutterwave',
      name: 'Flutterwave',
      connected: '15 Sept 2023',
      status: 'active',
      isDefault: true
    },
    {
      id: '2',
      type: 'paystack',
      name: 'Paystack',
      connected: '03 Jan 2024',
      status: 'active',
      isDefault: false
    },
    {
      id: '3',
      type: 'stripe',
      name: 'Stripe',
      connected: '28 Feb 2024',
      status: 'expired',
      isDefault: false
    }
  ]);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [reconnectingId, setReconnectingId] = useState(null);
  
  // Notifications Tab State
  const [notifications, setNotifications] = useState([
    {
      id: 'low-stock',
      name: 'Low Stock Alerts',
      description: 'Get notified when your inventory is running low',
      email: true,
      sms: true,
      inApp: true,
      icon: <Bell size={18} />
    },
    {
      id: 'new-order',
      name: 'New Order Notifications',
      description: 'Be alerted when customers place new orders',
      email: true,
      sms: false,
      inApp: true,
      icon: <Bell size={18} />
    },
    {
      id: 'customer-messages',
      name: 'Customer Messages',
      description: 'Get notified when customers send you messages',
      email: true,
      sms: false,
      inApp: true,
      icon: <MessageSquare size={18} />
    }
  ]);
  const [isNotificationsSaving, setIsNotificationsSaving] = useState(false);
  const [isNotificationsSaved, setIsNotificationsSaved] = useState(false);

  // Profile Tab Handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (profileErrors[name]) {
      setProfileErrors(prev => ({ ...prev, [name]: undefined }));
    }
    setIsProfileSaved(false);
  };

  const validateProfile = () => {
    const errors = {};
    if (!profileData.businessName.trim()) errors.businessName = 'Business name is required';
    if (!profileData.cacNumber.trim()) errors.cacNumber = 'CAC number is required';
    if (!profileData.businessAddress.trim()) errors.businessAddress = 'Business address is required';
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;
    
    setIsProfileSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsProfileSaved(true);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsProfileSaving(false);
    }
  };

  // Payment Methods Handlers
  const handleSetDefaultPayment = (id) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };

  const handleReconnectPayment = async (id) => {
    setReconnectingId(id);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPaymentMethods(methods => 
        methods.map(method => 
          method.id === id 
            ? { ...method, status: 'active', connected: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }
            : method
        )
      );
    } finally {
      setReconnectingId(null);
    }
  };

  const handleRemovePayment = (id) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  // Notifications Handlers
  const handleToggleNotification = (id, channel) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, [channel]: !notification[channel] }
          : notification
      )
    );
    setIsNotificationsSaved(false);
  };

  const handleSaveNotifications = async () => {
    setIsNotificationsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsNotificationsSaved(true);
    } finally {
      setIsNotificationsSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Business Profile' },
    { id: 'payments', label: 'Payment Methods' },
    { id: 'notifications', label: 'Notifications' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Business Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your business details, payment methods, and notification preferences
        </p>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700 px-6">
        <div className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative py-4 px-4 text-sm font-medium transition-colors duration-200 ease-in-out
                ${activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }
              `}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="animate-fadeIn">
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Business Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Building2 size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      name="businessName"
                      value={profileData.businessName}
                      onChange={handleProfileChange}
                      className={`
                        w-full pl-10 py-2.5 px-4 bg-white dark:bg-gray-800 border rounded-lg text-sm transition-colors duration-200
                        ${profileErrors.businessName
                          ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                        }
                      `}
                    />
                    {profileErrors.businessName && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {profileErrors.businessName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    CAC Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Hash size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      name="cacNumber"
                      value={profileData.cacNumber}
                      onChange={handleProfileChange}
                      className={`
                        w-full pl-10 py-2.5 px-4 bg-white dark:bg-gray-800 border rounded-lg text-sm transition-colors duration-200
                        ${profileErrors.cacNumber
                          ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                        }
                      `}
                    />
                    {profileErrors.cacNumber && (
                      <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {profileErrors.cacNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Business Address
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MapPin size={18} className="text-gray-500" />
                  </div>
                  <textarea
                    name="businessAddress"
                    value={profileData.businessAddress}
                    onChange={handleProfileChange}
                    rows={3}
                    className={`
                      w-full pl-10 py-2.5 px-4 bg-white dark:bg-gray-800 border rounded-lg text-sm transition-colors duration-200
                      ${profileErrors.businessAddress
                        ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      }
                    `}
                  />
                  {profileErrors.businessAddress && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {profileErrors.businessAddress}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setProfileData({
                      businessName: 'StockPadi Enterprises',
                      cacNumber: 'BN-123456789',
                      businessAddress: '14 Marina Road, Lagos Island',
                      email: 'contact@stockpadi.com',
                      phone: '+234 801 234 5678',
                      industry: 'Retail'
                    });
                    setProfileErrors({});
                    setIsProfileSaved(false);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Undo size={16} className="mr-2" />
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isProfileSaving}
                  className={`
                    inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    ${isProfileSaving ? 'opacity-75 cursor-not-allowed' : ''}
                  `}
                >
                  {isProfileSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      {isProfileSaved ? 'Saved' : 'Save Changes'}
                    </>
                  )}
                </button>
              </div>

              {isProfileSaved && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="text-sm text-green-800 dark:text-green-400">
                    Business profile updated successfully.
                  </p>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="animate-fadeIn space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`
                  p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm transition-all duration-200
                  ${method.status === 'active'
                    ? method.isDefault
                      ? 'border-l-4 border-l-blue-500'
                      : 'border-l-4 border-l-green-500'
                    : 'border-l-4 border-l-red-500'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${method.type === 'flutterwave'
                        ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                        : method.type === 'paystack'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                          : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      }
                    `}>
                      <span className="font-bold text-sm">
                        {method.type === 'flutterwave' ? 'Fw' : method.type === 'paystack' ? 'Ps' : 'St'}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {method.name}
                        </h3>
                        {method.isDefault && (
                          <span className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                            Default
                          </span>
                        )}
                        {method.status === 'active' ? (
                          <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                            <CheckCircle size={12} className="mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center text-xs text-red-600 dark:text-red-400">
                            <AlertCircle size={12} className="mr-1" />
                            Expired
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Connected: {method.connected}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!method.isDefault && method.status === 'active' && (
                      <button
                        onClick={() => handleSetDefaultPayment(method.id)}
                        className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
                      >
                        Set Default
                      </button>
                    )}
                    {method.status === 'expired' && (
                      <button
                        onClick={() => handleReconnectPayment(method.id)}
                        disabled={reconnectingId === method.id}
                        className={`
                          inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                          ${reconnectingId === method.id ? 'opacity-75 cursor-not-allowed' : ''}
                        `}
                      >
                        {reconnectingId === method.id ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Reconnecting...
                          </>
                        ) : (
                          <>
                            <RefreshCw size={14} className="mr-2" />
                            Reconnect
                          </>
                        )}
                      </button>
                    )}
                    {method.status === 'active' && !method.isDefault && (
                      <button
                        onClick={() => handleRemovePayment(method.id)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 size={14} className="mr-2" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isAddingPayment ? (
              <div className="p-6 border rounded-lg bg-white dark:bg-gray-800">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Connect a new payment method
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Flutterwave', 'Paystack', 'Stripe'].map((provider) => (
                    <button
                      key={provider}
                      onClick={() => setIsAddingPayment(false)}
                      className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center mb-2
                        ${provider === 'Flutterwave'
                          ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                          : provider === 'Paystack'
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                            : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        }
                      `}>
                        <span className="font-bold">
                          {provider === 'Flutterwave' ? 'Fw' : provider === 'Paystack' ? 'Ps' : 'St'}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{provider}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setIsAddingPayment(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingPayment(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Plus size={16} className="mr-2" />
                Add Payment Method
              </button>
            )}
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="animate-fadeIn">
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        {notification.icon}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {notification.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {notification.description}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center">
                            <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email
                            </span>
                          </div>
                          <button
                            onClick={() => handleToggleNotification(notification.id, 'email')}
                            className={`
                              relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                              ${notification.email ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}
                            `}
                          >
                            <span className="sr-only">Toggle email notifications</span>
                            <span
                              className={`
                                pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                ${notification.email ? 'translate-x-4' : 'translate-x-0'}
                              `}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center">
                            <MessageSquare size={16} className="text-gray-500 dark:text-gray-400" />
                            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              SMS
                            </span>
                          </div>
                          <button
                            onClick={() => handleToggleNotification(notification.id, 'sms')}
                            className={`
                              relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                              ${notification.sms ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}
                            `}
                          >
                            <span className="sr-only">Toggle SMS notifications</span>
                            <span
                              className={`
                                pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                ${notification.sms ? 'translate-x-4' : 'translate-x-0'}
                              `}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center">
                            <Bell size={16} className="text-gray-500 dark:text-gray-400" />
                            <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              In-App
                            </span>
                          </div>
                          <button
                            onClick={() => handleToggleNotification(notification.id, 'inApp')}
                            className={`
                              relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                              ${notification.inApp ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}
                            `}
                          >
                            <span className="sr-only">Toggle in-app notifications</span>
                            <span
                              className={`
                                pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                ${notification.inApp ? 'translate-x-4' : 'translate-x-0'}
                              `}
                            />
                
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSaveNotifications}
                disabled={isNotificationsSaving}
                className={`
                  inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${isNotificationsSaving ? 'opacity-75 cursor-not-allowed' : ''}
                `}
              >
                {isNotificationsSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    {isNotificationsSaved ? 'Saved' : 'Save Preferences'}
                  </>
                )}
              </button>
            </div>

            {isNotificationsSaved && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <p className="text-sm text-green-800 dark:text-green-400">
                  Notification preferences saved successfully.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessSettings;