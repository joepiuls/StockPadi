import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const useStaffStore = create((set, get) => ({
  // State
  staffMembers: [],
  searchQuery: '',
  selectedDepartment: '',
  isModalOpen: false,
  isLoading: false,
  error: null,
  formData: {
    fullName: '',
    email: '',
    role: '',
    department: '',
    phone: ''
  },
  editingStaff: null,

  // Derived state
  filteredStaff: () => {
    const { staffMembers, searchQuery, selectedDepartment } = get();
    try {
      return staffMembers.filter(staff => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = [
          staff.fullName?.toLowerCase(),
          staff.email?.toLowerCase(),
          staff.role?.toLowerCase(),
          staff.department?.toLowerCase()
        ].some(field => field.includes(searchLower));

        const matchesDepartment = selectedDepartment ? 
          staff.department === selectedDepartment : 
          true;

        return matchesSearch && matchesDepartment;
      });
    } catch (error) {
      console.error('Filter error:', error);
      return [];
    }
  },

  departments: () => {
    try {
      const { staffMembers } = get();
      const depts = Array.from(new Set(staffMembers.map(staff => staff.department)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
      return depts.length > 0 ? depts : ['Unassigned'];
    } catch (error) {
      console.error('Department calculation error:', error);
      return ['Unassigned'];
    }
  },

  // Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedDepartment: (department) => set({ selectedDepartment: department }),
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  
  setFormData: (data) => set(state => ({
    formData: { ...state.formData, ...data }
  })),

  setEditingStaff: (staff) => set({ editingStaff: staff }),

  resetForm: () => set({
    formData: {
      fullName: '',
      email: '',
      role: '',
      department: '',
      phone: ''
    },
    editingStaff: null,
    error: null
  }),

  validateForm: () => {
    const { formData } = get();
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!formData.role) {
      errors.role = 'Role is required';
    }
    
    if (!formData.department.trim()) {
      errors.department = 'Department is required';
    }
    
    if (!/^\d{11}$/.test(formData.phone)) {
      errors.phone = 'Phone must be 11 digits';
    }

    set({ error: Object.keys(errors).length > 0 ? errors : null });
    return Object.keys(errors).length === 0;
  },

  handleAddOrEditStaff: async () => {
    try {
      set({ isLoading: true, error: null });
      
      if (!get().validateForm()) {
        toast.error('Please fix form errors');
        return;
      }

      const { staffMembers, formData, editingStaff } = get();
      const emailExists = staffMembers.some(
        staff => staff.email === formData.email && staff.id !== editingStaff?.id
      );

      if (emailExists) {
        set({ error: { email: 'Email already exists' } });
        toast.error('Email address already in use');
        return;
      }

      if (editingStaff) {
        const updatedStaff = staffMembers.map(staff => 
          staff.id === editingStaff.id ? { ...staff, ...formData } : staff
        );
        set({ staffMembers: updatedStaff });
        toast.success('Staff updated successfully');
      } else {
        const newStaff = {
          id: uuidv4(),
          ...formData,
          createdAt: new Date().toISOString()
        };
        set({ staffMembers: [newStaff, ...staffMembers] });
        toast.success('Staff member added successfully');
      }

      get().resetForm();
      set({ isModalOpen: false });
    } catch (error) {
      console.error('Staff operation failed:', error);
      toast.error('Failed to save staff member');
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  handleDeleteStaff: (id) => {
    try {
      if (!window.confirm('Are you sure you want to delete this staff member?')) return;
      
      set(state => ({
        staffMembers: state.staffMembers.filter(staff => staff.id !== id)
      }));
      toast.success('Staff member deleted');
    } catch (error) {
      console.error('Deletion error:', error);
      toast.error('Failed to delete staff member');
    }
  },

  // Data persistence
  initialize: () => {
    try {
      const savedStaff = localStorage.getItem('staffMembers');
      if (savedStaff) {
        set({ staffMembers: JSON.parse(savedStaff) });
      }
    } catch (error) {
      console.error('Initialization error:', error);
      localStorage.removeItem('staffMembers');
    }
  },

  persist: () => {
    try {
      const { staffMembers } = get();
      localStorage.setItem('staffMembers', JSON.stringify(staffMembers));
    } catch (error) {
      console.error('Persistence error:', error);
      toast.error('Failed to save data locally');
    }
  }
}));

// Setup localStorage persistence
const store = useStaffStore;
store.subscribe((state) => state.persist());
store.getState().initialize();

export default useStaffStore;