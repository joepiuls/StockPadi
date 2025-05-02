import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const SalesForecast = () => {
  const forecastData = [
    { month: 'Jan', actual: 45, forecast: 38 },
    { month: 'Feb', actual: 52, forecast: 47 },
    { month: 'Mar', actual: 68, forecast: 62 },
    { month: 'Apr', actual: 79, forecast: 71 },
    { month: 'May', actual: 82, forecast: 85 },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
          AI-Powered Sales Forecasting
        </h3>
        <select className="bg-brand-blue/10 text-brand-dark dark:text-white px-3 py-1 rounded-lg">
          <option>Last 6 Months</option>
          <option>Yearly View</option>
        </select>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#3D57F2"
              strokeWidth={2}
              dot={{ fill: '#3D57F2' }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#05095F"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#05095F' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-300">Best Selling Product</p>
          <p className="font-semibold text-brand-dark dark:text-white">Golden Penny Semovita</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Projected +15% sales</p>
        </div>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-brand-blue">Recommended Stock Order</p>
          <p className="font-semibold text-brand-dark dark:text-white">1,250 units</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Next 30 days</p>
        </div>
        
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-purple-600 dark:text-purple-300">Customer Growth</p>
          <p className="font-semibold text-brand-dark dark:text-white">+23% MoM</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Lagos region</p>
        </div>
      </div>
    </div>
  );
};

export default SalesForecast;