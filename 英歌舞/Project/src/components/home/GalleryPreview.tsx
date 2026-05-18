import { useGalleryStore } from '@/stores/useGalleryStore';
import Card from '@/components/common/Card';
import { Images } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GalleryPreview() {
  const { myWorks } = useGalleryStore();
  const recentWorks = myWorks.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            作品展示
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            看看其他人创造的英歌舞形象，激发你的创作灵感
          </p>
        </div>

        {recentWorks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {recentWorks.map((work) => (
              <div
                key={work.id}
                className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <img
                  src={work.generatedImage}
                  alt="作品预览"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Images className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              还没有作品
            </h3>
            <p className="text-gray-500 mb-6">
              成为第一个创造英歌舞形象的人吧！
            </p>
            <Link
              to="/face-generator"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              立即创作
            </Link>
          </div>
        )}

        {myWorks.length > 6 && (
          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center px-8 py-3 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all"
            >
              查看全部作品
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
