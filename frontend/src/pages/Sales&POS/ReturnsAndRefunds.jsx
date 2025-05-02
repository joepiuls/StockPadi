import { FiDownload } from "react-icons/fi";
const ReturnsManager = () => {
  const returns = [
    {
      id: "RET-2341",
      product: "Dangote Sugar 1kg",
      reason: "Damaged Package",
      status: "Pending",
      amount: "₦1,500",
      date: "2023-09-20"
    },
    // Add more returns...
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
          Returns & Refunds Management
        </h3>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-brand-blue">
            <FiDownload /> Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Return ID</th>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Reason</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((ret) => (
              <tr key={ret.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 font-semibold text-brand-blue">{ret.id}</td>
                <td className="px-6 py-4">{ret.product}</td>
                <td className="px-6 py-4">{ret.reason}</td>
                <td className="px-6 py-4 text-brand-blue">{ret.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    ret.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    ret.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {ret.status}
                  </span>
                </td>
                <td className="px-6 py-4">{ret.date}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-brand-blue hover:underline">Process</button>
                    <button className="text-red-500 hover:underline">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnsManager