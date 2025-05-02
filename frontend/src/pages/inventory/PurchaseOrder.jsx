// components/PurchaseOrder.jsx
import React, { useState, useEffect } from 'react';
import { Search, Trash2, Plus, Minus } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import useProductStore from '../../store/useProductStore';

const PurchaseOrder = () => {
  const {
    cart, searchQuery, setSearchQuery, paymentMethod,
    saveToStorage, setPaymentMethod,
    addToCart, removeFromCart, updateQuantity,
    clearCart, totalAmount:total, handleSubmit, 
  } = useCartStore();

  const CART_KEY = 'stockpadi_cart';
 
  const totalAmount = total();
  const {inventoryItems} = useProductStore();

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    cart
  }, []);

  useEffect(() => {
    saveToStorage(cart);
  }, [cart]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Purchase Order
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {cart.length} items in cart
            </span>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              placeholder="Search products by name or category..."
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => addToCart(item)}
              className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-brand-blue/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {item.category}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.stock > 20 
                    ? 'bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                    : 'bg-red-100/80 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                }`}>
                  {item.stock} in stock
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-brand-blue font-medium text-sm sm:text-base">
                  ₦{item.price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  SKU: {item.sku || 'N/A'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Cart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Shopping Cart ({cart.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {['Product', 'Price', 'Quantity', 'Subtotal', ''].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {cart.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 max-w-[200px] truncate">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      ₦{item.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      {item.warning && (
                        <p className="mt-1 text-xs text-yellow-600 dark:text-yellow-400">
                          ⚠️ {item.warning}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                      ₦{item.subtotal.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Footer */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-full md:max-w-[240px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded-lg border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 focus:ring-brand-blue focus:border-brand-blue"
                >
                  <option value="cash">Cash</option>
                  <option value="transfer">Bank Transfer</option>
                  <option value="pos">POS Terminal</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    ₦{totalAmount.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSubmit}
                    disabled={!cart.length}
                    className="px-6 py-2.5 bg-brand-blue text-white rounded-lg hover:bg-brand-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
                  >
                    Complete Purchase
                  </button>
                  <button
                    onClick={() => {
                      clearCart();
                      localStorage.removeItem(CART_KEY);
                    }}
                    className="px-4 py-2.5 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium text-sm"
                  >
                    Empty Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrder;
