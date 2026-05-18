import { useCallback } from 'react';
import { useGeneratorStore } from '@/stores/useGeneratorStore';
import { useGalleryStore } from '@/stores/useGalleryStore';
import { generateFaceImage, generateCostumeImage } from '@/services/api';
import { generateId } from '@/utils/helpers';
import type { FaceGenerateRequest, CostumeGenerateRequest } from '@/types';

export function useGenerator() {
  const {
    uploadedImage,
    selectedOption,
    setIsGenerating,
    setGeneratedImage,
    setError,
    setProgress,
    reset,
  } = useGeneratorStore();
  
  const { addWork } = useGalleryStore();

  const generateFace = useCallback(async (character: string) => {
    if (!uploadedImage) {
      setError('请先上传图片');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProgress(0);

    const request: FaceGenerateRequest = {
      image: uploadedImage,
      character,
    };

    const response = await generateFaceImage(request, setProgress);

    setIsGenerating(false);

    if (response.success && response.image) {
      setGeneratedImage(response.image);
      
      addWork({
        id: generateId(),
        type: 'face',
        originalImage: uploadedImage,
        generatedImage: response.image,
        option: character,
        createdAt: Date.now(),
      });
    } else {
      setError(response.error || '生成失败，请重试');
    }
  }, [uploadedImage, setIsGenerating, setError, setProgress, setGeneratedImage, addWork]);

  const generateCostume = useCallback(async (costume: string) => {
    if (!uploadedImage) {
      setError('请先上传图片');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProgress(0);

    const request: CostumeGenerateRequest = {
      image: uploadedImage,
      costume,
    };

    const response = await generateCostumeImage(request, setProgress);

    setIsGenerating(false);

    if (response.success && response.image) {
      setGeneratedImage(response.image);
      
      addWork({
        id: generateId(),
        type: 'costume',
        originalImage: uploadedImage,
        generatedImage: response.image,
        option: costume,
        createdAt: Date.now(),
      });
    } else {
      setError(response.error || '生成失败，请重试');
    }
  }, [uploadedImage, setIsGenerating, setError, setProgress, setGeneratedImage, addWork]);

  const resetGenerator = useCallback(() => {
    reset();
  }, [reset]);

  return {
    generateFace,
    generateCostume,
    resetGenerator,
  };
}
