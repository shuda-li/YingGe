import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Character, Costume } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function compressImage(file: File, maxWidth: number = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedImage = canvas.toDataURL('image/jpeg', 0.8);
        resolve(compressedImage);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export const CHARACTERS: Character[] = [
  {
    id: 'guangong',
    name: '关公',
    description: '忠勇仁义，红脸代表忠勇',
    color: '#C41E3A',
    image: '/characters/guangong.jpg',
  },
  {
    id: 'zhangfei',
    name: '张飞',
    description: '刚正勇猛，黑脸代表刚正',
    color: '#1A1A1A',
    image: '/characters/zhangfei.jpg',
  },
  {
    id: 'linchong',
    name: '林冲',
    description: '豹头环眼，武艺高强',
    color: '#4A5568',
    image: '/characters/linchong.jpg',
  },
  {
    id: 'wusong',
    name: '武松',
    description: '打虎英雄，威武豪迈',
    color: '#D69E2E',
    image: '/characters/wusong.jpg',
  },
  {
    id: 'luzhishen',
    name: '鲁智深',
    description: '力大无穷，豪爽仗义',
    color: '#805AD5',
    image: '/characters/luzhishen.jpg',
  },
  {
    id: 'likui',
    name: '李逵',
    description: '性格直爽，黑旋风',
    color: '#2D3748',
    image: '/characters/likui.jpg',
  },
];

export const COSTUMES: Costume[] = [
  {
    id: 'red-warrior',
    name: '红色战袍',
    description: '经典红色英歌舞战袍，彰显英武之气',
    color: '#C41E3A',
    image: '/costumes/red-warrior.jpg',
  },
  {
    id: 'golden-warrior',
    name: '金色战袍',
    description: '金色镶边战袍，尊贵华丽',
    color: '#D4AF37',
    image: '/costumes/golden-warrior.jpg',
  },
  {
    id: 'black-warrior',
    name: '黑色战袍',
    description: '神秘黑色战袍，威严庄重',
    color: '#1A1A1A',
    image: '/costumes/black-warrior.jpg',
  },
  {
    id: 'blue-warrior',
    name: '蓝色战袍',
    description: '蓝色战袍，清新脱俗',
    color: '#3182CE',
    image: '/costumes/blue-warrior.jpg',
  },
];

export async function downloadImage(dataUrl: string, filename: string = 'yingge-artwork.png') {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function shareToSocialMedia(imageDataUrl: string, title: string = '我的英歌舞形象') {
  if (navigator.share) {
    try {
      const blob = await (await fetch(imageDataUrl)).blob();
      const file = new File([blob], 'yingge-artwork.png', { type: 'image/png' });
      await navigator.share({
        title,
        text: '我在英歌幻境生成了专属英歌舞形象，快来看看吧！',
        files: [file],
      });
    } catch (error) {
      console.error('分享失败:', error);
    }
  } else {
    alert('您的浏览器不支持分享功能，请手动保存图片分享');
  }
}
