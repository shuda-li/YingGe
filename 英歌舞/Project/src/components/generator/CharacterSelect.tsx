import { useState } from 'react';
import { CHARACTERS } from '@/utils/helpers';
import { cn } from '@/utils/helpers';
import type { Character } from '@/types';

interface CharacterSelectProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function CharacterSelect({ selectedId, onSelect }: CharacterSelectProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">选择角色</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CHARACTERS.map((character: Character) => (
          <div
            key={character.id}
            className={cn(
              'relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300',
              selectedId === character.id
                ? 'border-yellow-500 bg-yellow-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-red-300 hover:shadow-md',
              hoveredId === character.id && selectedId !== character.id && 'border-red-300'
            )}
            onClick={() => onSelect(character.id)}
            onMouseEnter={() => setHoveredId(character.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: character.color + '20' }}
              >
                {character.id === 'guangong' && '👑'}
                {character.id === 'zhangfei' && '⚫'}
                {character.id === 'linchong' && '🐆'}
                {character.id === 'wusong' && '🐯'}
                {character.id === 'luzhishen' && '💪'}
                {character.id === 'likui' && '⚔️'}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {character.name}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {character.description}
                </p>
              </div>
            </div>
            {selectedId === character.id && (
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
