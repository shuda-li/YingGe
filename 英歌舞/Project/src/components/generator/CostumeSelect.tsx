import { useState } from 'react';
import { COSTUMES } from '@/utils/helpers';
import { cn } from '@/utils/helpers';
import type { Costume } from '@/types';

interface CostumeSelectProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function CostumeSelect({ selectedId, onSelect }: CostumeSelectProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">选择服装</h3>
      <div className="grid grid-cols-2 gap-4">
        {COSTUMES.map((costume: Costume) => (
          <div
            key={costume.id}
            className={cn(
              'relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300',
              selectedId === costume.id
                ? 'border-yellow-500 bg-yellow-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-md',
              hoveredId === costume.id && selectedId !== costume.id && 'border-red-300'
            )}
            onClick={() => onSelect(costume.id)}
            onMouseEnter={() => setHoveredId(costume.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                style={{ backgroundColor: costume.color + '20' }}
              >
                {costume.id === 'red-warrior' && '🔴'}
                {costume.id === 'golden-warrior' && '🟡'}
                {costume.id === 'black-warrior' && '⚫'}
                {costume.id === 'blue-warrior' && '🔵'}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900">
                  {costume.name}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {costume.description}
                </p>
              </div>
            </div>
            {selectedId === costume.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
