import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Package, Users, ActivitySquare, TrendingUp, TrendingDown, Calendar, ClockIcon, AlertCircle, ArrowUpRight } from 'lucide-react';

function Overview() {
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date());
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateMockSalesData = (start, end) => {
    const data = [];
    const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    const currentDate = new Date(start);
    for (let i = 0; i <= days; i++) {
      const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      data.push({
        name: formattedDate,
        sales: Math.floor(Math.random() * 100000) + 50000,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
  };

  const fetchSalesData = async (start, end) => {
    setLoading(true);
    try {
      const data = generateMockSalesData(start, end);
      setTimeout(() => {
        setSalesData(data);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Failed to fetch sales data", error);
      setSalesData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData(startDate, endDate);
  }, [startDate, endDate]);

  const metrics = [
    { 
      title: "Daily Sales", 
      value: "₦452,800", 
      icon: <DollarSign className="text-blue-500" size={20} />, 
      trend: "+12% from yesterday",
      trendUp: true 
    },
    { 
      title: "Active Products", 
      value: "1,234", 
      icon: <Package className="text-indigo-600" size={20} />, 
      trend: "5 new today",
      trendUp: true 
    },
    { 
      title: "New Customers", 
      value: "89", 
      icon: <Users className="text-green-500" size={20} />, 
      trend: "+15% monthly",
      trendUp: true 
    },
    { 
      title: "Stock Alerts", 
      value: "23", 
      icon: <ActivitySquare className="text-red-500" size={20} />, 
      trend: "Urgent restock needed",
      trendUp: false 
    }
  ];

  const transactions = [
    { 
      id: 1, 
      title: "POS Sale", 
      time: "2 mins ago", 
      amount: "₦45,000", 
      isCredit: true 
    },
    { 
      id: 2, 
      title: "Inventory Purchase", 
      time: "1 hour ago", 
      amount: "₦125,000", 
      isCredit: false 
    },
    { 
      id: 3, 
      title: "Cash Sale", 
      time: "3 hours ago", 
      amount: "₦32,500", 
      isCredit: true 
    }
  ];

  const lowStockItems = [
    { id: 1, name: "Premium Rice", quantity: 5, threshold: 20 },
    { id: 2, name: "Cooking Oil", quantity: 8, threshold: 15 },
    { id: 3, name: "Laundry Detergent", quantity: 3, threshold: 10 }
  ];

  const handleDateChange = (days) => {
    const today = new Date();
    const newDate = new Date();
    newDate.setDate(today.getDate() - days);
    setStartDate(newDate);
    setEndDate(today);
  };

  const formatCurrency = (value) => {
    return `₦${value.toLocaleString('en-NG')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dashboard Overview
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  {metric.icon}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {metric.trendUp ? (
                    <TrendingUp size={16} className="text-green-500" />
                  ) : (
                    <TrendingDown size={16} className="text-red-500" />
                  )}
                  <span className={metric.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {metric.trend}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
                {metric.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{metric.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sales Performance
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => handleDateChange(7)}
                className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
              >
                Last 7 days
              </button>
              <button 
                onClick={() => handleDateChange(30)}
                className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200"
              >
                Last 30 days
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                <Calendar size={16} />
                <span>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="h-10 w-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : salesData.length === 0 ? (
              <div className="h-full w-full flex items-center justify-center text-gray-400">
                No sales data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280" 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`} 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      padding: '0.75rem'
                    }}
                    formatter={(value) => [formatCurrency(value), 'Sales']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Transactions
              </h3>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                View all
                <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${transaction.isCredit ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                      <ClockIcon 
                        size={16} 
                        className={transaction.isCredit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} 
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{transaction.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.time}</p>
                    </div>
                  </div>
                  <span className={`font-semibold ${transaction.isCredit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {transaction.isCredit ? '+' : '-'}{transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertCircle size={18} className="text-red-500" />
                Low Stock Alerts
              </h3>
              <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-xs font-medium rounded-full">
                {lowStockItems.length} items
              </span>
            </div>
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <div className="mt-1 flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className="bg-red-500 h-1.5 rounded-full" 
                          style={{ width: `${(item.quantity / item.threshold) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-400 ml-2">
                        {item.quantity} of {item.threshold} units
                      </p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200">
                    Reorder
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;