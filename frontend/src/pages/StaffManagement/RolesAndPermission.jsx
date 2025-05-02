import { FiPlus } from "react-icons/fi";
const RolePermissions = () => {
  const roles = [
    { name: "Store Manager", permissions: ["all"] },
    { name: "Sales Associate", permissions: ["pos", "customers"] },
    { name: "Inventory Clerk", permissions: ["products", "stock"] },
  ];

  const permissionsList = [
    { id: "pos", label: "POS Access" },
    { id: "products", label: "Manage Products" },
    { id: "stock", label: "Manage Stock" },
    { id: "customers", label: "Manage Customers" },
    { id: "reports", label: "View Reports" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
          Role & Permissions Management
        </h3>
        <button className="flex items-center bg-brand-blue text-white px-4 py-2 rounded-lg">
          <FiPlus className="mr-2" /> New Role
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Role</th>
              {permissionsList.map((perm) => (
                <th key={perm.id} className="px-6 py-3 text-center">
                  {perm.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.name} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 font-semibold">{role.name}</td>
                {permissionsList.map((perm) => (
                  <td key={perm.id} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={role.permissions.includes("all") || role.permissions.includes(perm.id)}
                        className="h-5 w-5 text-brand-blue rounded border-gray-300"
                      />
                    </div>
                  </td>
                ))}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-brand-blue hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
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

export default RolePermissions;