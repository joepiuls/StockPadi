// stores/useProductStore.js
import { create } from 'zustand';
import Dexie from 'dexie';
import useNotificationStore from './useNotificationStore';

// Dexie DB setup for persistent inventory
export const db = new Dexie('stockpadi-products');
db.version(1).stores({ inventory: '++id,name,category,stock,price' });

const useProductStore = create((set, get) => ({
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,

  setOnlineStatus: (online) => set({ isOnline: online }),
  inventoryItems: [ 
    { id: 1, name: "Premium Rice", category: "Grains", stock: 45, price: 2500 },
    { id: 2, name: "Vegetable Oil", category: "Oils", stock: 32, price: 3500 },
    { id: 3, name: "Tomato Paste", category: "Condiments", stock: 18, price: 1200 }],
  searchQuery: '',
  selectedCategory: '',
  isModalOpen: false,
  editingItem: null,
  formData: { name: '', category: '', stock: '', price: '' },

  fetchInventory: async () => {
    const all = await db.inventory.toArray();
    set({ inventoryItems: all });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setIsModalOpen: (open) => set({ isModalOpen: open }),
  setEditingItem: (item) => set({ editingItem: item }),
  setFormData: (formData) => set({ formData }),

  resetForm: () => set({
    formData: { name: '', category: '', stock: '', price: '' },
    editingItem: null,
    isModalOpen: true,
  }),

  handleAddOrEditItem: async () => {
    const { formData, editingItem, isOnline } = get();
    const newItem = {
      id: editingItem?.id || Date.now(),
      name: formData.name,
      category: formData.category,
      stock: parseInt(formData.stock),
      price: parseFloat(formData.price),
    };

    if (editingItem) {
      await db.inventory.put(newItem);
    } else {
      await db.inventory.add(newItem);
    }

    if (!isOnline) {
      const pending = (await db.table('inventory').get('pendingEdits'))?.value || [];
      await db.table('inventory').put({ id: 'pendingEdits', value: [...pending, newItem] });
    } else {
      // Optional: sync to server here
    }

    await get().fetchInventory();
    set({ isModalOpen: false, editingItem: null });

    const notify = useNotificationStore.getState().addNotification;
    notify(editingItem ? 'Edited a Product' : 'New Product Added', newItem.name);
  },

  handleDeleteItem: async (id) => {
    const item = await db.inventory.get(id);
    await db.inventory.delete(id);
    await get().fetchInventory();

    const notify = useNotificationStore.getState().addNotification;
    notify('Deleted a Product', item?.name);
  },

  filteredItems: () => {
    const { inventoryItems, searchQuery, selectedCategory } = get();
    return inventoryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  },

  categories: () => {
    const { inventoryItems } = get();
    return Array.from(new Set(inventoryItems.map(i => i.category)));
  },

}));

// Setup network status listener
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => useProductStore.getState().setOnlineStatus(true));
  window.addEventListener('offline', () => useProductStore.getState().setOnlineStatus(false));
}

// Attempt to sync pending changes when back online
if (typeof window !== 'undefined') {
  window.addEventListener('online', async () => {
    const store = useProductStore.getState();
    store.setOnlineStatus(true);

    const pending = (await db.table('inventory').get('pendingEdits'))?.value || [];
    if (pending.length > 0) {
      try {
        await fetch('/api/sync/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pending),
        });
        await db.table('inventory').put({ id: 'pendingEdits', value: [] });
      } catch (e) {
        console.warn('Resync failed', e);
      }
    }
  });
}

export default useProductStore;
