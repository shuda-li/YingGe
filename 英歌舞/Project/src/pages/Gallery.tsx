import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useGalleryStore } from '@/stores/useGalleryStore';
import Card from '@/components/common/Card';
import { formatDate, downloadImage } from '@/utils/helpers';
import { ArrowLeft, Trash2, Download, Images } from 'lucide-react';

export default function Gallery() {
  const { myWorks, removeWork } = useGalleryStore();

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
              🖼️ 我的作品
            </h1>
            <p className="text-lg text-gray-600">
              这里收藏着你创作的所有英歌舞形象，共 {myWorks.length} 件作品
            </p>
          </div>

          {myWorks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {myWorks.map((work) => (
                <Card key={work.id} className="group">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={work.generatedImage}
                      alt="作品"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => downloadImage(work.generatedImage, `yingge-${work.id}.png`)}
                          className="flex-1 py-2 bg-white rounded-lg text-sm font-medium flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          下载
                        </button>
                        <button
                          onClick={() => removeWork(work.id)}
                          className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                        {work.type === 'face' ? '🎭 脸谱' : '👘 战袍'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(work.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      作品 ID: {work.id.slice(0, 8)}...
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 max-w-md mx-auto">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Images className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                还没有作品
              </h3>
              <p className="text-gray-500 mb-8">
                快去创作你的第一件英歌舞形象吧！
              </p>
              <Link
                to="/face-generator"
                className="inline-block px-8 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                🎭 前往创作
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
