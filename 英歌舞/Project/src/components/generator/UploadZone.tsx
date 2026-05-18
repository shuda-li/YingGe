import { useImageUpload } from '@/hooks/useImageUpload';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface UploadZoneProps {
  onImageUpload?: (imageData: string) => void;
}

export default function UploadZone({ onImageUpload }: UploadZoneProps) {
  const { previewUrl, isLoading, error, handleDrop, handleFileSelect, clearImage } = useImageUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileSelect(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgData = event.target?.result as string;
        onImageUpload?.(imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const localHandleDrop = async (e: React.DragEvent) => {
    await handleDrop(e);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      await handleFileSelect(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgData = event.target?.result as string;
        onImageUpload?.(imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      {previewUrl ? (
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src={previewUrl}
              alt="上传预览"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={clearImage}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <label className="block w-full py-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer hover:bg-white transition-colors text-center">
              <span className="flex items-center justify-center text-gray-700 font-medium">
                <Upload className="w-5 h-5 mr-2" />
                更换图片
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            'aspect-square rounded-2xl border-4 border-dashed transition-all duration-300',
            error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-red-400 hover:bg-red-50'
          )}
          onDrop={localHandleDrop}
          onDragOver={handleDragOver}
        >
          <label className="flex flex-col items-center justify-center h-full cursor-pointer p-8">
            {isLoading ? (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">图片处理中...</p>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <ImageIcon className="w-10 h-10 text-red-600" />
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  {error || '点击或拖拽上传图片'}
                </p>
                <p className="text-sm text-gray-500">
                  支持 JPG、PNG、WebP 格式<br />
                  最大 5MB
                </p>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}
          </label>
        </div>
      )}
    </div>
  );
}
