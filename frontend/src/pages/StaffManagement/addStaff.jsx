import React, { useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';
import useStaffStore from '../../store/useStaffStore';
import { motion } from 'framer-motion';

function StaffManagement() {
  const {
    staffMembers,
    handleAddOrEditStaff,
    searchQuery,
    handleDeleteStaff,
    selectedDepartment,
    isModalOpen,
    formData,
    filteredStaff: getStaff,
    setFormData,
    setEditingStaff,
    setIsModalOpen,
    departments: getDepartments,
    resetForm,
    editingStaff,
    setSearchQuery,
    setSelectedDepartment,
    error,
    isLoading
  } = useStaffStore();
  
  const departments = getDepartments();
  const filteredStaff = getStaff();
  
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);
  
  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setFormData({
      fullName: staff.fullName,
      email: staff.email,
      role: staff.role,
      department: staff.department,
      phone: staff.phone,
    });
    setIsModalOpen(true);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleAddOrEditStaff();
      // Reset form only on success
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      // Error handling is already done in the store
    }
  };
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        resetForm();
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);
  
  // Add confirmation for deletion
  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      handleDeleteStaff(id);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Team Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {filteredStaff.length} team members found
            </p>
          </div>
          <button
            onClick={()=>{
              resetForm(); // Clear previous form data
              setIsModalOpen(true);
            }}
            className="flex items-center bg-brand-blue hover:bg-brand-blue/90 text-white px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Add Team Member
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or role..."
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="w-full py-2.5 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-blue"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments?.map((department) => (
                <option key={department} value={department} className="dark:bg-gray-800">
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {['Name', 'Role', 'Department', 'Contact', 'Actions'].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStaff.map((staff) => (
                  <tr
                    key={staff.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                      {staff.fullName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {staff.role}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {staff.department}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col">
                        <a
                          href={`mailto:${staff.email}`}
                          className="hover:text-brand-blue dark:hover:text-brand-blue-light transition-colors"
                        >
                          {staff.email}
                        </a>
                        <span className="text-xs text-gray-400">{staff.phone}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(staff)}
                          className="text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue-light transition-colors"
                          aria-label="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this staff member?')) {
                              handleDeleteStaff(staff.id);
                            }
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md"
            >
              <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingStaff ? 'Edit Team Member' : 'New Team Member'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
  {/* Full Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Full Name *
    </label>
    <input
      type="text"
      required
      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-brand-blue"
      value={formData.fullName}
      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
    />
    {error?.fullName && <p className="text-red-500 text-sm mt-1">{error.fullName}</p>}
  </div>

  {/* Email */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Email *
    </label>
    <input
      type="email"
      required
      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-brand-blue"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />
    {error?.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
  </div>

  {/* Role */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Role *
    </label>
    <select
      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-brand-blue"
      value={formData.role}
      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
    >
      <option value="">Select Role</option>
      <option value="admin">Admin</option>
      <option value="manager">Manager</option>
      <option value="staff">Staff</option>
    </select>
    {error?.role && <p className="text-red-500 text-sm mt-1">{error.role}</p>}
  </div>

  {/* Department */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Department *
    </label>
    <input
      type="text"
      required
      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-brand-blue"
      value={formData.department}
      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
    />
    {error?.department && <p className="text-red-500 text-sm mt-1">{error.department}</p>}
  </div>

  {/* Phone */}
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Phone Number *
    </label>
    <input
      type="tel"
      pattern="[0-9]{11}"
      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-brand-blue"
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    />
    {error?.phone && <p className="text-red-500 text-sm mt-1">{error.phone}</p>}
  </div>

  {/* Submit Button */}
  <div className="flex justify-end gap-3 pt-4">
    <button
      type="button"
      onClick={() => setIsModalOpen(false)}
      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isLoading}
      className="px-4 py-2 bg-brand-blue text-white hover:bg-brand-blue/90 rounded-lg transition-colors disabled:opacity-50"
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <span className="animate-spin">⏳</span>
          {editingStaff ? 'Saving...' : 'Adding...'}
        </div>
      ) : editingStaff ? (
        'Save Changes'
      ) : (
        'Add Member'
      )}
    </button>
  </div>
</form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffManagement;