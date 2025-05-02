import { FiTag } from "react-icons/fi";
const DiscountManager = () => {
  const discounts = [
    {
      code: "FESTIVE10",
      type: "Percentage",
      value: "10%",
      remaining: 45,
      validUntil: "2023-12-31"
    },
    // Add more discounts...
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
          Discounts & Promotions
        </h3>
        <button className="flex items-center bg-brand-blue text-white px-4 py-2 rounded-lg">
          <FiTag className="mr-2" /> Create Coupon
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Coupon Code</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Value</th>
              <th className="px-6 py-3 text-left">Remaining</th>
              <th className="px-6 py-3 text-left">Valid Until</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.code} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 font-mono text-brand-blue">{discount.code}</td>
                <td className="px-6 py-4">{discount.type}</td>
                <td className="px-6 py-4 text-brand-blue">{discount.value}</td>
                <td className="px-6 py-4">{discount.remaining} uses</td>
                <td className="px-6 py-4">{discount.validUntil}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-brand-blue hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline">Deactivate</button>
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

export default DiscountManager;