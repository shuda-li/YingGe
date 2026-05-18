import type { 
  FaceGenerateRequest, 
  FaceGenerateResponse, 
  CostumeGenerateRequest, 
  CostumeGenerateResponse,
  Character,
  Costume
} from '@/types';
import { CHARACTERS, COSTUMES } from '@/utils/helpers';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function simulateGeneration(
  image: string, 
  option: string, 
  type: 'face' | 'costume',
  onProgress?: (progress: number) => void
): Promise<string> {
  for (let i = 0; i <= 100; i += 10) {
    await new Promise(resolve => setTimeout(resolve, 300));
    onProgress?.(i);
  }
  
  const selectedItem = type === 'face' 
    ? CHARACTERS.find((c: Character) => c.id === option)
    : COSTUMES.find((c: Costume) => c.id === option);
  
  return image;
}

export async function generateFaceImage(
  request: FaceGenerateRequest,
  onProgress?: (progress: number) => void
): Promise<FaceGenerateResponse> {
  try {
    if (!API_BASE_URL) {
      const generatedImage = await simulateGeneration(
        request.image, 
        request.character, 
        'face',
        onProgress
      );
      return { success: true, image: generatedImage };
    }
    
    const response = await fetch(`${API_BASE_URL}/api/generate/face`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: FaceGenerateResponse = await response.json();
    return data;
  } catch (error) {
    console.error('脸谱生成失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '生成失败，请重试'
    };
  }
}

export async function generateCostumeImage(
  request: CostumeGenerateRequest,
  onProgress?: (progress: number) => void
): Promise<CostumeGenerateResponse> {
  try {
    if (!API_BASE_URL) {
      const generatedImage = await simulateGeneration(
        request.image, 
        request.costume, 
        'costume',
        onProgress
      );
      return { success: true, image: generatedImage };
    }
    
    const response = await fetch(`${API_BASE_URL}/api/generate/costume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: CostumeGenerateResponse = await response.json();
    return data;
  } catch (error) {
    console.error('服装生成失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '生成失败，请重试'
    };
  }
}
