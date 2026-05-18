import { useState, useCallback } from 'react';
import { compressImage } from '@/utils/helpers';

interface UseImageUploadReturn {
  previewUrl: string | null;
  isLoading: boolean;
  error: string | null;
  handleFileSelect: (file: File) => Promise<void>;
  handleDrop: (event: React.DragEvent) => Promise<void>;
  clearImage: () => void;
}

export function useImageUpload(): UseImageUploadReturn {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('请上传 JPG、PNG 或 WEBP 格式的图片');
      return false;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('图片大小不能超过 5MB');
      return false;
    }

    return true;
  };

  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);
    
    if (!validateFile(file)) {
      return;
    }

    setIsLoading(true);
    
    try {
      const compressed = await compressImage(file);
      setPreviewUrl(compressed);
    } catch (err) {
      setError(err instanceof Error ? err.message : '图片处理失败');
      setPreviewUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDrop = useCallback(async (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      await handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const clearImage = useCallback(() => {
    setPreviewUrl(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    previewUrl,
    isLoading,
    error,
    handleFileSelect,
    handleDrop,
    clearImage,
  };
}
