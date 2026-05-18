import type { NormalizedLandmark } from '@mediapipe/face_mesh';
import type { YingGeCharacter, YingGeConfig } from '../types';
import { YINGGE_STYLES } from '../utils/yinggeStyles';

export class YingGeFacePainter {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');
    this.ctx = ctx;
  }

  private drawPath(points: { x: number; y: number }[], fillColor: string, strokeColor: string, lineWidth: number = 2) {
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = fillColor;
    this.ctx.fill();
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
  }

  private drawCircle(x: number, y: number, radius: number, fillColor: string, strokeColor: string = '', lineWidth: number = 1) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = fillColor;
    this.ctx.fill();
    if (strokeColor) {
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = lineWidth;
      this.ctx.stroke();
    }
  }

  private interpolatePoint(p1: { x: number; y: number }, p2: { x: number; y: number }, t: number) {
    return {
      x: p1.x + (p2.x - p1.x) * t,
      y: p1.y + (p2.y - p1.y) * t
    };
  }

  drawYingGeFace(
    sourceImage: HTMLImageElement,
    landmarks: NormalizedLandmark[],
    config: YingGeConfig
  ): string {
    const style = YINGGE_STYLES[config.style] || YINGGE_STYLES.chaoyang;
    const width = sourceImage.width;
    const height = sourceImage.height;

    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx.drawImage(sourceImage, 0, 0);

    const points = landmarks.map(lm => ({
      x: lm.x * width,
      y: lm.y * height
    }));

    const alpha = config.transparency;
    this.ctx.globalAlpha = alpha;

    this.drawBackgroundMask(points, style, config);
    this.drawEyes(points, style, config);
    this.drawEyebrows(points, style, config);
    this.drawNose(points, style, config);
    this.drawMouth(points, style, config);
    this.drawDecorativePatterns(points, style, config);

    if (config.textureIntensity > 0) {
      this.addTextureEffect(style, config);
    }

    if (config.edgeBlending > 0) {
      this.applyEdgeBlending(config);
    }

    this.ctx.globalAlpha = 1;
    this.adjustColorBalance(config);

    return this.canvas.toDataURL('image/png');
  }

  private drawBackgroundMask(points: { x: number; y: number }[], style: YingGeCharacter, config: YingGeConfig) {
    const jawIndices = [
      152, 377, 400, 378, 379, 365, 397, 288, 361, 323, 454, 
      356, 389, 251, 284, 332, 297, 338, 10, 109, 67, 103, 
      54, 21, 162, 127, 234, 93, 132, 58, 172, 136, 150, 
      149, 176, 148, 152
    ];
    
    const jawPoints = jawIndices.map(i => points[i]).filter(Boolean);
    
    if (jawPoints.length < 3) return;

    const centerX = points[1]?.x || this.canvas.width / 2;
    const centerY = points[1]?.y || this.canvas.height / 2;
    const faceWidth = Math.abs((points[454]?.x || centerX) - (points[234]?.x || centerX));

    const gradient = this.ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, faceWidth
    );
    gradient.addColorStop(0, style.secondaryColor);
    gradient.addColorStop(1, style.primaryColor);

    this.drawPath(jawPoints, gradient, style.accentColor, 3);
  }

  private drawEyes(points: { x: number; y: number }[], style: YingGeCharacter, config: YingGeConfig) {
    const leftEyeOuter = points[33];
    const leftEyeInner = points[133];
    const rightEyeOuter = points[362];
    const rightEyeInner = points[263];

    if (!leftEyeOuter || !leftEyeInner || !rightEyeOuter || !rightEyeInner) return;

    const eyeRadius = Math.abs(leftEyeOuter.x - leftEyeInner.x) * 0.8;
    const eyeCenterLeft = this.interpolatePoint(leftEyeOuter, leftEyeInner, 0.5);
    const eyeCenterRight = this.interpolatePoint(rightEyeOuter, rightEyeInner, 0.5);

    this.drawCircle(eyeCenterLeft.x, eyeCenterLeft.y, eyeRadius * 1.5, style.primaryColor, style.accentColor, 3);
    this.drawCircle(eyeCenterRight.x, eyeCenterRight.y, eyeRadius * 1.5, style.primaryColor, style.accentColor, 3);

    this.drawCircle(eyeCenterLeft.x, eyeCenterLeft.y, eyeRadius, style.secondaryColor, style.accentColor, 2);
    this.drawCircle(eyeCenterRight.x, eyeCenterRight.y, eyeRadius, style.secondaryColor, style.accentColor, 2);

    this.drawCircle(eyeCenterLeft.x, eyeCenterLeft.y, eyeRadius * 0.3, style.accentColor);
    this.drawCircle(eyeCenterRight.x, eyeCenterRight.y, eyeRadius * 0.3, style.accentColor);
  }

  private drawEyebrows(points: { x: number; y: number }[], style: YingGeCharacter, config: YingGeConfig) {
    const leftBrowIndices = [55, 65, 52, 53, 46, 55];
    const rightBrowIndices = [285, 295, 282, 283, 276, 285];
    
    const leftBrowPoints = leftBrowIndices.map(i => points[i]).filter(Boolean);
    const rightBrowPoints = rightBrowIndices.map(i => points[i]).filter(Boolean);

    if (leftBrowPoints.length >= 3) this.drawPath(leftBrowPoints, style.primaryColor, style.accentColor, 4);
    if (rightBrowPoints.length >= 3) this.drawPath(rightBrowPoints, style.primaryColor, style.accentColor, 4);
  }

  private drawNose(points: { x: number; y: number }[], style: YingGeCharacter, config: YingGeConfig) {
    const noseIndices = [1, 4, 5, 195, 197, 195, 5, 4, 1];
    const nosePoints = noseIndices.map(i => points[i]).filter(Boolean);
    if (nosePoints.length >= 3) {
      this.drawPath(nosePoints, 'transparent', style.secondaryColor, 3);
    }
  }

  private drawMouth(points: { x: number; y: number }[], style: YingGeCharacter, config: YingGeConfig) {
    const outerMouthIndices = [
      61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308,
      324, 318, 402, 317, 14, 87, 178, 88, 95, 78, 191, 80,
      81, 82, 13, 312, 311, 310, 415, 308, 61
    ];
    
    const outerMouth = outerMouthIndices.map(i => points[i]).filter(Boolean);
    if (outerMouth.length >= 3) {
      this.drawPath(outerMouth, style.secondaryColor, style.accentColor, 3);
    }
  }

  private drawDecorativePatterns(points: { x: number; y: number }[], style: YingGeCharacter, config: YingGeConfig) {
    const foreheadCenter = points[10];
    const leftCheek = points[50];
    const rightCheek = points[280];
    const chin = points[152];

    if (foreheadCenter) {
      this.drawCircle(foreheadCenter.x, foreheadCenter.y, 20, style.accentColor, style.primaryColor, 2);
    }
    if (leftCheek) {
      this.drawCircle(leftCheek.x, leftCheek.y, 15, style.secondaryColor, style.accentColor, 1);
    }
    if (rightCheek) {
      this.drawCircle(rightCheek.x, rightCheek.y, 15, style.secondaryColor, style.accentColor, 1);
    }
    if (chin) {
      this.drawSpiral(chin.x, chin.y, 25, style.primaryColor, 2);
    }
  }

  private drawSpiral(x: number, y: number, maxRadius: number, color: string, lineWidth: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    
    let theta = 0;
    const step = 0.2;
    while (theta < 4 * Math.PI) {
      const r = (theta / (4 * Math.PI)) * maxRadius;
      const px = x + r * Math.cos(theta);
      const py = y + r * Math.sin(theta);
      if (theta === 0) {
        this.ctx.moveTo(px, py);
      } else {
        this.ctx.lineTo(px, py);
      }
      theta += step;
    }
    this.ctx.stroke();
  }

  private addTextureEffect(style: YingGeCharacter, config: YingGeConfig) {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * config.textureIntensity * 20;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }

  private applyEdgeBlending(config: YingGeConfig) {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.globalAlpha = config.edgeBlending * 0.3;
    
    const gradient = this.ctx.createRadialGradient(
      this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * 0.3,
      this.canvas.width / 2, this.canvas.height / 2, this.canvas.width * 0.5
    );
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, 'rgba(255,255,255,1)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = 'source-over';
  }

  private adjustColorBalance(config: YingGeConfig) {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const delta = (avg - 128) * config.contrast;
      
      data[i] = Math.max(0, Math.min(255, 128 + delta + (data[i] - avg) * config.colorSaturation));
      data[i + 1] = Math.max(0, Math.min(255, 128 + delta + (data[i + 1] - avg) * config.colorSaturation));
      data[i + 2] = Math.max(0, Math.min(255, 128 + delta + (data[i + 2] - avg) * config.colorSaturation));
    }
    
    this.ctx.putImageData(imageData, 0, 0);
  }
}
