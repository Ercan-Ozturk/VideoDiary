import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  address: { city: string };
}

interface UserStore {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,
  error: null,
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      set({ users: data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch users", loading: false });
    }
  },
}));
