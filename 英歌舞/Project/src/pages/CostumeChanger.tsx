import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import UploadZone from '@/components/generator/UploadZone';
import CostumeSelect from '@/components/generator/CostumeSelect';
import GenerateButton from '@/components/generator/GenerateButton';
import LoadingAnimation from '@/components/generator/LoadingAnimation';
import ResultPreview from '@/components/generator/ResultPreview';
import { useGeneratorStore } from '@/stores/useGeneratorStore';
import { useGenerator } from '@/hooks/useGenerator';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function CostumeChanger() {
  const {
    uploadedImage,
    selectedOption,
    isGenerating,
    generatedImage,
    error,
    progress,
    setSelectedOption,
    reset,
  } = useGeneratorStore();

  const { generateCostume, resetGenerator } = useGenerator();

  useEffect(() => {
    reset();
  }, [reset]);

  const handleGenerate = () => {
    if (selectedOption) {
      generateCostume(selectedOption);
    }
  };

  const handleRegenerate = () => {
    resetGenerator();
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              👘 英歌舞战袍换装
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              上传你的全身照片，选择喜欢的战袍风格，AI将为你穿上传统英歌舞戏服
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">上传照片</h2>
                <UploadZone />

                <div className="mt-8">
                  <CostumeSelect
                    selectedId={selectedOption}
                    onSelect={setSelectedOption}
                  />
                </div>

                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <div className="mt-8">
                  <GenerateButton
                    onClick={handleGenerate}
                    isDisabled={!uploadedImage || !selectedOption}
                    isLoading={isGenerating}
                    label="👘 生成战袍形象"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">生成结果</h2>
                
                {isGenerating ? (
                  <LoadingAnimation progress={progress} message="正在生成战袍..." />
                ) : generatedImage ? (
                  <ResultPreview
                    imageUrl={generatedImage}
                    onRegenerate={handleRegenerate}
                  />
                ) : (
                  <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-5xl">👘</span>
                      </div>
                      <p className="text-lg font-medium">等待生成</p>
                      <p className="text-sm mt-2">上传照片并选择服装后<br />点击生成按钮开始创作</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
