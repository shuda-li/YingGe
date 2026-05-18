import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import UploadZone from '../components/generator/UploadZone';
import YingGeFaceGenerator from '../components/generator/YingGeFaceGenerator';
import CharacterSelect from '../components/generator/CharacterSelect';
import { useGalleryStore } from '../stores/useGalleryStore';
import { generateId } from '../utils/helpers';
import { ArrowLeft, Download, Share2, RotateCcw, Trash2 } from 'lucide-react';

export default function FaceGenerator() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState('guangong');
  const [showEditor, setShowEditor] = useState(false);
  const { addWork, myWorks } = useGalleryStore();

  const handleImageUpload = (imageData: string) => {
    setSourceImage(imageData);
    setResultImage(null);
  };

  const handleGenerationComplete = (generatedImage: string) => {
    setResultImage(generatedImage);
  };

  const handleSaveToGallery = () => {
    if (!resultImage || !sourceImage) return;
    
    addWork({
      id: generateId(),
      type: 'face',
      originalImage: sourceImage,
      generatedImage: resultImage,
      option: selectedCharacter,
      createdAt: Date.now()
    });
    
    alert('已保存到我的作品！');
  };

  const handleDownload = () => {
    if (!resultImage) return;
    
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `yingge-face-${Date.now()}.png`;
    link.click();
  };

  const handleShare = async () => {
    if (!resultImage) return;
    
    if (navigator.share) {
      try {
        const blob = await (await fetch(resultImage)).blob();
        const file = new File([blob], 'yingge-face.png', { type: 'image/png' });
        await navigator.share({
          title: '我的英歌脸谱',
          text: '快来体验英歌幻境的AI脸谱生成！',
          files: [file]
        });
      } catch (err) {
        console.error('分享失败:', err);
        alert('分享功能不支持，请先下载图片');
      }
    } else {
      alert('您的浏览器不支持分享功能，请先下载图片');
    }
  };

  const reset = () => {
    setSourceImage(null);
    setResultImage(null);
    setShowEditor(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回首页
            </Link>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🎭 AI英歌脸谱生成
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              上传你的照片，选择喜爱的角色，AI将精确识别人脸特征并生成专属英歌脸谱
            </p>
          </div>

          {!sourceImage ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                  第一步：上传照片
                </h2>
                <UploadZone onImageUpload={handleImageUpload} />
                <p className="text-center text-sm text-gray-500 mt-4">
                  提示：请使用清晰的正面人脸照片，效果最佳
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              {!resultImage ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800">你的照片</h2>
                      <button
                        onClick={reset}
                        className="flex items-center text-sm text-gray-500 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        更换照片
                      </button>
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden border-4 border-gray-100">
                      <img
                        src={sourceImage}
                        alt="上传的照片"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                      第二步：选择角色
                    </h2>
                    <CharacterSelect
                      selectedId={selectedCharacter}
                      onSelect={setSelectedCharacter}
                    />
                    
                    <div className="mt-8">
                      <button
                        onClick={() => setShowEditor(true)}
                        className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg shadow-lg hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center gap-2"
                      >
                        开始生成脸谱
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-800">生成结果</h2>
                      <div className="flex gap-3">
                        <button
                          onClick={handleDownload}
                          className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          下载
                        </button>
                        <button
                          onClick={handleShare}
                          className="flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          分享
                        </button>
                        <button
                          onClick={handleSaveToGallery}
                          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                        >
                          保存到作品
                        </button>
                        <button
                          onClick={() => setResultImage(null)}
                          className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          重新生成
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm text-gray-500 mb-2 text-center">原图</div>
                        <div className="aspect-square rounded-xl overflow-hidden border-4 border-gray-100">
                          <img
                            src={sourceImage}
                            alt="原图"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-2 text-center">英歌脸谱</div>
                        <div className="aspect-square rounded-xl overflow-hidden border-4 border-red-500 shadow-lg">
                          <img
                            src={resultImage}
                            alt="生成结果"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl p-6 border border-red-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">✨ 功能说明</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>采用MediaPipe FaceMesh实现478个面部关键点的高精度检测</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>支持潮阳、普宁、神泉、关公四种英歌脸谱风格</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>可调整透明度、饱和度、对比度等参数</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>支持下载、分享、保存到个人作品库</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {showEditor && !resultImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
                  <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">英歌脸谱生成器</h2>
                      <button
                        onClick={() => setShowEditor(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                      >
                        ✕
                      </button>
                    </div>
                    <YingGeFaceGenerator
                      sourceImage={sourceImage}
                      onGenerated={(img) => {
                        setResultImage(img);
                        setShowEditor(false);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
