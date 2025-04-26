import {create} from 'zustand';

const AuthStore = create((set, get)=>({
    user: null,
    loading: false,
    isOffline: false,
    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ loading }),
    setIsOffline: (isOffline) => set({ isOffline }),
}))

export default AuthStore;