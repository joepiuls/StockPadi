import { FiPlus } from "react-icons/fi";
const ProductCatalog = () => {
  const products = [
    {
      id: 1,
      name: "Golden Penny Semovita",
      sku: "GP-SEMO-5KG",
      category: "Food Staple",
      price: 3500,
      stock: 45,
      image: "/semovita.jpg"
    },
    // Add more products...
  ];

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-brand-dark dark:text-white">
          Product Catalog
        </h2>
        <div className="flex gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
          <button className="flex items-center bg-brand-blue text-white px-4 py-2 rounded-lg whitespace-nowrap">
            <FiPlus className="mr-2" /> Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <span className="absolute top-2 right-2 bg-brand-blue text-white px-2 py-1 rounded-md text-xs">
                {product.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-brand-dark dark:text-white mb-2">
                {product.name}
              </h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-brand-blue font-bold">₦{product.price.toLocaleString()}</span>
                <span className={`text-sm ${
                  product.stock > 20 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stock} in stock
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 text-sm border border-brand-blue text-brand-blue rounded-lg hover:bg-brand-blue/10">
                  Edit
                </button>
                <button className="flex-1 py-2 text-sm bg-brand-blue text-white rounded-lg hover:bg-brand-dark">
                  Quick Sale
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog