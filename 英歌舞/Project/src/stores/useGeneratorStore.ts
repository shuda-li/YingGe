import { create } from 'zustand';
import type { GeneratorState } from '@/types';

interface GeneratorStore extends GeneratorState {
  setUploadedImage: (image: string | null) => void;
  setSelectedOption: (option: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setGeneratedImage: (image: string | null) => void;
  setError: (error: string | null) => void;
  setProgress: (progress: number) => void;
  reset: () => void;
}

const initialState: GeneratorState = {
  uploadedImage: null,
  selectedOption: '',
  isGenerating: false,
  generatedImage: null,
  error: null,
  progress: 0,
};

export const useGeneratorStore = create<GeneratorStore>((set) => ({
  ...initialState,
  
  setUploadedImage: (image) => set({ uploadedImage: image }),
  
  setSelectedOption: (option) => set({ selectedOption: option }),
  
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  setGeneratedImage: (image) => set({ generatedImage: image }),
  
  setError: (error) => set({ error }),
  
  setProgress: (progress) => set({ progress }),
  
  reset: () => set(initialState),
}));
