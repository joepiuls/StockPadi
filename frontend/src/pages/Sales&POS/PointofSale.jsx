// components/sales/PointOfSale.jsx
const PointOfSale = () => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product Grid */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div 
              key={item}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-brand-blue/10 transition-colors"
            >
              <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded-lg mb-2"></div>
              <h4 className="font-medium text-brand-dark dark:text-white">Product {item}</h4>
              <p className="text-brand-blue font-semibold">₦{((item * 1500) + 500).toLocaleString()}</p>
              <button className="w-full mt-2 py-1 bg-brand-blue text-white rounded-md text-sm">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-fit sticky top-6">
        <h3 className="text-xl font-bold mb-6 text-brand-dark dark:text-white">
          Current Sale
        </h3>
        
        <div className="space-y-4 mb-6">
          {[1, 2].map((item) => (
            <div key={item} className="flex justify-between items-center">
              <div>
                <p className="text-brand-dark dark:text-white">Product {item}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button className="text-brand-blue">-</button>
                  <span className="w-8 text-center">2</span>
                  <button className="text-brand-blue">+</button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-brand-dark dark:text-white">₦3,000</p>
                <button className="text-red-500 text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t pt-4 border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
            <span className="text-brand-dark dark:text-white">₦6,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Tax (7.5%):</span>
            <span className="text-brand-dark dark:text-white">₦450</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-brand-dark dark:text-white">Total:</span>
            <span className="text-brand-blue">₦6,450</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button className="w-full py-3 bg-brand-blue text-white rounded-lg font-semibold hover:bg-brand-dark">
            Process Payment
          </button>
          <div className="grid grid-cols-3 gap-2">
            <button className="p-2 border border-brand-blue text-brand-blue rounded-lg">
              Cash
            </button>
            <button className="p-2 border border-brand-blue text-brand-blue rounded-lg">
              Transfer
            </button>
            <button className="p-2 border border-brand-blue text-brand-blue rounded-lg">
              POS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointOfSale;