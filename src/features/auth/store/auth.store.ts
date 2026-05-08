import { create } from 'zustand';
import type { User } from '../types/auth.types';

type AuthState = {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
    isAuthenticated: () => boolean;
};

const stored = localStorage.getItem('auth:user');

export const useAuthStore = create<AuthState>((set, get) => ({
    user: stored ? JSON.parse(stored) : null,
    setUser: (user) => { localStorage.setItem('auth:user', JSON.stringify(user)); set({ user }); },
    logout: () => { localStorage.removeItem('auth:user'); set({ user: null }); },
    isAuthenticated: () => Boolean(get().user),
}));
