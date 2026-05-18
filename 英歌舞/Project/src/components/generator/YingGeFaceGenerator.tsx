import { useState, useRef, useEffect, useCallback } from 'react';
import { useFaceMesh } from '@/hooks/useFaceMesh';
import { YingGeFacePainter } from '@/utils/yinggePainter';
import type { YingGeConfig } from '@/types';
import { YINGGE_STYLES, YINGGE_COLOR_SYMBOLS, YINGGE_FACE_GUIDE } from '@/utils/yinggeStyles';
import { Loader2, Settings2, Palette, AlertCircle, RotateCcw, CheckCircle, Info, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

const defaultConfig: YingGeConfig = {
  style: 'chaoyang',
  transparency: 0.8,
  featureSensitivity: 0.7,
  textureIntensity: 0.5,
  colorSaturation: 1.3,
  contrast: 1.2,
  edgeBlending: 0.6
};

interface Props {
  sourceImage: string;
  onGenerated: (resultImage: string) => void;
}

export default function YingGeFaceGenerator({ sourceImage, onGenerated }: Props) {
  const [config, setConfig] = useState<YingGeConfig>(defaultConfig);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showLandmarks, setShowLandmarks] = useState(false);
  const [detectCount, setDetectCount] = useState(0);
  const [detectionStatus, setDetectionStatus] = useState<'loading' | 'detecting' | 'detected' | 'error'>('loading');
  const [expandedStyle, setExpandedStyle] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { faceMesh, isLoading: modelLoading, landmarks, isDetecting, error, detectFace, resetDetection } = useFaceMesh();

  const currentStyle = YINGGE_STYLES[config.style];

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      console.log('🖼️ Image loaded:', img.width, 'x', img.height);
      imageRef.current = img;
      if (canvasRef.current && img) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
          ctx.drawImage(img, 0, 0);
          console.log('✅ Image drawn to canvas');
        }
      }
    };
    img.onerror = (e) => {
      console.error('❌ Image load failed:', e);
      setDetectionStatus('error');
    };
    img.src = sourceImage;
  }, [sourceImage]);

  useEffect(() => {
    if (modelLoading) {
      setDetectionStatus('loading');
    } else if (isDetecting) {
      setDetectionStatus('detecting');
    } else if (landmarks) {
      setDetectionStatus('detected');
      console.log('✅ Landmarks detected:', landmarks.length, 'points');
    } else if (!modelLoading && !isDetecting) {
      setDetectionStatus('error');
    }
  }, [modelLoading, isDetecting, landmarks]);

  useEffect(() => {
    if (imageRef.current && faceMesh && detectCount === 0) {
      console.log('🎯 Starting face detection...');
      detectFace(imageRef.current);
      setDetectCount(1);
    }
  }, [faceMesh, sourceImage, detectFace, detectCount]);

  const handleRetryDetection = useCallback(() => {
    console.log('🔄 Retrying face detection...');
    resetDetection();
    setDetectCount(0);
    setDetectionStatus('detecting');
    if (imageRef.current && faceMesh) {
      detectFace(imageRef.current);
    }
  }, [faceMesh, detectFace, resetDetection]);

  const handleGenerate = async () => {
    if (!canvasRef.current || !imageRef.current || !landmarks) {
      alert('请先等待人脸检测完成');
      return;
    }

    setIsGenerating(true);
    try {
      const painter = new YingGeFacePainter(canvasRef.current);
      const result = painter.drawYingGeFace(imageRef.current, landmarks, config);
      onGenerated(result);
    } catch (error) {
      console.error('❌ Generation failed:', error);
      alert('生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const updateConfig = (key: keyof YingGeConfig, value: number | string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Palette className="w-6 h-6 text-red-600" />
          英歌脸谱编辑器
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              showGuide ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            绘制指南
          </button>
          <button
            onClick={() => setShowControls(!showControls)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center gap-2"
          >
            <Settings2 className="w-4 h-4" />
            {showControls ? '隐藏设置' : '显示设置'}
          </button>
          <button
            onClick={() => setShowLandmarks(!showLandmarks)}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              showLandmarks ? 'bg-red-100 text-red-700' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {showLandmarks ? '隐藏关键点' : '显示关键点'}
          </button>
        </div>
      </div>

      {showGuide && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {YINGGE_FACE_GUIDE.title}
          </h4>
          <p className="text-blue-700 mb-4">{YINGGE_FACE_GUIDE.introduction}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-blue-800 mb-2">🎨 基本原则</h5>
              <ul className="text-blue-600 space-y-1">
                {YINGGE_FACE_GUIDE.basicPrinciples.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-blue-800 mb-2">🎭 色彩象征</h5>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(YINGGE_COLOR_SYMBOLS).map(([key, color]) => (
                  <div key={key} className="bg-white rounded-lg p-2">
                    <div className="font-medium text-sm" style={{ color: key === 'gold' ? '#FFD700' : key === 'silver' ? '#C0C0C0' : key === 'black' ? '#000' : `var(--color-${key})` }}>
                      {color.name}
                    </div>
                    <div className="text-xs text-gray-500">{color.meaning}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <canvas
              ref={canvasRef}
              className="w-full h-auto max-h-[500px] object-contain"
            />
            
            {showLandmarks && landmarks && (
              <div className="absolute inset-0 pointer-events-none">
                <canvas
                  className="w-full h-auto max-h-[500px] object-contain"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  ref={(el) => {
                    if (el && landmarks) {
                      const ctx = el.getContext('2d');
                      if (ctx) {
                        const scaleX = el.width / (canvasRef.current?.width || 1);
                        const scaleY = el.height / (canvasRef.current?.height || 1);
                        ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
                        ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
                        ctx.lineWidth = 1;
                        
                        landmarks.forEach((lm: any, i: number) => {
                          const x = lm.x * (canvasRef.current?.width || 1) * scaleX;
                          const y = lm.y * (canvasRef.current?.height || 1) * scaleY;
                          ctx.beginPath();
                          ctx.arc(x, y, 2, 0, Math.PI * 2);
                          ctx.fill();
                        });
                      }
                    }
                  }}
                />
              </div>
            )}
            
            {detectionStatus === 'loading' && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
                <span className="ml-2 text-gray-700">加载人脸检测模型中...</span>
              </div>
            )}
            
            {detectionStatus === 'detecting' && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="ml-2 text-gray-700">正在检测人脸...</span>
              </div>
            )}
            
            {detectionStatus === 'error' && (
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center p-6">
                <div className="text-center">
                  <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    {error || '未检测到人脸'}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    请上传清晰的正面人像照片，确保人脸完整可见
                  </p>
                  <button
                    onClick={handleRetryDetection}
                    className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    重新检测
                  </button>
                </div>
              </div>
            )}
            
            {detectionStatus === 'detected' && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                人脸检测成功
              </div>
            )}
          </div>

          {detectionStatus === 'detected' && (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-4 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg shadow-lg hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Palette className="w-6 h-6" />
                  生成{currentStyle?.name}脸谱
                </>
              )}
            </button>
          )}
        </div>

        {showControls && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-lg">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-red-600" />
                英歌风格（7种）
              </h4>
              <div className="space-y-2">
                {Object.entries(YINGGE_STYLES).map(([key, style]) => (
                  <div key={key} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => {
                        updateConfig('style', key);
                        setExpandedStyle(expandedStyle === key ? null : key);
                      }}
                      className={`w-full p-3 flex items-center justify-between transition-all ${
                        config.style === key
                          ? 'bg-red-50 border-red-500'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: style.primaryColor }}
                        />
                        <div className="text-left">
                          <div className="font-semibold">{style.name}</div>
                          <div className="text-xs text-gray-500">{style.description}</div>
                        </div>
                      </div>
                      {expandedStyle === key ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    
                    {expandedStyle === key && (
                      <div className="px-3 pb-3 bg-gray-50">
                        <div className="mt-2 p-3 bg-white rounded-lg">
                          <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div className="text-sm">
                              <div className="font-medium text-gray-800">文化背景</div>
                              <p className="text-gray-600 mt-1">{style.culturalBackground}</p>
                              <div className="font-medium text-gray-800 mt-2">色彩象征</div>
                              <p className="text-gray-600 mt-1">{style.colorSymbolism}</p>
                              <div className="font-medium text-gray-800 mt-2">纹样图案</div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {style.patterns.map((pattern, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 bg-gray-200 rounded text-xs"
                                  >
                                    {pattern}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-lg space-y-4">
              <h4 className="font-bold text-gray-800 mb-4">参数调整</h4>

              <ControlSlider
                label="透明度"
                value={config.transparency}
                min={0.1}
                max={1}
                step={0.05}
                onChange={(v) => updateConfig('transparency', v)}
              />

              <ControlSlider
                label="色彩饱和度"
                value={config.colorSaturation}
                min={0.5}
                max={2}
                step={0.1}
                onChange={(v) => updateConfig('colorSaturation', v)}
              />

              <ControlSlider
                label="对比度"
                value={config.contrast}
                min={0.5}
                max={2}
                step={0.1}
                onChange={(v) => updateConfig('contrast', v)}
              />

              <ControlSlider
                label="纹理强度"
                value={config.textureIntensity}
                min={0}
                max={1}
                step={0.05}
                onChange={(v) => updateConfig('textureIntensity', v)}
              />

              <ControlSlider
                label="边缘融合"
                value={config.edgeBlending}
                min={0}
                max={1}
                step={0.05}
                onChange={(v) => updateConfig('edgeBlending', v)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ControlSlider({
  label,
  value,
  min,
  max,
  step,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-500">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
      />
    </div>
  );
}
