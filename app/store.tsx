import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: number;
  name: string;
  email: string;
  address: { city: string };
}
interface Video {
  id: number;
  name: string;
  description: string;
  uri: string;
}
type VideoStore = {
  videos: Video[];
  //loading: boolean;
  //error: string | null;
  addVideo: () => void;
};

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
type TBearStoreState = {
  bears: number;
  color: string;
  size: string;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

export const useBearStore = create<TBearStoreState>()(
  persist(
    (set) => ({
      bears: 0,
      color: "red",
      size: "big",
      increasePopulation: () =>
        set((state) => ({
          bears: state.bears + 1,
        })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    {
      name: "bear store",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["size", "color"].includes(key)
          )
        ),
    }
  )
);
export const useVideoStore = create<VideoStore>(
  persist((set) => ({
      videos: [],
      addVideo: (video: Video) => {
        set((state) => ({
          videos: state.videos.add(video),
        })),
      }
    }),
    {
      name: "video-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    })

);


