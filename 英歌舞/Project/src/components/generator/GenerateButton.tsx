import Button from '@/components/common/Button';
import { Sparkles } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  label?: string;
}

export default function GenerateButton({
  onClick,
  isDisabled = false,
  isLoading = false,
  label = '开始生成'
}: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      isLoading={isLoading}
      size="lg"
      className="w-full text-lg shadow-xl hover:shadow-2xl disabled:opacity-50"
    >
      <Sparkles className="w-6 h-6 mr-2" />
      {isLoading ? '生成中...' : label}
    </Button>
  );
}
