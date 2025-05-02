import React, { useState } from 'react';
import { Check, Download, CreditCard, Building2, Users, Zap, Crown, Shield, BarChart3, Clock, ArrowUpRight } from 'lucide-react';

function BillingDashboard() {
  const [currentPlan, setCurrentPlan] = useState('Pro');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Basic",
      price: billingCycle === 'monthly' ? "₦5,000" : "₦50,000",
      features: [
        { text: "1 Outlet", icon: <Building2 size={16} /> },
        { text: "100 Products", icon: <CreditCard size={16} /> },
        { text: "Basic Reports", icon: <BarChart3 size={16} /> },
        { text: "Email Support", icon: <Shield size={16} /> }
      ],
      recommended: false,
      cta: "Get Started"
    },
    {
      name: "Pro",
      price: billingCycle === 'monthly' ? "₦15,000" : "₦150,000",
      features: [
        { text: "3 Outlets", icon: <Building2 size={16} /> },
        { text: "Unlimited Products", icon: <CreditCard size={16} /> },
        { text: "Advanced Analytics", icon: <BarChart3 size={16} /> },
        { text: "Priority Support", icon: <Zap size={16} /> }
      ],
      recommended: true,
      cta: "Upgrade Now"
    },
    {
      name: "Enterprise",
      price: billingCycle === 'monthly' ? "₦35,000" : "₦350,000",
      features: [
        { text: "10 Outlets", icon: <Building2 size={16} /> },
        { text: "Custom Branding", icon: <Crown size={16} /> },
        { text: "Custom Reports", icon: <Users size={16} /> },
        { text: "24/7 Support", icon: <Shield size={16} /> }
      ],
      recommended: false,
      cta: "Contact Sales"
    }
  ];

  const paymentHistory = [
    {
      id: 1,
      date: "Mar 15, 2024",
      amount: "₦15,000",
      method: "Bank Transfer",
      status: "Successful",
      invoice: "INV-2024-001"
    },
    {
      id: 2,
      date: "Feb 15, 2024",
      amount: "₦15,000",
      method: "Credit Card",
      status: "Successful",
      invoice: "INV-2024-002"
    },
    {
      id: 3,
      date: "Jan 15, 2024",
      amount: "₦15,000",
      method: "Bank Transfer",
      status: "Successful",
      invoice: "INV-2024-003"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Subscription</h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your subscription and billing details</p>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  billingCycle === 'annual'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          {/* Current Plan Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Current Plan: {currentPlan}</span>
                  <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Your next billing date is April 15, 2024</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200">
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md ${
                  plan.recommended
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-gray-100 dark:border-gray-700'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <div className="p-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        {feature.icon}
                      </div>
                      {feature.text}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setCurrentPlan(plan.name)}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    plan.recommended
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  {currentPlan === plan.name ? 'Current Plan' : plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Payment History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment History</h3>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  View all
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {paymentHistory.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          {payment.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {payment.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                          <Download size={16} />
                          {payment.invoice}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingDashboard;