interface LoadingAnimationProps {
  progress: number;
  message?: string;
}

export default function LoadingAnimation({ progress, message = 'AI正在生成中' }: LoadingAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-32 h-32 mb-6">
        <div className="absolute inset-0 border-4 border-red-200 rounded-full" />
        <div 
          className="absolute inset-0 border-4 border-transparent rounded-full"
          style={{
            borderTopColor: '#DC2626',
            borderRightColor: progress > 25 ? '#DC2626' : 'transparent',
            borderBottomColor: progress > 50 ? '#DC2626' : 'transparent',
            borderLeftColor: progress > 75 ? '#DC2626' : 'transparent',
            transform: 'rotate(45deg)',
            transition: 'border-color 0.3s ease'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-red-600">{progress}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700 mb-2">{message}</p>
        <p className="text-sm text-gray-500">请稍候，AI正在发挥创意...</p>
      </div>
      <div className="mt-6 flex justify-center space-x-2">
        <span className="w-3 h-3 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-3 h-3 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
