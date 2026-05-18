export interface FacialFeatures {
  eyeShape: 'sharp' | 'round' | 'almond';
  browStyle: 'bold' | 'curved' | 'natural' | 'long' | 'short' | 'straight' | 'slanted';
  mouthStyle: 'fierce' | 'smirk' | 'gentle' | 'closed' | 'open' | 'firm';
  beardStyle: 'thick' | 'medium' | 'sparse' | 'long' | 'short' | 'goatee';
}

export interface YingGeCharacter {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  facialFeatures: FacialFeatures;
  patterns: string[];
  culturalBackground: string;
  colorSymbolism: string;
  drawingSteps: string[];
  eyeStyle?: string;
  eyebrowStyle?: string;
  mustacheStyle?: string;
  saturation?: number;
  contrast?: number;
  textureIntensity?: number;
}

export interface YingGeConfig {
  style: string;
  transparency: number;
  featureSensitivity: number;
  textureIntensity: number;
  colorSaturation: number;
  contrast: number;
  edgeBlending: number;
}

export interface GeneratedWork {
  id: string;
  type: 'face' | 'costume' | 'poster';
  originalImage: string;
  generatedImage: string;
  option: string;
  createdAt: number;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  color: string;
  image: string;
}

export interface Costume {
  id: string;
  name: string;
  description: string;
  color: string;
  image: string;
}

export interface GeneratorState {
  uploadedImage: string | null;
  selectedOption: string;
  isGenerating: boolean;
  generatedImage: string | null;
  error: string | null;
  progress: number;
}

export interface GalleryState {
  myWorks: GeneratedWork[];
  addWork: (work: GeneratedWork) => void;
  removeWork: (id: string) => void;
  clearWorks: () => void;
}

export interface FaceGenerateRequest {
  image: string;
  character: string;
}

export interface FaceGenerateResponse {
  success: boolean;
  image?: string;
  error?: string;
}

export interface CostumeGenerateRequest {
  image: string;
  costume: string;
}

export interface CostumeGenerateResponse {
  success: boolean;
  image?: string;
  error?: string;
}
