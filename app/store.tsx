import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
interface Video {
  id: number;
  name: string;
  description: string;
  uri: string;
}
type VideoStore = {
  videos: Video[];

  name: string;
  description: string;
  addVideo: () => void;
};

export const useVideoStore = create<VideoStore>()(
  persist(
    (set) => ({
      videos: [],
      name: "red",
      description: "big",
      addVideo: () => set({}),
    }),
    {
      name: "video store",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["name", "description"].includes(key)
          )
        ),
    }
  )
);
