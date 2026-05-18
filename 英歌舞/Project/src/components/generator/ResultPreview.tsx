import Button from '@/components/common/Button';
import { Download, Share2, RotateCcw } from 'lucide-react';
import { downloadImage, shareToSocialMedia } from '@/utils/helpers';

interface ResultPreviewProps {
  imageUrl: string;
  onRegenerate: () => void;
}

export default function ResultPreview({ imageUrl, onRegenerate }: ResultPreviewProps) {
  const handleDownload = () => {
    downloadImage(imageUrl, `yingge-${Date.now()}.png`);
  };

  const handleShare = async () => {
    await shareToSocialMedia(imageUrl);
  };

  return (
    <div className="w-full">
      <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-6">
        <img
          src={imageUrl}
          alt="生成结果"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <Button
          onClick={handleDownload}
          variant="primary"
          className="flex items-center justify-center"
        >
          <Download className="w-5 h-5 mr-2" />
          下载
        </Button>
        <Button
          onClick={handleShare}
          variant="secondary"
          className="flex items-center justify-center"
        >
          <Share2 className="w-5 h-5 mr-2" />
          分享
        </Button>
        <Button
          onClick={onRegenerate}
          variant="outline"
          className="flex items-center justify-center"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          重试
        </Button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        🎉 恭喜！你的英歌舞形象已生成完成
      </p>
    </div>
  );
}
