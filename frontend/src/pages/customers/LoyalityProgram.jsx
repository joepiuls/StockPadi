import { FiGift } from "react-icons/fi";

const LoyaltyProgram = () => {
    const tiers = [
      { name: 'Silver', minPoints: 0, benefits: ['5% Discount', 'Basic Support'], color: 'bg-gray-300' },
      { name: 'Gold', minPoints: 5000, benefits: ['10% Discount', 'Priority Support'], color: 'bg-yellow-400' },
      { name: 'Platinum', minPoints: 15000, benefits: ['15% Discount', 'VIP Services'], color: 'bg-purple-500' },
    ];
  
    const customers = [
      { name: 'Tunde Adebayo', points: 12450, tier: 'Platinum', purchases: 45 },
      { name: 'Amina Yusuf', points: 8200, tier: 'Gold', purchases: 32 },
    ];
  
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
            Customer Loyalty Program
          </h3>
          <button className="flex items-center bg-brand-blue text-white px-4 py-2 rounded-lg">
            <FiGift className="mr-2" /> Create Promotion
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {tiers.map((tier) => (
            <div key={tier.name} className="p-4 border rounded-lg">
              <div className="flex items-center mb-3">
                <div className={`w-8 h-8 rounded-full ${tier.color} mr-2`} />
                <h4 className="font-semibold text-brand-dark dark:text-white">{tier.name}</h4>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="text-sm text-gray-600 dark:text-gray-300">{benefit}</li>
                ))}
              </ul>
              <div className="mt-3 text-sm text-brand-blue">
                {tier.minPoints.toLocaleString()} Points Minimum
              </div>
            </div>
          ))}
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Customer</th>
                <th className="pb-3">Tier</th>
                <th className="pb-3">Points</th>
                <th className="pb-3">Purchases</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.name} className="border-b">
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center mr-3">
                        <span className="text-brand-blue font-medium">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      {customer.name}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      customer.tier === 'Platinum' ? 'bg-purple-100 text-purple-800' :
                      customer.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100'
                    }`}>
                      {customer.tier}
                    </span>
                  </td>
                  <td className="py-4 font-semibold text-brand-blue">
                    {customer.points.toLocaleString()}
                  </td>
                  <td className="py-4">{customer.purchases}</td>
                  <td className="py-4">
                    <button className="text-brand-blue hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default LoyaltyProgram;