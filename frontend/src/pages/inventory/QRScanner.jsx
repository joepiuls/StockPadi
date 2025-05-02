import { useState } from "react";
import { FiCamera } from "react-icons/fi";
const BarcodeScanner = () => {
  const [scanData, setScanData] = useState(null);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
          Barcode Scanner
        </h3>
        <button className="flex items-center bg-brand-blue text-white px-4 py-2 rounded-lg">
          <FiCamera className="mr-2" /> Start Scanning
        </button>
      </div>

      <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
        {/* Scanner Preview */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="border-4 border-brand-blue rounded-lg w-64 h-64 animate-pulse" />
        </div>
        
        {/* Scan Results */}
        {scanData && (
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">{scanData.product}</h4>
                <p>Stock: {scanData.stock} units</p>
              </div>
              <button 
                className="text-brand-blue hover:underline"
                onClick={() => setScanData(null)}
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-brand-blue">Last Scanned</p>
          <p className="font-semibold">Golden Penny Semovita</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">2 mins ago</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-300">Stock Level</p>
          <p className="font-semibold">45 units</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Warehouse A</p>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-purple-600 dark:text-purple-300">Reorders Needed</p>
          <p className="font-semibold">12 items</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Low stock alert</p>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;