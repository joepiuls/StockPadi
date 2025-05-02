import React, { useState } from 'react';
import { Plus, MapPin, User, DollarSign, Building2, Edit3, BarChart3, Trash2, Search, Filter, ChevronDown, CheckCircle, XCircle, Users, Package, Calendar, X } from 'lucide-react';

const BranchesManagement = () => {
  const [isAddingBranch, setIsAddingBranch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: '',
    location: '',
    manager: '',
    status: 'active'
  });
  const [formErrors, setFormErrors] = useState({});
  
  const branches = [
    {
      id: 1,
      name: "Main Store - Lagos",
      location: "14 Admiralty Way, Victoria Island, Lagos",
      manager: "Adeola Ahmed",
      sales: "₦2.4M",
      status: "active",
      inventory: 342,
      staff: 12,
      lastUpdated: "2024-03-15T10:30:00",
      performance: 92,
      isDefault: true
    },
    {
      id: 2,
      name: "Abuja Branch",
      location: "Plot 234, Wuse II, Abuja",
      manager: "Ibrahim Musa",
      sales: "₦1.8M",
      status: "active",
      inventory: 256,
      staff: 8,
      lastUpdated: "2024-03-14T16:45:00",
      performance: 85,
      isDefault: false
    },
    {
      id: 3,
      name: "Port Harcourt Store",
      location: "121 Aba Road, Port Harcourt",
      manager: "Chioma Okafor",
      sales: "₦980K",
      status: "inactive",
      inventory: 185,
      staff: 6,
      lastUpdated: "2024-03-13T09:15:00",
      performance: 64,
      isDefault: false
    }
  ];

  const [branchList, setBranchList] = useState(branches);

  const filteredBranches = branchList.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         branch.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         branch.manager.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || branch.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBranch(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newBranch.name.trim()) errors.name = 'Branch name is required';
    if (!newBranch.location.trim()) errors.location = 'Location is required';
    if (!newBranch.manager.trim()) errors.manager = 'Manager name is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newBranchData = {
      id: branchList.length + 1,
      ...newBranch,
      sales: '₦0',
      inventory: 0,
      staff: 1,
      lastUpdated: new Date().toISOString(),
      performance: 0,
      isDefault: false
    };

    setBranchList(prev => [...prev, newBranchData]);
    setIsAddingBranch(false);
    setNewBranch({
      name: '',
      location: '',
      manager: '',
      status: 'active'
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-green-600 dark:text-green-400';
    if (performance >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Branches & Outlets</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your business locations and track their performance
            </p>
          </div>
          
          <button
            onClick={() => setIsAddingBranch(true)}
            className="inline-flex items-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <Plus size={18} className="mr-2" />
            Add New Branch
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by branch name, location, or manager..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="inline-flex items-center px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Filter size={18} className="mr-2" />
                  Status: {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                  <ChevronDown size={18} className="ml-2" />
                </button>
                
                {showStatusDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="py-1">
                      {['all', 'active', 'inactive'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setFilterStatus(status);
                            setShowStatusDropdown(false);
                          }}
                          className={`
                            w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700
                            ${filterStatus === status ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'}
                          `}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBranches.map((branch) => (
                <div
                  key={branch.id}
                  className={`
                    bg-white dark:bg-gray-800 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200
                    ${branch.isDefault 
                      ? 'border-blue-200 dark:border-blue-800' 
                      : 'border-gray-200 dark:border-gray-700'
                    }
                  `}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {branch.name}
                          </h3>
                          {branch.isDefault && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin size={16} className="mr-1 flex-shrink-0" />
                          <span className="truncate">{branch.location}</span>
                        </div>
                      </div>
                      <span
                        className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${branch.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }
                        `}
                      >
                        {branch.status === 'active' ? (
                          <CheckCircle size={14} className="mr-1" />
                        ) : (
                          <XCircle size={14} className="mr-1" />
                        )}
                        {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <User size={16} className="mr-1" />
                          Manager
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white truncate">
                          {branch.manager}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <DollarSign size={16} className="mr-1" />
                          Monthly Sales
                        </div>
                        <div className="font-medium text-blue-600 dark:text-blue-400">
                          {branch.sales}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <Package size={16} className="text-gray-400 mb-1" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {branch.inventory}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Items</span>
                      </div>
                      
                      <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <Users size={16} className="text-gray-400 mb-1" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {branch.staff}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Staff</span>
                      </div>
                      
                      <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <BarChart3 size={16} className="text-gray-400 mb-1" />
                        <span className={`text-sm font-medium ${getPerformanceColor(branch.performance)}`}>
                          {branch.performance}%
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Score</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Calendar size={14} className="mr-1" />
                        Updated {formatDate(branch.lastUpdated)}
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button 
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                          title="Edit branch"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                          title="View reports"
                        >
                          <BarChart3 size={18} />
                        </button>
                        {!branch.isDefault && (
                          <button 
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                            title="Delete branch"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Branch Modal */}
      {isAddingBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Branch</h2>
              <button
                onClick={() => setIsAddingBranch(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Branch Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newBranch.name}
                  onChange={handleInputChange}
                  className={`
                    w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    ${formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                  `}
                  placeholder="Enter branch name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={newBranch.location}
                  onChange={handleInputChange}
                  className={`
                    w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    ${formErrors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                  `}
                  placeholder="Enter branch location"
                />
                {formErrors.location && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Branch Manager
                </label>
                <input
                  type="text"
                  name="manager"
                  value={newBranch.manager}
                  onChange={handleInputChange}
                  className={`
                    w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    ${formErrors.manager ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                  `}
                  placeholder="Enter manager's name"
                />
                {formErrors.manager && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.manager}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={newBranch.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddingBranch(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchesManagement;