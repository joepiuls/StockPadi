import { FiDownload } from "react-icons/fi";

const TaxReports = () => {
    const taxData = [
      { period: 'Q1 2023', sales: 2450000, taxCollected: 183750, status: 'Paid' },
      { period: 'Q2 2023', sales: 3150000, taxCollected: 236250, status: 'Pending' },
    ];
  
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
            Tax & VAT Management
          </h3>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-brand-blue">
              <FiDownload /> PDF
            </button>
            <button className="flex items-center gap-2 text-brand-blue">
              <FiDownload /> CSV
            </button>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-brand-blue">Total Tax Liability</p>
            <p className="text-2xl font-bold text-brand-dark dark:text-white">₦1,275,500</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Current Fiscal Year</p>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-300">Tax Payments</p>
            <p className="text-2xl font-bold text-brand-dark dark:text-white">₦923,400</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Paid to FIRS</p>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Period</th>
                <th className="pb-3">Total Sales</th>
                <th className="pb-3">Tax Collected (7.5%)</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {taxData.map((item) => (
                <tr key={item.period} className="border-b">
                  <td className="py-4">{item.period}</td>
                  <td className="py-4">₦{item.sales.toLocaleString()}</td>
                  <td className="py-4 text-brand-blue">₦{item.taxCollected.toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      item.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4">2023-{item.period.split(' ')[1]}-30</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default TaxReports;