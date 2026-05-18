import { create } from 'zustand';
import type { GalleryState, GeneratedWork } from '@/types';

const STORAGE_KEY = 'yingge-gallery-works';
const MAX_WORKS = 20;

function loadWorksFromStorage(): GeneratedWork[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveWorksToStorage(works: GeneratedWork[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
  } catch (error) {
    console.error('保存作品失败:', error);
  }
}

interface GalleryStore extends GalleryState {
  loadWorks: () => void;
}

export const useGalleryStore = create<GalleryStore>((set, get) => ({
  myWorks: loadWorksFromStorage(),
  
  loadWorks: () => {
    set({ myWorks: loadWorksFromStorage() });
  },
  
  addWork: (work) => {
    const currentWorks = get().myWorks;
    const updatedWorks = [work, ...currentWorks].slice(0, MAX_WORKS);
    saveWorksToStorage(updatedWorks);
    set({ myWorks: updatedWorks });
  },
  
  removeWork: (id) => {
    const currentWorks = get().myWorks;
    const updatedWorks = currentWorks.filter((work) => work.id !== id);
    saveWorksToStorage(updatedWorks);
    set({ myWorks: updatedWorks });
  },
  
  clearWorks: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ myWorks: [] });
  },
}));
