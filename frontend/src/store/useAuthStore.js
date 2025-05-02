// src/store/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import Dexie from "dexie";
import bcryptjs from "bcryptjs";
import axios from "axios";
import { encrypt, decrypt } from "../utils/cryto";

const db = new Dexie("stockPadiDB");
db.version(1).stores({
  users: "++id, email, passwordHash, profile, token", // Changed schema
});


const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      isOffline: !navigator.onLine,

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setIsOffline: (isOffline) => set({ isOffline }),

      initNetworkListener: () => {
        const updateStatus = () => set({ isOffline: !navigator.onLine });
        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);
        return () => {
          window.removeEventListener("online", updateStatus);
          window.removeEventListener("offline", updateStatus);
        };
      },

      checkAutoLogin: async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
      
        try {
          const userRecord = await db.users.where("token").equals(token).first();
          if (!userRecord?.profile) {
            console.log("No user profile found");
            return;
          }
      
          const user = decrypt(userRecord.profile);
          set({ user });
        } catch (error) {
          console.error("Auto-login error:", error);
          // Clear invalid token
          localStorage.removeItem("token");
        }
      },
      

      register: async (email, password, businessname) => {
        set({ loading: true });
        try {
          const res = await axios.post("/api/v1/register", {
            email,
            password,
            businessname,
          });
          return res.status === 201
            ? { success: true, message: "Registration successful" }
            : { success: false, message: res.data.message || "Registration failed" };
        } catch (err) {
          return {
            success: false,
            message: err.response?.data?.message || "Registration failed",
          };
        } finally {
          set({ loading: false });
        }
      },

      registerStaff: async (email, password, staffData) => {
        set({ loading: true });
        try {
          const res = await axios.post("/api/staff/register", {
            email,
            password,
            ...staffData,
          });
          return res.status === 201
            ? { success: true, message: "Staff registration successful" }
            : { success: false, message: res.data.message || "Registration failed" };
        } catch (err) {
          return {
            success: false,
            message: err.response?.data?.message || "Registration failed",
          };
        } finally {
          set({ loading: false });
        }
      },

      loginOnline: async (email, password) => {
        set({ loading: true });
        try {
          const res = await axios.post("/api/login", { email, password });
          if (res.status === 200) {
            const { token, user } = res.data;
            const passwordHash = bcryptjs.hashSync(password, 10);
            const encryptedProfile = encrypt(JSON.stringify(user));

            await db.users.put({
              email,
              passwordHash,
              profile: encryptedProfile,
              token,
            });

            localStorage.setItem("token", token);
            set({ user });
            return { success: true };
          }
          return { success: false, message: res.data.message };
        } catch (err) {
          return {
            success: false,
            message: err.response?.data?.message || "Login failed",
          };
        } finally {
          set({ loading: false });
        }
      },

      loginOffline: async (email, password) => {
        set({ loading: true });
        try {
          const userRecord = await db.users.where("email").equals(email).first();
          if (!userRecord) {
            return { success: false, message: "No offline record found" };
          }
      
          const isValid = bcryptjs.compareSync(password, userRecord.passwordHash);
          if (!isValid) {
            return { success: false, message: "Invalid password" };
          }
      
          const user = decrypt(userRecord.profile);
          set({ user });
          return { success: true };
        } catch (error) {
          return { 
            success: false, 
            message: error.message || "Failed to decrypt user data" 
          };
        } finally {
          set({ loading: false });
        }
      },

      logOut: () => {
        localStorage.removeItem("token");
        set({ user: null, loading: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAuthStore;