import { cn } from '@/utils/helpers';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-lg overflow-hidden',
        hover && 'cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-red-500',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
