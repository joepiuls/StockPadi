import { create } from "zustand";
import Dexie from "dexie";

// Initialize Dexie Database
const db = new Dexie("notificationsDB");
db.version(1).stores({
  notifications: "++id, title, message, isRead, createdAt"
});

// Zustand Store
export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isOpen:false,

  setIsOpen:(open)=>set({isOpen:open}),

  fetchNotifications: async () => {
    const allNotifications = await db.notifications.orderBy('createdAt').reverse().toArray();
    const unread = allNotifications.filter(n => !n.isRead).length;

    set({ notifications: allNotifications, unreadCount: unread });
  },

  addNotification: async (title, message) => {
    await db.notifications.add({
      title,
      message,
      isRead: false,
      createdAt: new Date()
    });
    get().fetchNotifications();
  },

  markAllAsRead: async () => {
    await db.notifications.toCollection().modify({ isRead: true });
    get().fetchNotifications();
  },

  deleteNotification: async (id) => {
    await db.notifications.delete(id);
    get().fetchNotifications();
  },

  clearNotifications: async () => {
    await db.notifications.clear();
    get().fetchNotifications();
  },

  simulateNotification: () => {
    const titles = ["New Sale", "New Message", "System Alert", "Inventory Low", "Customer Feedback"];
    const messages = [
      "You have a new sale!",
      "You received a new support message.",
      "Server maintenance scheduled tonight.",
      "Stock for product X is running low.",
      "A customer left a 5-star review!"
    ];
  
    const randomIndex = Math.floor(Math.random() * titles.length);
  
    const newNotification = {
      title: titles[randomIndex],
      message: messages[randomIndex],
      isRead: false,
      createdAt: new Date()
    };
  
    db.notifications.add(newNotification).then(() => {
      get().fetchNotifications();
    });
  }
  
}));

export default useNotificationStore;
