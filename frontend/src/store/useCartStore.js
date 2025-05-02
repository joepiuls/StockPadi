// stores/useCartStore.js
import { create } from 'zustand';
import useProductStore from './useProductStore';
import { db } from './useProductStore';
import {toast} from 'react-toastify'

const CART_KEY = 'stockpadi_cart';

const useCartStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem(CART_KEY) || '[]'),
  paymentMethod: 'cash',
  searchQuery: '',


  setSearchQuery: (q) => set({ searchQuery: q }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),

  saveToStorage: (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  addToCart: (item) => {
    const existing = get().cart.find(p => p.id === item.id);
    const updated = existing
      ? get().cart.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1, subtotal: (p.quantity + 1) * p.price } : p)
      : [...get().cart, { ...item, quantity: 1, subtotal: item.price }];
    set({ cart: updated });
    get().saveToStorage(updated);
  },

  updateQuantity: (id, delta) => {
    const products = useProductStore.getState().inventoryItems;
    const stockMap = Object.fromEntries(products.map(p => [p.id, p.stock]));
    const updated = get().cart.map(item => {
      if (item.id === id) {
        const maxQty = stockMap[id] || 0;
        const newQty = Math.min(Math.max(1, item.quantity + delta), maxQty);
        const warning = item.quantity + delta > maxQty ? 'Adjusted to max available stock' : '';
        return {
          ...item,
          quantity: newQty,
          subtotal: newQty * item.price,
          warning
        };
      }
      return item;
    });
    set({ cart: updated });
    get().saveToStorage(updated);
  },

  removeFromCart: (id) => {
    const updated = get().cart.filter(i => i.id !== id);
    set({ cart: updated });
    get().saveToStorage(updated);
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem(CART_KEY);
  },

  totalAmount: () => get().cart.reduce((sum, item) => sum + item.subtotal, 0),  

  handleSubmit: async () => {
    const { cart, paymentMethod, clearCart } = get();
    const { fetchInventory, inventoryItems } = useProductStore.getState();
  
    for (const item of cart) {
      const inventoryItem = inventoryItems.find(p=>p.id===item.id);
      if (!inventoryItem || inventoryItem.stock < item.quantity) {
        return toast.error(`Insufficient stock for ${item.name}. Available: ${inventoryItem?.stock || 0}`);
      }
      await db.inventory.update(item.id, {
        stock: inventoryItem.stock - item.quantity,
      })
    
      }
    
  
    const receipt = {
      id: Date.now(),
      items: cart,
      total: get().totalAmount(),
      paymentMethod,
      timestamp: new Date().toISOString()
    };
  
    const history = JSON.parse(localStorage.getItem('stockpadi_receipts') || '[]');
    localStorage.setItem('stockpadi_receipts', JSON.stringify([...history, receipt]));
    clearCart();
    fetchInventory();
  
    const receiptWindow = window.open('', '_blank');
    if (receiptWindow) {
      const receiptHTML = `
        <html>
          <head>
            <title>Receipt #${receipt.id}</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
              h2 { color: #1e3a8a; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 14px; }
              th { background-color: #f9fafb; }
              .total { text-align: right; font-weight: bold; margin-top: 20px; }
            </style>
          </head>
          <body>
            <h2>StockPadi Receipt</h2>
            <p><strong>Date:</strong> ${new Date(receipt.timestamp).toLocaleString()}</p>
            <p><strong>Payment Method:</strong> ${receipt.paymentMethod}</p>
            <table>
              <thead>
                <tr><th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
              </thead>
              <tbody>
                ${receipt.items.map(i => `
                  <tr>
                    <td>${i.name}</td>
                    <td>${i.quantity}</td>
                    <td>₦${i.price.toLocaleString()}</td>
                    <td>₦${i.subtotal.toLocaleString()}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
            <p class="total">Total: ₦${receipt.total.toLocaleString()}</p>
          </body>
        </html>
      `;
      receiptWindow.document.write(receiptHTML);
      receiptWindow.document.close();
      receiptWindow.focus();
      receiptWindow.print();
    }
  }
}))


export default useCartStore;
