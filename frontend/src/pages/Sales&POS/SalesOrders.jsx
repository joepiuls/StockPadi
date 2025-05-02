import { FiPlus } from "react-icons/fi";
const PurchaseOrders = () => {
  const orders = [
    {
      id: "PO-2341",
      supplier: "Dangote Foods",
      items: 12,
      total: 450000,
      status: "Pending",
      deliveryDate: "2023-10-15"
    },
    // Add more orders...
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
          Purchase Order Management
        </h3>
        <button className="flex items-center bg-brand-blue text-white px-4 py-2 rounded-lg">
          <FiPlus className="mr-2" /> New Order
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Supplier</th>
              <th className="px-6 py-3 text-left">Items</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Delivery Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 font-semibold text-brand-blue">{order.id}</td>
                <td className="px-6 py-4">{order.supplier}</td>
                <td className="px-6 py-4">{order.items} items</td>
                <td className="px-6 py-4">₦{order.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">{order.deliveryDate}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-brand-blue hover:underline">Track</button>
                    <button className="text-red-500 hover:underline">Cancel</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Creation Modal */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-2xl">
          <h4 className="text-xl font-bold mb-4">Create Purchase Order</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block mb-2">Supplier</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Select Supplier</option>
                <option>Dangote Foods</option>
              </select>
            </div>
            {/* Add more form fields */}
            <div className="col-span-2 flex justify-end gap-4 mt-4">
              <button className="px-4 py-2 border border-brand-blue text-brand-blue rounded-lg">
                Cancel
              </button>
              <button className="px-4 py-2 bg-brand-blue text-white rounded-lg">
                Create Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrders;