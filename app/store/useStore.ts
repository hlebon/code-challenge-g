import { create } from 'zustand';
import { LibraryItem } from '../api/types';

type LibraryItemExtended = LibraryItem & {
  isFavorite: boolean;
};

interface Store {
  selectedItem: LibraryItemExtended | null;
  setSelectedItem: (value: LibraryItemExtended) => void;
}

export const useStore = create<Store>(
  (set): Store => ({
    selectedItem: null,
    setSelectedItem: (value: LibraryItemExtended) =>
      set({ selectedItem: value }),
  }),
);
