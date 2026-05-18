import { useState, useEffect, useCallback, useRef } from 'react';

export const useFaceMesh = () => {
  const [faceMesh, setFaceMesh] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [landmarks, setLandmarks] = useState<any[] | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const detectionAttempts = useRef(0);

  useEffect(() => {
    let mounted = true;
    
    const initFaceMesh = async () => {
      try {
        console.log('🔄 Loading FaceMesh model...');
        const { FaceMesh, FACEMESH_FACE_OVAL, FACEMESH_LEFT_EYE, FACEMESH_RIGHT_EYE, FACEMESH_LIPS, FACEMESH_NOSE, FACEMESH_LEFT_EYEBROW, FACEMESH_RIGHT_EYEBROW } = await import('@mediapipe/face_mesh');
        console.log('✅ FaceMesh imported successfully');
        
        const mesh = new FaceMesh({
          locateFile: (file: string) => 
            `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
        });

        mesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.3,
          minTrackingConfidence: 0.2
        });

        mesh.onResults((results: any) => {
          console.log('📊 FaceMesh results received:', results);
          if (mounted) {
            if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
              const faceLandmarks = results.multiFaceLandmarks[0];
              console.log('✅ Face detected! Landmarks count:', faceLandmarks.length);
              setLandmarks(faceLandmarks);
              setError(null);
            } else {
              console.log('❌ No face detected in results');
              setLandmarks(null);
              setError('未检测到人脸，请确保照片中包含清晰的正面人脸');
            }
          }
        });

        if (mounted) {
          setFaceMesh(mesh);
          setIsLoading(false);
          console.log('✅ FaceMesh model initialized successfully');
        }
      } catch (error) {
        console.error('❌ Failed to load FaceMesh:', error);
        setError('人脸检测模型加载失败，请刷新页面重试');
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initFaceMesh();

    return () => {
      mounted = false;
    };
  }, []);

  const detectFace = useCallback(async (imageElement: HTMLImageElement | HTMLCanvasElement) => {
    if (!faceMesh) {
      setError('人脸检测模型尚未加载完成');
      console.error('❌ FaceMesh not initialized');
      return;
    }
    
    if (!imageElement) {
      setError('图片无效');
      console.error('❌ Invalid image element');
      return;
    }

    setIsDetecting(true);
    detectionAttempts.current += 1;
    console.log(`🔍 Detection attempt ${detectionAttempts.current}`);
    console.log('📷 Image info:', imageElement.width, 'x', imageElement.height);

    try {
      await faceMesh.send({ image: imageElement });
      console.log('📤 Image sent to FaceMesh');
    } catch (error) {
      console.error('❌ Face detection failed:', error);
      setError('人脸检测失败，请重试');
    } finally {
      setIsDetecting(false);
    }
  }, [faceMesh]);

  const detectFaceFromCanvas = useCallback(async (canvas: HTMLCanvasElement) => {
    if (!faceMesh) {
      setError('人脸检测模型尚未加载完成');
      return;
    }

    setIsDetecting(true);
    detectionAttempts.current += 1;
    
    try {
      console.log(`🔍 Canvas detection attempt ${detectionAttempts.current}`);
      await faceMesh.send({ image: canvas });
    } catch (error) {
      console.error('❌ Canvas detection failed:', error);
      setError('人脸检测失败，请重试');
    } finally {
      setIsDetecting(false);
    }
  }, [faceMesh]);

  const resetDetection = useCallback(() => {
    setLandmarks(null);
    setError(null);
    detectionAttempts.current = 0;
  }, []);

  const get68PointLandmarks = useCallback((allLandmarks: any[]) => {
    if (!allLandmarks || allLandmarks.length < 468) {
      console.warn('⚠️ Not enough landmarks for 68-point conversion');
      return allLandmarks;
    }
    
    const indices = [
      10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377,
      152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109,
      193, 244, 133, 155, 154, 153, 145, 144, 163, 7, 33, 246, 161, 160, 159, 158, 157, 173,
      362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381, 382
    ];
    
    return indices.map(i => {
      const lm = allLandmarks[i];
      return lm ? { x: lm.x, y: lm.y, z: lm.z || 0 } : null;
    }).filter(Boolean);
  }, []);

  return {
    faceMesh,
    isLoading,
    landmarks,
    isDetecting,
    error,
    detectFace,
    detectFaceFromCanvas,
    resetDetection,
    get68PointLandmarks
  };
};
