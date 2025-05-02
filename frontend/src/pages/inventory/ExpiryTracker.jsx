import { FiPlus } from "react-icons/fi";
import { FiAlertTriangle } from "react-icons/fi";


const BatchTracker = () => {
  const batches = [
    {
      id: 1,
      product: "Dangote Cement 50kg",
      batch: "BATCH-2023-09",
      expiry: "2024-09-30",
      quantity: 150,
      location: "Warehouse A"
    },
    // Add more batches...
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-dark">Batch & Expiry Management</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search batches..."
            className="w-64 px-4 py-2 border border-gray-200 rounded-lg"
          />
          <button className="flex items-center bg-brand-blue text-white px-4 py-2 rounded-lg">
            <FiPlus className="mr-2" /> New Batch
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Product</th>
                <th className="px-6 py-3 text-left">Batch ID</th>
                <th className="px-6 py-3 text-left">Expiry Date</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{batch.product}</td>
                  <td className="px-6 py-4 font-mono text-brand-blue">{batch.batch}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {batch.expiry}
                      <FiAlertTriangle 
                        className={`ml-2 ${
                          new Date(batch.expiry) < new Date(Date.now() + 12096e5) // 2 weeks
                            ? 'text-red-500' 
                            : 'text-green-500'
                        }`}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{batch.quantity}</td>
                  <td className="px-6 py-4">{batch.location}</td>
                  <td className="px-6 py-4">
                    <button className="text-brand-blue hover:underline mr-3">
                      Transfer
                    </button>
                    <button className="text-red-500 hover:underline">
                      Discard
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BatchTracker;