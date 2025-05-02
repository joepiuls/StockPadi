// components/ai/CustomerInsights.jsx
const CustomerInsights = () => {
    const insights = [
      { category: "Age Group", values: { "18-25": 35, "26-35": 45, "36-45": 15 } },
      { category: "Preferred Payment", values: { Cash: 40, Transfer: 35, POS: 25 } },
      { category: "Purchase Frequency", values: { Daily: 15, Weekly: 40, Monthly: 45 } }
    ];
  
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
            Customer Behavior Insights
          </h3>
          <select className="bg-brand-blue/10 text-brand-dark dark:text-white px-3 py-1 rounded-lg">
            <option>Last 30 Days</option>
            <option>Quarterly</option>
          </select>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight) => (
            <div key={insight.category} className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-4 text-brand-dark dark:text-white">
                {insight.category}
              </h4>
              <div className="space-y-3">
                {Object.entries(insight.values).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{key}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-brand-blue h-2 rounded-full" 
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="text-sm w-10 text-right">{value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-6 p-4 bg-brand-blue/5 rounded-lg">
          <h4 className="font-semibold mb-2 text-brand-dark dark:text-white">
            AI Recommendations
          </h4>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm text-gray-600 dark:text-gray-300">
              Target weekly buyers with loyalty program (45% of customers)
            </li>
            <li className="text-sm text-gray-600 dark:text-gray-300">
              Introduce mobile money payments to capture 35% transfer users
            </li>
          </ul>
        </div>
      </div>
    );
  };

  export default CustomerInsights;