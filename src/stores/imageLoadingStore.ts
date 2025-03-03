import { create } from 'zustand';

interface ImageLoadingState {
  pendingWebP: Set<string>;
  registerWebP: (path: string) => void;
  unregisterWebP: (path: string) => void;
  allWebPLoaded: boolean;
}

export const useImageLoadingStore = create<ImageLoadingState>((set, get) => ({
  pendingWebP: new Set<string>(),

  registerWebP: (path: string) => {
    const { pendingWebP } = get();
    pendingWebP.add(path);
    set({ pendingWebP, allWebPLoaded: false });
  },

  unregisterWebP: (path: string) => {
    const { pendingWebP } = get();
    pendingWebP.delete(path);
    set({ pendingWebP, allWebPLoaded: pendingWebP.size === 0 });
  },

  allWebPLoaded: true,
}));
